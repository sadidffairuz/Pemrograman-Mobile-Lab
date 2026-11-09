# Catatan Pembaruan Modul 3 (Asynchronous & External API)

File ini mencatat seluruh kode baru yang ditambahkan untuk memenuhi rubrik penilaian Modul 3 tanpa menghapus/mengubah data dummy teman (`src/data/activities.ts`).

---

### 1. Pemetaan Rubrik Praktikum Modul 3

| Kebutuhan Modul 3 | File | Lokasi Baris | Keterangan Singkat |
| :--- | :--- | :--- | :--- |
| **External API** | `src/services/api.ts` | Baris 27 | Endpoint publik Open-Meteo WMO (`https://api.open-meteo.com/v1/forecast?...`) |
| **TypeScript Interface** | `src/types/api.ts` | Baris 1-19 | `ResponCuacaEksternal` (raw response) & `DataCuaca` (data siap pakai) |
| **Pre-built Async Function** | `src/services/api.ts` | Baris 29 | `fetch(url)` bawaan JavaScript runtime |
| **Custom Async Function** | `src/services/api.ts` | Baris 56-59 | `async function ambilDataCuacaLive(): Promise<DataCuaca>` |
| **Promise: resolve & reject** | `src/services/api.ts` | Baris 22, 24, 47, 51 | `new Promise<DataCuaca>((resolve, reject) => ...)` dengan timeout & error handling |
| **Penggunaan .then() & .catch()** | `src/services/api.ts`<br>`src/components/WeatherWidget.tsx` | Baris 30, 36 (api.ts)<br>Baris 18, 22 (Widget) | Rantai parsing JSON di service layer & konsumsi state di UI widget |

---

### 2. Daftar File Baru & File yang Dimodifikasi

#### A. File Baru (Khusus Fitur Cuaca Live)
1. **`src/types/api.ts`**
   - Mendefinisikan tipe data строго Bahasa Indonesia (`ResponCuacaEksternal` dan `DataCuaca`).
2. **`src/services/api.ts`**
   - Menjalankan request ke API cuaca Open-Meteo dengan timeout 6 detik.
   - Menggunakan `new Promise`, `resolve()`, `reject()`, `.then()`, serta `async/await`.
3. **`src/components/WeatherWidget.tsx`**
   - Kartu UI cuaca live di beranda.
   - Memanggil `ambilDataCuacaLive()` dengan `.then()` dan `.catch()`.
   - Menampilkan status loading, error/offline fallback, dan tombol muat ulang (refresh).

#### B. File yang Diintegrasikan
1. **`src/components/index.ts`**
   - Mengekspor `WeatherWidget` agar rapi saat diimpor.
2. **`src/app/index.tsx` (Beranda)**
   - **Baris 5**: Impor `WeatherWidget`.
   - **Baris 44**: Pemasangan komponen `<WeatherWidget />` tepat di bawah teks salam (`greetingBlock`).
3. **Seluruh Komponen & Screen** (`ActivityCard`, `BottomNav`, `SectionTitle`, `StatCard`, `EmptyState`, `search.tsx`, `timeline.tsx`, `stats.tsx`, `profile.tsx`, `activity/[id].tsx`):
   - Ditambahkan properti aksesibilitas semantik (`role="region"`, `role="heading"`, `role="button"`, `role="main"`, dll.) agar ramah standar accessibility mobile & web.
   - Seluruh komentar sisa dibersihkan (Zero-comment clean code).

---

### 3. Cara Mendemonstrasikan ke Aslab
1. Buka aplikasi, lihat widget cuaca di halaman **Beranda** (akan menampilkan suhu, kondisi, dan kecepatan angin live dari API Open-Meteo).
2. Tekan ikon refresh di kanan atas widget cuaca untuk membuktikan pengambilan data asynchronous bekerja ulang.
3. Tunjukkan file `src/services/api.ts` untuk bukti `resolve`, `reject`, `then`, dan `fetch`.

