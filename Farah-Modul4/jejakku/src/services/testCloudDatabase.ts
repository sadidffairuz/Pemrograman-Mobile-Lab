
import { supabase } from './auth/supabaseClient';
import { listCloudLocations } from './locationService';

export async function testCloudDatabase() {
    console.log('=== TEST SUPABASE ===');

    // 1. Periksa sesi login
    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    if (!sessionData.session) {
        throw new Error('Belum ada pengguna yang login.');
    }

    console.log('Login:', sessionData.session.user.email);

    // 2. Ambil jumlah data milik pengguna
    const { count, error: countError } = await supabase
        .from('saved_locations')
        .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    console.log('Total lokasi cloud:', count);

    // 3. Ambil 10 data pertama
    const locations = await listCloudLocations(0, 10);

    console.log('Data berhasil diambil:', locations.length);
    console.log('Contoh lokasi:', locations[0]);

    return {
        total: count,
        loaded: locations.length,
    };
}
