import * as Location from 'expo-location';
import type { Coordinates } from '../types/location';

export async function requestLocationPermission(): Promise<void> {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== 'granted') {
    throw new Error('Izin lokasi belum diberikan. Aktifkan izin lokasi untuk Jejakku.');
  }
  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) throw new Error('Layanan lokasi/GPS perangkat sedang nonaktif.');
}

export async function getCurrentCoordinates(): Promise<Coordinates> {
  await requestLocationPermission();
  const lastKnown = await Location.getLastKnownPositionAsync({ maxAge: 30_000, requiredAccuracy: 150 });
  const position = lastKnown ?? await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
  };
}

export async function watchCoordinates(
  onUpdate: (coordinates: Coordinates) => void,
  onError: (message: string) => void
): Promise<Location.LocationSubscription> {
  await requestLocationPermission();
  return Location.watchPositionAsync(
    { accuracy: Location.Accuracy.Balanced, timeInterval: 12_000, distanceInterval: 15 },
    (position) => onUpdate({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    }),
    onError
  );
}
