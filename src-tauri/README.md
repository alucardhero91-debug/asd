# Panduan Kompilasi Installer Windows (.exe) Menggunakan Rust & Tauri

Modul jembatan **Rust (Tauri)** ini telah siap di dalam folder `src-tauri`. Dengan arsitektur ini, aplikasi dapat berjalan sebagai aplikasi desktop Windows mandiri yang sangat ringan (~12 MB), aman, dan hemat RAM.

---

## Persyaratan di Komputer Windows Anda

Sebelum melakukan kompilasi `.exe`, pastikan komputer Anda telah terinstal:

1. **Node.js (LTS)**: Unduh dari [nodejs.org](https://nodejs.org/).
2. **Rust & Cargo**: Unduh `rustup-init.exe` dari [rustup.rs](https://rustup.rs/).
3. **Microsoft C++ Build Tools**: Diperlukan oleh kompiler Rust di Windows (dapat diinstal melalui Visual Studio Installer atau Build Tools for Visual Studio).
4. **WebView2**: Sudah terpasang otomatis di Windows 10 dan Windows 11.

---

## Langkah Kompilasi Menjadi `.exe`

### 1. Ekstrak & Buka Terminal Proyek
Buka PowerShell atau Command Prompt di folder root proyek ini:
```powershell
cd /path/ke/proyek
```

### 2. Pasang Dependensi
```powershell
npm install
```

### 3. Jalankan Mode Uji Desktop (Opsional)
Untuk melihat dan menguji aplikasi desktop langsung:
```powershell
npm run tauri:dev
```

### 4. Bangun File Eksekusi `.exe` Mandiri (Paling Cepat & Mudah)
Untuk menghasilkan file `.exe` secara langsung tanpa membutuhkan konfigurasi icon bundle `.msi`:
```powershell
npm run tauri:exe
```
*atau:*
```powershell
npx tauri build --no-bundle
```
File `.exe` akan langsung jadi di: `src-tauri/target/release/penerjemah-arab-indonesia.exe`.

---

### 5. Bangun Installer Lengkap (.msi)
Jika ingin membuat wizard installer setup Windows:
```powershell
npm run tauri:build
```

---

## Lokasi Hasil File `.exe`

Setelah proses kompilasi Rust selesai, installer dan file `.exe` akan berada di:

- **Installer Standar (.msi / setup.exe)**:
  `src-tauri/target/release/bundle/msi/Penerjemah Arab Indonesia_1.0.0_x64_en-US.msi`
- **File Eksekusi Langsung (.exe)**:
  `src-tauri/target/release/penerjemah-arab-indonesia.exe`

---

## Fitur Jembatan Rust (`src-tauri/src/main.rs`)

1. **Native Invocation**: Frontend secara otomatis mendeteksi apakah sedang dibuka di browser web biasa atau di dalam window desktop Tauri.
2. **Offline-First & Gemini AI via Rust**:
   - Jika ada koneksi dan API Key (dari `GEMINI_API_KEY` di sistem Windows atau input aplikasi), Rust memanggil endpoint Gemini secara langsung dan cepat menggunakan `reqwest`.
   - Jika luring (offline), Rust memproses terjemahan secara lokal tanpa bergantung pada server Express.
3. **Kecepatan & Efisiensi**: Memanfaatkan kecepatan kompilasi native bahasa Rust serta konsumsi memori yang jauh lebih hemat dibanding Electron.
