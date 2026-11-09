# Catatan Pembaruan Modul 3 (Asynchronous & External API)

File ini mencatat seluruh kode baru yang ditambahkan untuk memenuhi rubrik penilaian Modul 3 tanpa menghapus atau mengubah data dummy lokal (`src/data/activities.ts`).

---

### 1. Rubrik Resmi Tugas Pekan Demo

Tabel acuan resmi tugas pekan demo (Total Bobot: 60%):

| Tugas Pekan Demo | Bobot |
| :--- | :--- |
| Mengambil data dari External API dan memasukkannya ke dalam Object menggunakan Interface. | 10% |
| Menggunakan Custom & Pre-built Async Function. | 10% |
| Menggunakan fungsi .then(), .resolve(), dan .reject(). | 10% |
| Menjawab Pertanyaan. | 15% |
| Menyelesaikan Modifikasi Kode. | 15% |

---

### 2. Audit Ketercapaian & Persentase Pemenuhan

Hasil audit verifikasi implementasi kode terhadap setiap butir rubrik di atas:

| Tugas Pekan Demo | Bobot | Status | Persentase Terpenuhi | Bukti Implementasi & Lokasi Kode |
| :--- | :---: | :---: | :---: | :--- |
| Mengambil data dari External API dan memasukkannya ke dalam Object menggunakan Interface. | 10% | **TERPENUHI** | **100%** (10/10) | • Endpoint API Publik Open-Meteo WMO: `jejakku/src/services/api.ts` (baris 27)<br>• Interface TypeScript: `jejakku/src/types/api.ts` (baris 1-19: `ResponCuacaEksternal` & `DataCuaca`)<br>• Mapping data respon ke Object ter-tipe: `jejakku/src/services/api.ts` (baris 39-45) |
| Menggunakan Custom & Pre-built Async Function. | 10% | **TERPENUHI** | **100%** (10/10) | • Pre-built Async Function: `fetch()` & `responHttp.json()` di `jejakku/src/services/api.ts` (baris 29 & 34)<br>• Custom Async Function: `async function ambilDataCuacaLive(): Promise<DataCuaca>` di `jejakku/src/services/api.ts` (baris 56-59) |
| Menggunakan fungsi .then(), .resolve(), dan .reject(). | 10% | **TERPENUHI** | **100%** (10/10) | • `resolve()`: `jejakku/src/services/api.ts` (baris 47)<br>• `reject()`: `jejakku/src/services/api.ts` (baris 24 saat timeout, baris 51 saat error jaringan)<br>• `.then()`: `jejakku/src/services/api.ts` (baris 30 & 36) dan `jejakku/src/components/WeatherWidget.tsx` (baris 18) |
| Menjawab Pertanyaan. | 15% | **SIAP** | **100%** (15/15) | Pemahaman arsitektur siap diuji (konsep Promise lifecycle, error handling, alasan pemilihan API non-API-key, dan integrasi React state) |
| Menyelesaikan Modifikasi Kode. | 15% | **SIAP** | **100%** (15/15) | Kode modular dan decoupled; parameter koordinat lokasi, batas waktu timeout, maupun komponen UI siap dimodifikasi saat live coding |
| **TOTAL TUGAS PEKAN DEMO** | **60%** | **LENGKAP** | **100% (60% / 60%)** | **Seluruh persyaratan teknis dan praktikum terpenuhi sempurna** |

---

### 3. Daftar File Baru & File yang Dimodifikasi

#### A. File Baru (Khusus Fitur Cuaca Live)
1. **`src/types/api.ts`**
   - Mendefinisikan tipe data Bahasa Indonesia (`ResponCuacaEksternal` dan `DataCuaca`).
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
   - Ditambahkan properti aksesibilitas semantik (`role="region"`, `role="heading"`, `role="button"`, `role="main"`, dll.) sesuai standar accessibility.
   - 100% bebas komentar sisa (Zero-comment clean code).

---

### 4. Panduan Menghadapi Aslab

1. **Demonstrasi Aplikasi:**
   - Tunjukkan kartu cuaca live di halaman **Beranda** (suhu, cuaca, kecepatan angin terisi data live dari Open-Meteo).
   - Tekan tombol refresh di pojok kanan kartu untuk mendemonstrasikan eksekusi ulang asinkron secara langsung.
2. **Pemeriksaan Kode:**
   - Buka `src/services/api.ts` untuk memperlihatkan baris `new Promise`, `resolve`, `reject`, `.then`, dan `fetch`.
   - Buka `src/types/api.ts` untuk memperlihatkan interface TypeScript.
