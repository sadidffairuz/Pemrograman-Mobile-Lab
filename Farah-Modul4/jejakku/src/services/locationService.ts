
import { supabase } from './auth/supabaseClient';
import {
    CaptureSource,
    PlaceInfo,
    SavedLocation,
} from '../types/location';

interface CloudLocationRow {
    id: number;
    place_name: string;
    display_name: string;
    area: string;
    road: string | null;
    latitude: number;
    longitude: number;
    accuracy: number | null;
    visited_at: string;
    note: string | null;
    source: CaptureSource;
    journey_id: number | null;
}

function mapLocation(row: CloudLocationRow): SavedLocation {
    return {
        id: row.id,
        placeName: row.place_name,
        displayName: row.display_name,
        area: row.area,
        road: row.road ?? undefined,
        latitude: row.latitude,
        longitude: row.longitude,
        accuracy: row.accuracy,
        visitedAt: row.visited_at,
        note: row.note,
        source: row.source,
        journeyId: row.journey_id,
    };
}

// Mengambil lokasi cloud milik pengguna yang sedang login
export async function listCloudLocations(
    page = 0,
    limit = 50,
): Promise<SavedLocation[]> {
    const from = page * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .order('visited_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    return (data as CloudLocationRow[]).map(mapLocation);
}

// Menambahkan lokasi baru ke Supabase
export async function saveCloudLocation(
    place: PlaceInfo,
    note: string,
    source: CaptureSource,
): Promise<SavedLocation> {
    const { data: userData, error: userError } =
        await supabase.auth.getUser();

    if (userError) throw userError;
    if (!userData.user) throw new Error('Pengguna belum login.');

    const { data, error } = await supabase
        .from('saved_locations')
        .insert({
            user_id: userData.user.id,
            place_name: place.placeName,
            display_name: place.displayName,
            area: place.area,
            road: place.road ?? null,
            latitude: place.latitude,
            longitude: place.longitude,
            accuracy: place.accuracy ?? null,
            visited_at: new Date().toISOString(),
            note: note.trim() || null,
            source,
            journey_id: null,
        })
        .select()
        .single();

    if (error) throw error;

    return mapLocation(data as CloudLocationRow);
}

// Mengubah catatan lokasi
export async function updateCloudLocationNote(
    id: number,
    note: string,
): Promise<void> {
    const { error } = await supabase
        .from('saved_locations')
        .update({ note: note.trim() || null })
        .eq('id', id);

    if (error) throw error;
}

// Menghapus lokasi cloud
export async function deleteCloudLocation(
    id: number,
): Promise<void> {
    const { error } = await supabase
        .from('saved_locations')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function getCloudLocationById(
    id: number,
): Promise<SavedLocation> {
    const { data, error } = await supabase
        .from('saved_locations')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;

    return mapLocation(data as CloudLocationRow);
}
