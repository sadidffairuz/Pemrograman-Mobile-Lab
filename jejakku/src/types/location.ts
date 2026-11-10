export type CaptureSource = 'manual' | 'automatic';

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
}

export interface PlaceInfo extends Coordinates {
  displayName: string;
  placeName: string;
  area: string;
  road?: string;
}

export interface SavedLocation extends PlaceInfo {
  id: number;
  visitedAt: string;
  note: string | null;
  source: CaptureSource;
  journeyId: number | null;
}

export interface Journey {
  id: number;
  startedAt: string;
  endedAt: string | null;
  status: 'active' | 'finished';
}

export interface TrackPoint extends Coordinates {
  id: number;
  journeyId: number;
  recordedAt: string;
}

export interface NominatimResponse {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
  address?: {
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    village?: string;
    town?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
  };
}
