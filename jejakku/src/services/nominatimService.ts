import type { NominatimResponse, PlaceInfo } from '../types/location';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';
const MIN_REQUEST_INTERVAL_MS = 1_100;
let lastRequestAt = 0;
let requestQueue: Promise<unknown> = Promise.resolve();
const addressCache = new Map<string, PlaceInfo>();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function coordinateKey(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
}

function mapResponse(data: NominatimResponse, latitude: number, longitude: number): PlaceInfo {
  const address = data.address ?? {};
  const area = address.city ?? address.town ?? address.village ?? address.suburb ?? address.county ?? address.state ?? 'Area tidak diketahui';
  const road = address.road;
  return {
    latitude,
    longitude,
    displayName: data.display_name,
    placeName: data.name || road || area,
    area,
    road,
  };
}

export function reverseGeocode(latitude: number, longitude: number): Promise<PlaceInfo> {
  const key = coordinateKey(latitude, longitude);
  const cached = addressCache.get(key);
  if (cached) return Promise.resolve(cached);

  const request = requestQueue.then(async () => {
    const cachedAgain = addressCache.get(key);
    if (cachedAgain) return cachedAgain;

    const wait = MIN_REQUEST_INTERVAL_MS - (Date.now() - lastRequestAt);
    if (wait > 0) await delay(wait);

    const url = `${NOMINATIM_URL}?format=jsonv2&addressdetails=1&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;
    lastRequestAt = Date.now();
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'id',
        'User-Agent': 'Jejakku/1.0 (academic mobile application)',
      },
    });
    if (!response.ok) throw new Error(`Nominatim gagal merespons (${response.status}). Coba lagi nanti.`);
    const data = await response.json() as NominatimResponse;
    if (!data.display_name) throw new Error('Alamat untuk koordinat ini tidak ditemukan oleh OpenStreetMap.');
    const result = mapResponse(data, latitude, longitude);
    addressCache.set(key, result);
    return result;
  });

  requestQueue = request.then(() => undefined, () => undefined);
  return request;
}
