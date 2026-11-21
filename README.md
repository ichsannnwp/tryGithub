# 🚀 Lab Praktek Git Clone & Live Share

Web interaktif sederhana yang dirancang khusus untuk bahan ajar, workshop, dan praktikum:
1. Belajar melakukan **Git Clone**, membuat branch, commit, dan push.
2. Kolaborasi real-time dengan **VS Code Live Share** & **Port Forwarding**.
3. Menambahkan profil kontributor ke dalam file `contributors.json`.

---

## 💻 Cara Menjalankan Web di Komputermu

Ada dua cara mudah untuk membuka web ini di browser:

### Opsi 1: Menggunakan Web Server Python (Sangat Direkomendasikan untuk Live Share)
Buka terminal di dalam folder proyek ini lalu jalankan:

```bash
python3 -m http.server 3000
```

Lalu buka browser dan kunjungi:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Opsi 2: Buka Langsung File HTML
Klik dua kali file `index.html` di file manager komputermu, atau seret file `index.html` langsung ke tab web browser pilihanmu (Chrome, Edge, Firefox, Brave).

---

## 🌐 Cara Menggunakan VS Code Live Share

Agar teman atau peserta praktikum bisa mengedit bersama dan langsung membuka web di browser mereka:

1. **Instal Extension**: Cari dan instal extension **"Live Share"** dari Microsoft di VS Code.
2. **Mulai Sesi**: Klik menu **Live Share** di sidebar kiri (atau status bar bawah) lalu klik **Share (Start collaboration session)**. Link undangan akan otomatis disalin ke clipboard.
3. **Bagikan Port Server ke Browser Teman (PENTING)**:
   - Pastikan server web sudah berjalan (`python3 -m http.server 3000`).
   - Di tab **Live Share** di VS Code, cari bagian **Shared Servers** lalu klik tanda tambah `+` atau klik **Share Server...**.
   - Masukkan port `3000` lalu tekan Enter.
   - Temanmu sekarang bisa membuka **http://localhost:3000** di browser komputer mereka masing-masing!

---

## 🎯 Panduan Latihan Git untuk Peserta / Murid

### Langkah 1: Clone Repository
```bash
git clone <URL_REPO_GITHUB>
cd tryGithub
```

### Langkah 2: Buat Branch Baru
```bash
git checkout -b fitur-kontribusi-namamu
```

### Langkah 3: Tambahkan Datamu di `contributors.json`
Buka file `contributors.json`, lalu tambahkan objek datamu di dalam array:
```json
{
  "name": "Nama Lengkapmu",
  "role": "Git Explorer",
  "github": "username_github",
  "badge": "Contributor",
  "quote": "Halo! Saya berhasil clone dan berkontribusi."
}
```

### Langkah 4: Simpan & Commit
```bash
git add .
git commit -m "feat: tambah kontributor [Nama Kamu]"
```

### Langkah 5: Push ke GitHub & Buat Pull Request
```bash
git push origin fitur-kontribusi-namamu
```
Buka repository di GitHub, lalu klik tombol **Compare & pull request**.

---

## 📁 Struktur File

```
tryGithub/
├── index.html          # Halaman utama web (Tailwind CSS & FontAwesome)
├── style.css           # Styling kustom & efek modern
├── script.js           # Logika interaktif & pembaca data kontributor
├── contributors.json   # Data kontributor yang bisa diedit peserta
├── .gitignore          # File pengabaian Git
└── README.md           # Panduan lengkap ini
```
