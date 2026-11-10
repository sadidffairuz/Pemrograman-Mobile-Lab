import * as SQLite from 'expo-sqlite';
import type { CaptureSource, Journey, PlaceInfo, SavedLocation, TrackPoint } from '../types/location';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = (async () => {
      const db = await SQLite.openDatabaseAsync('jejakku.db');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS journeys (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          started_at TEXT NOT NULL,
          ended_at TEXT,
          status TEXT NOT NULL DEFAULT 'active'
        );
        CREATE TABLE IF NOT EXISTS locations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          place_name TEXT NOT NULL,
          display_name TEXT NOT NULL,
          area TEXT NOT NULL,
          road TEXT,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          accuracy REAL,
          visited_at TEXT NOT NULL,
          note TEXT,
          source TEXT NOT NULL,
          journey_id INTEGER,
          FOREIGN KEY (journey_id) REFERENCES journeys(id)
        );
        CREATE TABLE IF NOT EXISTS track_points (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          journey_id INTEGER NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          accuracy REAL,
          recorded_at TEXT NOT NULL,
          FOREIGN KEY (journey_id) REFERENCES journeys(id)
        );
      `);
      return db;
    })();
  }
  return databasePromise;
}

export async function createJourney(): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(
    'INSERT INTO journeys (started_at, status) VALUES (?, ?)',
    new Date().toISOString(), 'active'
  );
  return result.lastInsertRowId;
}

export async function finishJourney(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE journeys SET ended_at = ?, status = ? WHERE id = ?',
    new Date().toISOString(), 'finished', id
  );
}

export async function getActiveJourney(): Promise<Journey | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    id: number; started_at: string; ended_at: string | null; status: 'active' | 'finished';
  }>('SELECT * FROM journeys WHERE status = ? ORDER BY id DESC LIMIT 1', 'active');
  return row ? { id: row.id, startedAt: row.started_at, endedAt: row.ended_at, status: row.status } : null;
}

export async function saveLocation(
  place: PlaceInfo,
  note: string,
  source: CaptureSource,
  journeyId: number | null
): Promise<number> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO locations
      (place_name, display_name, area, road, latitude, longitude, accuracy, visited_at, note, source, journey_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    place.placeName, place.displayName, place.area, place.road ?? null,
    place.latitude, place.longitude, place.accuracy ?? null,
    new Date().toISOString(), note.trim() || null, source, journeyId
  );
  return result.lastInsertRowId;
}

export async function saveTrackPoint(
  journeyId: number,
  point: { latitude: number; longitude: number; accuracy?: number | null }
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO track_points (journey_id, latitude, longitude, accuracy, recorded_at) VALUES (?, ?, ?, ?, ?)',
    journeyId, point.latitude, point.longitude, point.accuracy ?? null, new Date().toISOString()
  );
}

export async function listLocations(limit = 100): Promise<SavedLocation[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: number; place_name: string; display_name: string; area: string; road: string | null;
    latitude: number; longitude: number; accuracy: number | null; visited_at: string;
    note: string | null; source: CaptureSource; journey_id: number | null;
  }>('SELECT * FROM locations ORDER BY visited_at DESC LIMIT ?', limit);
  return rows.map((row) => ({
    id: row.id, placeName: row.place_name, displayName: row.display_name,
    area: row.area, road: row.road ?? undefined, latitude: row.latitude,
    longitude: row.longitude, accuracy: row.accuracy, visitedAt: row.visited_at,
    note: row.note, source: row.source, journeyId: row.journey_id,
  }));
}

export async function listJourneys(): Promise<Journey[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: number; started_at: string; ended_at: string | null; status: 'active' | 'finished';
  }>('SELECT * FROM journeys ORDER BY started_at DESC');
  return rows.map((row) => ({ id: row.id, startedAt: row.started_at, endedAt: row.ended_at, status: row.status }));
}

export async function listTrackPoints(journeyId: number): Promise<TrackPoint[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{
    id: number; journey_id: number; latitude: number; longitude: number; accuracy: number | null; recorded_at: string;
  }>('SELECT * FROM track_points WHERE journey_id = ? ORDER BY recorded_at ASC', journeyId);
  return rows.map((row) => ({ id: row.id, journeyId: row.journey_id, latitude: row.latitude, longitude: row.longitude, accuracy: row.accuracy, recordedAt: row.recorded_at }));
}

export async function getLocationById(id: number): Promise<SavedLocation | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    id: number; place_name: string; display_name: string; area: string; road: string | null;
    latitude: number; longitude: number; accuracy: number | null; visited_at: string;
    note: string | null; source: CaptureSource; journey_id: number | null;
  }>('SELECT * FROM locations WHERE id = ?', id);
  if (!row) return null;
  return {
    id: row.id, placeName: row.place_name, displayName: row.display_name,
    area: row.area, road: row.road ?? undefined, latitude: row.latitude,
    longitude: row.longitude, accuracy: row.accuracy, visitedAt: row.visited_at,
    note: row.note, source: row.source, journeyId: row.journey_id,
  };
}
