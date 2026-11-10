import { useCallback, useEffect, useRef, useState } from 'react';
import type { LocationSubscription } from 'expo-location';
import type { Coordinates } from '../types/location';
import { createJourney, finishJourney, getActiveJourney, saveLocation, saveTrackPoint } from '../services/databaseService';
import { watchCoordinates } from '../services/gpsService';
import { reverseGeocode } from '../services/nominatimService';
import { distanceInMeters } from '../services/trackingService';

const MIN_TRACK_POINT_METERS = 20;
const MIN_GEOCODE_METERS = 250;
const MIN_GEOCODE_INTERVAL_MS = 120_000;

export function useJourneyTracking() {
  const [journeyId, setJourneyId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState<Coordinates | null>(null);
  const [message, setMessage] = useState('Belum ada perjalanan aktif.');
  const subscription = useRef<LocationSubscription | null>(null);
  const journeyIdRef = useRef<number | null>(null);
  const lastPoint = useRef<Coordinates | null>(null);
  const lastGeocodedPoint = useRef<Coordinates | null>(null);
  const lastGeocodedAt = useRef(0);
  const busy = useRef(false);

  useEffect(() => {
    getActiveJourney().then((active) => {
      if (active) setMessage('Ada sesi sebelumnya yang belum ditutup. Akhiri sesi tersebut dari database atau mulai sesi baru setelah aplikasi dibuka ulang.');
    }).catch(() => undefined);
    return () => {
      subscription.current?.remove();
      const activeId = journeyIdRef.current;
      if (activeId != null) finishJourney(activeId).catch(() => undefined);
      journeyIdRef.current = null;
    };
  }, []);

  const start = useCallback(async () => {
    if (isTracking) return;
    const previousJourney = await getActiveJourney();
    if (previousJourney) await finishJourney(previousJourney.id);
    const id = await createJourney();
    journeyIdRef.current = id;
    setJourneyId(id);
    lastPoint.current = null;
    lastGeocodedPoint.current = null;
    lastGeocodedAt.current = 0;
    setIsTracking(true);
    setMessage('Pelacakan aktif. Biarkan Jejakku tetap terbuka selama perjalanan.');
    try {
      subscription.current = await watchCoordinates(async (coordinates) => {
        setLastCoordinates(coordinates);
        if (coordinates.accuracy != null && coordinates.accuracy > 100) return;
        if (lastPoint.current && distanceInMeters(lastPoint.current, coordinates) < MIN_TRACK_POINT_METERS) return;
        lastPoint.current = coordinates;
        try {
          await saveTrackPoint(id, coordinates);
          const movedEnough = !lastGeocodedPoint.current || distanceInMeters(lastGeocodedPoint.current, coordinates) >= MIN_GEOCODE_METERS;
          const waitedEnough = Date.now() - lastGeocodedAt.current >= MIN_GEOCODE_INTERVAL_MS;
          if (movedEnough && waitedEnough && !busy.current) {
            busy.current = true;
            try {
              const place = await reverseGeocode(coordinates.latitude, coordinates.longitude);
              await saveLocation({ ...place, accuracy: coordinates.accuracy }, '', 'automatic', id);
              lastGeocodedPoint.current = coordinates;
              lastGeocodedAt.current = Date.now();
              setMessage(`Titik perjalanan tersimpan: ${place.placeName}`);
            } finally {
              busy.current = false;
            }
          }
        } catch (error) {
          busy.current = false;
          setMessage(error instanceof Error ? error.message : 'Gagal menyimpan titik perjalanan.');
        }
      }, (error) => setMessage(error));
    } catch (error) {
      await finishJourney(id);
      journeyIdRef.current = null;
      setJourneyId(null);
      setIsTracking(false);
      throw error;
    }
  }, [isTracking]);

  const stop = useCallback(async () => {
    subscription.current?.remove();
    subscription.current = null;
    if (journeyId != null) await finishJourney(journeyId);
    journeyIdRef.current = null;
    setJourneyId(null);
    setIsTracking(false);
    setMessage('Perjalanan selesai dan tersimpan di riwayat.');
  }, [journeyId]);

  return { isTracking, lastCoordinates, message, start, stop };
}
