# Catatan Perubahan Demo Modul 4 (Authentication & Storage) — Jejakku

Berkas ini mencatat implementasi arsitektur autentikasi **Supabase Cloud + Hardware Enkripsi Expo SecureStore + Global AuthContext + Route Protection Guards** pada aplikasi Jejakku untuk memenuhi rubrik penilaian resmi praktikum Modul 4.

---

### 1. Rubrik Resmi Tugas Pekan Demo

Tabel acuan resmi tugas pekan demo Modul 4:

| Tugas Pekan Demo | Bobot |
| :--- | :---: |
| Secure Token Storage | 5% |
| Supabase Auth Flow (Sign Up, Sign In, Sign Out, Loading States) | 10% |
| Global AuthContext & Real-time Session Subscription | 5% |
| Route Protection Guards | 5% |
| Answer Question | 15% |
| Completing Challenge (Live Coding 5 Menit) | 20% |
| **TOTAL TUGAS PEKAN DEMO** | **60%** |

---

### 2. Audit Ketercapaian & Bukti Baris Kode

| Tugas Pekan Demo | Bobot | Status | Baris & Lokasi Berkas Kode |
| :--- | :---: | :---: | :--- |
| **Secure Token Storage** | 5% | **TERPENUHI (100%)** | • `src/services/auth/secureStorageAdapter.ts` (baris 4–33): `getItem`, `setItem`, `removeItem` menggunakan `SecureStore.getItemAsync`, `setItemAsync`, `deleteItemAsync` di native (iOS Keychain / Android Keystore) dan fallback `localStorage` di Web.<br>• `src/services/auth/supabaseClient.ts` (baris 10–16): Adapter dipasang langsung ke konfigurasi klien Supabase `auth.storage`. |
| **Supabase Auth Flow** | 10% | **TERPENUHI (100%)** | • `src/services/auth/authService.ts` (baris 5–31): Fungsi `signIn` (baris 5), `signUp` (baris 14), dan `signOut` (baris 28).<br>• `src/app/login.tsx` (baris 38–78): Validasi input email & password minimal 6 karakter, alur tab pendaftaran (`signUp`) dan login (`signIn`).<br>• `src/app/login.tsx` (baris 185–200): Penanganan `isLoading` state dengan tombol ter-disable dan `ActivityIndicator`.<br>• `src/app/profile.tsx` (baris 39–55): Dialog konfirmasi dan eksekusi `signOut()` untuk membersihkan sesi. |
| **Global AuthContext & Subscription** | 5% | **TERPENUHI (100%)** | • `src/contexts/AuthContext.tsx` (baris 12–23): Inisialisasi Context dengan state `user`, `session`, `isLoading`, dan `error`.<br>• `src/contexts/AuthContext.tsx` (baris 54–62): *Real-time session subscription* via `supabase.auth.onAuthStateChange`.<br>• `src/contexts/AuthContext.tsx` (baris 27–50): Safe initial session load dengan *safety timeout* 2,5 detik.<br>• `src/hooks/useAuth.ts` (baris 5–12): Custom hook facade untuk mempermudah konsumsi state di level UI. |
| **Route Protection Guards** | 5% | **TERPENUHI (100%)** | • `src/app/_layout.tsx` (baris 9–24): Komponen `RouteGuard` menggunakan `useSegments()` dan `useRouter()`.<br>• `src/app/_layout.tsx` (baris 19–20): Jika tamu belum login (`!user`) dan mencoba membuka rute selain `/login`, otomatis dialihkan ke `/login`.<br>• `src/app/_layout.tsx` (baris 21–23): Jika user sudah login (`user`) dan berada di `/login`, otomatis dialihkan ke `/` (Beranda).<br>• `src/app/_layout.tsx` (baris 26–39): Blocking splash indicator selama state autentikasi pertama dimuat. |
| **Answer Question** | 15% | **SIAP (100%)** | Penguasaan konsep arsitektur: JWT (Header, Payload, Signature), Token Rotation via Refresh Token, Enkripsi Hardware OS vs Plain AsyncStorage, dan Arsitektur Clean Decoupled. |
| **Completing Challenge** | 20% | **SIAP (100%)** | Blueprint `notes.tsx` (form input teks ke Supabase table `notes` + alert notifikasi berhasil/gagal + navigasi Beranda) siap diaktifkan saat sesi live coding 5 menit. |

---

### 3. Checklist Verifikasi Kesiapan

- [x] **Kredensial Aman:** Kunci Supabase tersimpan di `.env` dan diakses melalui `process.env`.
- [x] **Enkripsi Hardware:** Token JWT tidak disimpan telanjang di memori biasa, melainkan lewat `SecureStore`.
- [x] **Validasi Input:** Form login menolak input kosong dan password di bawah 6 karakter sebelum menghubungi server.
- [x] **Real-time Listener:** Perubahan sesi (login di tab lain atau logout) langsung didengar oleh aplikasi.
- [x] **Proteksi Navigasi:** Rute beranda, jejak, rekam, dan profil terlindungi dari akses tanpa login.
- [x] **Konsistensi UI/UX:** Tampilan profil tidak lagi placeholder, melainkan menampilkan identitas user aktif dan status koneksi database.
- [x] **Zero Code Comments:** Seluruh berkas kode bersih dari komentar kode (`//` dan `/* */`).
- [x] **Type Safety:** 0 error kompilasi TypeScript (`npx tsc --noEmit` lolos 100%).

---

### 4. Panduan Menjalankan & Skenario Demo Praktikum

#### Cara Menjalankan Proyek
Jalankan Expo dengan opsi reset cache bersih:
```bash
cd jejakku
npx expo start -c
```

#### Skenario 1: Membuktikan Route Protection (5%)
1. Buka aplikasi di browser atau emulator (`http://localhost:8081`).
2. **Yang terjadi:** Aplikasi tidak langsung masuk ke Beranda, melainkan otomatis dialihkan ke layar `/login`.
3. **Penjelasan ke Aslab:** Tunjukkan berkas `src/app/_layout.tsx` baris 19–20. Jelaskan bahwa `RouteGuard` memeriksa sesi user; karena sesi masih kosong, aplikasi memblokir akses ke rute utama dan melempar navigasi ke `/login`.

#### Skenario 2: Membuktikan Supabase Sign Up & Sign In Flow (10%)
1. Pada layar login, pilih tab **Daftar**.
2. Masukkan nama, alamat email baru, dan kata sandi (minimal 6 karakter).
3. Klik tombol **Buat Akun Petualang**.
4. **Yang terjadi:** Tombol menampilkan *spinner loading*, data dikirim ke Supabase Auth, dan muncul alert pendaftaran berhasil.
5. Coba masuk menggunakan tab **Masuk** dengan akun tersebut. Setelah berhasil, aplikasi langsung diarahkan ke Beranda (`/`).
6. **Penjelasan ke Aslab:** Tunjukkan `src/app/login.tsx` baris 38–78 dan `src/services/auth/authService.ts` baris 5–26.

#### Skenario 3: Membuktikan Global AuthContext & Real-time State (5%)
1. Setelah login, navigasikan ke tab **Profil** di pojok kanan bawah.
2. **Yang terjadi:** Layar profil menampilkan nama akun, alamat email yang baru didaftarkan, inisial avatar, serta indikator hijau **Supabase Connected**.
3. **Penjelasan ke Aslab:** Tunjukkan `src/contexts/AuthContext.tsx` baris 54–62 dan `src/hooks/useAuth.ts`. Jelaskan bahwa data user diambil dari state global tanpa perlu fetch ulang manual di setiap halaman.

#### Skenario 4: Membuktikan Secure Token Storage (5%)
1. Tutup browser / reload halaman secara penuh (F5).
2. **Yang terjadi:** User tetap dalam posisi login dan tidak terlempar kembali ke layar `/login`.
3. **Penjelasan ke Aslab:** Buka `src/services/auth/secureStorageAdapter.ts`. Jelaskan bahwa Supabase client menggunakan adapter khusus yang membaca session token yang tersimpan aman di perangkat.

#### Skenario 5: Membuktikan Sign Out Flow
1. Di layar **Profil**, tekan tombol merah **Keluar dari Akun**.
2. Konfirmasi dialog peringatan.
3. **Yang terjadi:** Sesi dibersihkan, token dihapus, dan aplikasi seketika kembali terkunci di layar `/login`.
