# Jejakku - GPS + OpenStreetMap Nominatim

Project ini mempertahankan tampilan dan halaman Jejakku yang sudah ada, lalu menambahkan dua mode pencatatan lokasi.

## Persiapan

```bash
npm install
npx expo start -c
```

Buka Android emulator lalu tekan `a`, atau scan QR dengan Expo Go pada HP Android. Izinkan akses lokasi saat aplikasi meminta.

## Cara mencoba

1. **Catat manual**: Beranda → Catat lokasi sekarang → Ambil Lokasi GPS → tulis catatan (opsional) → Simpan Jejak.
2. **Pelacakan otomatis**: Beranda → Mulai perjalanan otomatis → Mulai Perjalanan. Biarkan aplikasi tetap terbuka dan berpindah lokasi. Tekan Akhiri Perjalanan untuk menyelesaikan sesi.
3. **Riwayat**: buka menu Jejak pada navigasi bawah.
4. **Statistik**: halaman Statistik memakai data SQLite yang sudah tersimpan.

## Catatan

- Pelacakan otomatis versi ini bekerja di foreground saja; background tracking belum diaktifkan.
- GPS dan internet diperlukan untuk alamat Nominatim. Titik koordinat tetap dapat direkam ke database, tetapi reverse geocoding membutuhkan koneksi internet.
- Nominatim mengembalikan alamat/objek OSM terdekat yang cocok, bukan jaminan nama tempat usaha yang tepat.
- WeatherWidget, services/api.ts, dan types/api.ts tetap ada sebagai eksperimen cuaca, tetapi tidak dipasang pada beranda.
- Baca `MODUL-IMPLEMENTASI-GPS-NOMINATIM.md` untuk arsitektur dan detail teknis.
