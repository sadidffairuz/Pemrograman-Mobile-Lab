# Implementasi GPS + OpenStreetMap Nominatim pada Jejakku

## Fitur yang tersedia

- **Pencatatan manual** pada `src/app/record.tsx`: pengguna meminta koordinat GPS, aplikasi melakukan reverse geocoding ke Nominatim, pengguna dapat menulis catatan, lalu menyimpan ke SQLite.
- **Pelacakan otomatis foreground** pada `src/app/tracking.tsx`: pengguna memulai/mengakhiri sesi. `expo-location` mengamati lokasi selama aplikasi berada di foreground. Titik GPS difilter berdasarkan jarak dan akurasi, lalu disimpan di tabel `track_points`.
- **Reverse geocoding terkendali**: Nominatim dipanggil hanya pada titik yang cukup berjauhan dan memiliki interval minimum. Cache alamat disimpan di memori selama aplikasi hidup.
- **Riwayat** pada `src/app/timeline.tsx`: menampilkan lokasi manual dan otomatis yang disimpan.
- **SQLite lokal**: file database `jejakku.db` disimpan di perangkat dan bertahan setelah aplikasi ditutup.
- Kode cuaca lama tetap tersedia sebagai eksperimen pada `WeatherWidget.tsx`, `services/api.ts`, dan `types/api.ts`; tidak lagi dipanggil dari beranda.

## Struktur penting

```text
src/
├── app/
│   ├── index.tsx          # Beranda dan pintasan dua mode
│   ├── record.tsx         # Pencatatan manual
│   ├── tracking.tsx       # Pelacakan otomatis foreground
│   ├── timeline.tsx       # Riwayat SQLite
│   └── ...                # Halaman lama tetap dipertahankan
├── hooks/
│   └── useJourneyTracking.ts
├── services/
│   ├── gpsService.ts
│   ├── nominatimService.ts
│   ├── databaseService.ts
│   └── trackingService.ts
└── types/
    └── location.ts
```

## Alur pencatatan manual

1. Pengguna membuka Catat Lokasi.
2. `gpsService.ts` meminta izin foreground dan mengambil posisi perangkat.
3. `nominatimService.ts` memanggil endpoint reverse Nominatim.
4. Hasil alamat ditampilkan untuk diperiksa pengguna.
5. `databaseService.ts` menyimpan tempat, koordinat, waktu, catatan, dan sumber `manual`.

## Alur pelacakan otomatis

1. Pengguna menekan Mulai Perjalanan.
2. Satu baris sesi dibuat pada tabel `journeys`.
3. `watchPositionAsync` mengamati GPS saat aplikasi di foreground.
4. Titik yang bergeser minimal 20 meter disimpan ke `track_points` jika akurasinya tidak lebih buruk dari 100 meter.
5. Reverse geocoding hanya dicoba jika titik sudah bergeser sekitar 250 meter dari geocode terakhir dan minimal 2 menit telah berlalu. Nominatim juga diberi jarak minimal 1,1 detik antar request.
6. Hasil alamat otomatis disimpan sebagai `locations` dengan sumber `automatic`.
7. Pengguna menekan Akhiri Perjalanan untuk menutup sesi.

Nilai jarak/interval adalah parameter awal untuk prototipe dan perlu diuji di lapangan. GPS dapat meleset, terutama di dalam gedung.

## Batasan versi ini

- Tracking otomatis **hanya foreground** dan terikat pada layar Rekam. Jika pengguna meninggalkan layar tersebut atau aplikasi masuk background/ditutup, subscription dihentikan dan sesi ditutup oleh cleanup. Background tracking memerlukan konfigurasi tambahan, izin khusus, task manager, development build, dan pengujian perangkat; tidak diaktifkan diam-diam.
- Belum ada tampilan peta rute. Koordinat track sudah disimpan, sehingga peta dapat ditambahkan sebagai tahap lanjutan tanpa mengubah format data inti.
- Reverse geocoding mengembalikan objek OSM terdekat yang cocok, bukan jaminan nama bisnis/POI persis pada titik GPS.
- Cache Nominatim saat ini berada di memori. Cache permanen dapat ditambahkan ke SQLite untuk mengurangi request lintas sesi.
- Public Nominatim service memiliki kebijakan penggunaan, termasuk maksimum 1 request/detik, atribusi, identifikasi aplikasi yang sesuai, dan larangan penggunaan berat. Untuk aplikasi yang dipublikasikan atau volume tinggi, evaluasi penyedia geocoding lain atau hosting sendiri.

## Menjalankan

Dari folder `jejakku`:

```bash
npm install
npx expo start
```

Untuk Android emulator tekan `a`; untuk HP Android, buka Expo Go dan scan QR ketika laptop dan HP berada pada jaringan yang sama. Aktifkan layanan lokasi emulator/HP dan izinkan akses lokasi saat aplikasi meminta.

Setelah instalasi, jika dependency native belum dikenali, jalankan:

```bash
npx expo install --fix
```

Kemudian mulai ulang Metro dengan cache bersih:

```bash
npx expo start -c
```

## Attribution

Alamat reverse geocoding menggunakan OpenStreetMap Nominatim. Tampilkan atribusi `© OpenStreetMap contributors` saat menyajikan data OSM.
