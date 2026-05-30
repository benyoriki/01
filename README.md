# 🏠 Kontrakan Seruni 1 — Website Modern

Website modern untuk Kontrakan Seruni 1, Parung Bogor.
Dibangun dengan HTML, CSS, dan JavaScript murni. Siap deploy ke **GitHub Pages** tanpa konfigurasi tambahan.

---

## 🚀 Cara Deploy ke GitHub Pages

1. **Upload** semua file ke repository GitHub
2. Buka **Settings** → **Pages**
3. Pilih **Branch: main**, folder **/ (root)**
4. Klik **Save** — website langsung live!

---

## 📁 Struktur File

```
kontrakan-seruni/
├── index.html        ← Website utama
├── admin.html        ← Panel admin
├── style.css         ← CSS website utama
├── admin.css         ← CSS admin panel
├── app.js            ← JS website utama
├── admin.js          ← JS admin panel
├── manifest.json     ← PWA manifest
└── assets/
    └── icons/        ← Favicon & icons
```

---

## 🔐 Akses Admin

**Cara 1 (Tersembunyi):** Klik logo/icon Seruni **5x berturut-turut dalam 3 detik** → otomatis redirect ke admin

**Cara 2:** Buka langsung `admin.html`

**Login Default:**
- Username: `admin`
- Password: `seruni2024`

> ⚠️ Ganti username & password setelah pertama login melalui menu **Pengaturan → Akun Admin**

---

## ✨ Fitur Utama

### Website Publik
- Hero section fullscreen dengan animasi
- Daftar kamar dengan filter real-time
- Gallery dengan slider & lightbox
- Form booking → kirim ke WhatsApp
- Halaman testimoni & FAQ
- Embed Google Maps
- Dark/Light mode
- PWA (bisa diinstall di HP)
- Responsive mobile-first

### Admin Panel
- Dashboard dengan statistik & grafik
- CRUD kamar (tambah/edit/hapus)
- Kelola status kamar (kosong/terisi/booking)
- Kelola galeri foto
- Kelola testimoni & FAQ
- Pengaturan website (WA, alamat, maps, dll)
- Export/Import data JSON
- Log aktivitas lengkap
- Session login dengan timeout

---

## 💾 Database

Semua data disimpan di **localStorage** browser — tidak butuh server/backend.

**Data yang disimpan:**
- `seruni_rooms` — data kamar
- `seruni_bookings` — data booking
- `seruni_testimonials` — testimoni
- `seruni_faq` — FAQ
- `seruni_gallery` — galeri
- `seruni_settings` — pengaturan
- `seruni_visitors` — counter pengunjung

---

## 🛠️ Teknologi

- HTML5 semantic
- CSS3 (Glassmorphism + Custom Properties)
- Vanilla JavaScript (ES6+)
- Font Awesome 6.5
- Google Fonts (Playfair Display + DM Sans)
- localStorage API
- Web Share API
- IntersectionObserver API
- PWA (Manifest + installable)

---

© 2024 Kontrakan Seruni 1, Parung Bogor
