# 🎨 Rasx Tools - All-in-One Online Image Editor & Bulk Processor

<div align="center">

![Rasx Tools Banner](https://img.shields.io/badge/Rasx%20Tools-Image%20Studio-3b82f6?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-emerald?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)
![Client-Side](https://img.shields.io/badge/100%25-Client--Side%20Private-coral?style=for-the-badge)

**Every tool you could want to edit images in bulk — 100% Client-Side, Ultra Fast, and Forever Free!**

[Demo & Fitur](#-fitur-utama--daftar-tools) • [Cara Instalasi & Menjalankan](#-cara-instalasi--menjalankan-secara-lokal) • [Panduan Penggunaan Tools](#-panduan-lengkap-penggunaan-setiap-fitur) • [Struktur Proyek](#-struktur-direktori-proyek)

</div>

---

## 🌟 Tentang Rasx Tools

**Rasx Tools** adalah aplikasi web pengolah dan pengedit gambar massal (*bulk image processor*) modern terinspirasi dari iLoveIMG. Dibuat dengan arsitektur **100% Client-Side Processing** menggunakan teknologi HTML5 Canvas dan ES6 Modules modern, seluruh proses kompresi, konversi, dan pengeditan gambar terjadi langsung di browser pengguna tanpa pernah mengunggah file ke server luar. Hal ini menjamin privasi total, kecepatan tanpa batas ukuran file, dan performa instan.

### ✨ Keunggulan Utama
- 🔒 **100% Privat & Aman**: Foto Anda tidak pernah meninggalkan perangkat atau diunggah ke server mana pun.
- ⚡ **Super Cepat & Batch Processing**: Olah puluhan gambar sekaligus dalam satu klik.
- 🌗 **Light Mode & Dark Mode**: Desain UI modern dengan Glassmorphism, animasi mikro, dan transisi tema halus.
- 📦 **Download Fleksibel**: Unduh foto satuan langsung dari barisan thumbnail atau bundel seluruh foto dalam format **`.zip`**.
- 📱 **Responsif di Semua Perangkat**: Tampilan optimal di layar desktop, tablet, maupun smartphone.
- 🆓 **100% Gratis Tanpa Batasan**: Tanpa watermark, tanpa registrasi, dan tanpa biaya langganan.

---

## 🚀 Fitur Utama & Daftar Tools

Rasx Tools dilengkapi dengan **12 alat pengolah gambar lengkap**:

| No | Tool | Kategori | Deskripsi |
|---|---|---|---|
| 1 | **Compress IMAGE** | Optimize | Kompresi gambar JPG, PNG, WEBP dengan kualitas fleksibel & kuantisasi warna. |
| 2 | **Resize IMAGE** | Edit | Ubah dimensi gambar berdasarkan persentase atau ukuran pixel presisi + Preset media sosial. |
| 3 | **Crop IMAGE** | Edit | Pemotongan gambar presisi dengan preset rasio (1:1, 16:9, 9:16, 4:3, 3:2, Freeform). |
| 4 | **Convert IMAGE** | Convert | Konversi universal bolak-balik antara JPG, PNG, WEBP, GIF, BMP, dan ICO (Favicon). |
| 5 | **Convert to JPG** | Convert | Konversi massal dari PNG, WEBP, GIF, SVG, BMP ke JPG berkualitas tinggi. |
| 6 | **Convert from JPG** | Convert | Konversi massal JPG ke format PNG (dengan alpha channel), WEBP, atau GIF. |
| 7 | **Upscale Image** | Optimize | Perbesar resolusi gambar 2X / 4X dengan algoritma *Laplacian Edge-Sharpening*. |
| 8 | **Remove Background** | Edit | Deteksi dan hapus warna latar belakang foto secara otomatis menjadi transparan. |
| 9 | **Watermark IMAGE** | Security | Tambahkan cap teks kustom dengan posisi 9-grid, rotasi, opacity, atau pola ubin berulang (*Tile Pattern*). |
| 10 | **Meme Generator** | Create | Pembuat meme klasik instan dengan teks atas & bawah, font Impact, dan outline tebal. |
| 11 | **Rotate IMAGE** | Edit | Putar gambar 90°, 180°, 270°, cermin (Flip Horizontal/Vertical), atau sudut kustom. |
| 12 | **Photo Editor** | Edit | Suite edit foto lengkap: Brightness, Contrast, Saturation, Blur, dan Filter Tone (*Noir, Vintage, Sunset, Cyber*). |

---

## 📖 Panduan Lengkap Penggunaan Setiap Fitur

### 1. 🗜️ Compress IMAGE (Kompres Gambar)
1. Buka tool **Compress IMAGE**.
2. Tarik & lepas (*drag & drop*) foto atau klik tombol **Select Images** (bisa pilih banyak gambar sekaligus).
3. Atur slider **Image Quality** (contoh: `75%` atau `50%` untuk ukuran lebih kecil).
4. Pilih **Output Format**:
   - `Keep Original Format (Auto)`: Menjaga format dan ekstensi asli file (`.png`, `.jpg`, `.webp`).
   - `JPG / PNG / WEBP`: Jika ingin mengubah format output.
5. (Opsional) Pilih **Max Width** jika ingin membatasi lebar maksimal gambar (*Full HD 1080p, HD 720p, Web 800px*).
6. Lihat ringkasan ukuran hemat pada panel *Compression Summary*.
7. Klik **Download Active Image** untuk unduh gambar yang aktif, atau klik ikon ⬇️ pada thumbnail, atau klik **Download All as ZIP**.

---

### 2. 📐 Resize IMAGE (Ubah Ukuran Gambar)
1. Buka tool **Resize IMAGE** dan masukkan gambar.
2. Pilih mode resize:
   - **By Percentage**: Geser slider persentase (`25%`, `50%`, `75%`, `150%`).
   - **By Pixels**: Masukkan nilai lebar (*Width*) & tinggi (*Height*) dalam pixel.
3. Kunci rasio aspek gambar dengan ikon **`🔒`** agar gambar tidak gepeng.
4. Gunakan tombol preset cepat jika ingin ukuran instan: *Instagram (1080×1080), Full HD (1920×1080), Social Share (1200×630), Avatar (512×512)*.
5. Klik **Apply & Process** dan unduh gambar.

---

### 3. ✂️ Crop IMAGE (Potong Gambar)
1. Buka tool **Crop IMAGE** dan masukkan gambar.
2. Pilih aspek rasio preset yang diinginkan:
   - `Freeform` (Bebas)
   - `Square 1:1` (Instagram Feed / Profil)
   - `Landscape 16:9` (YouTube Thumbnail / Desktop)
   - `Story/Reel 9:16` (TikTok / Instagram Story / Reels)
   - `Standard 4:3` / `Photo 3:2`
3. Atur slider persentase lebar & tinggi pemotongan.
4. Unduh hasil potongan gambar.

---

### 4. 🔄 Convert IMAGE (Universal Semua Format)
1. Buka tool **Convert IMAGE**.
2. Masukkan file gambar format apa saja (*JPG, PNG, WEBP, GIF, BMP, SVG*).
3. Pada dropdown **Convert Target Format** atau tombol *Quick Conversion*, pilih format tujuan:
   - **PNG**: Format tanpa kompresi dengan transparansi.
   - **JPG**: Format gambar standar dengan slider kualitas.
   - **WEBP**: Format web super ringan generasi baru.
   - **ICO**: Menghasilkan file icon favicon website (tersedia pilihan ukuran: 16×16, 32×32, 48×48, 64×64, 128×128, 256×256).
   - **BMP**: Format bitmap murni.
   - **GIF**: Format grafis animasi/statis.
4. Jika memilih format JPG/BMP, Anda dapat memilih warna pengisi latar belakang (*Fill Background*) untuk menggantikan bagian transparan PNG.
5. Klik tombol unduh satuan atau **Download All as ZIP**.

---

### 5. 🔍 Upscale Image (Super-Resolution)
1. Buka tool **Upscale Image**.
2. Pilih faktor pembesaran: **2X Super-Res** atau **4X Ultra-Res**.
3. Atur slider **Edge Sharpening** untuk mempertajam garis tepi dan detail objek agar tidak buram.
4. Unduh gambar dengan resolusi yang telah ditingkatkan hingga 4 kali lipat.

---

### 6. 🪄 Remove Background (Hapus Latar Belakang)
1. Buka tool **Remove background**.
2. Masukkan foto objek yang memiliki latar belakang solid atau kontras.
3. Sistem secara otomatis mendeteksi warna latar belakang dari sudut foto.
4. Geser slider **Color Tolerance** untuk menyesuaikan kehalusan potongan tepi.
5. (Opsional) Pilih **Custom Color** jika ingin memilih sampel warna tertentu menggunakan *Color Picker*.
6. Hasil gambar akan otomatis diekspor dalam format **PNG transparan**.

---

### 7. 🏷️ Watermark IMAGE (Beri Cap Gambar)
1. Buka tool **Watermark IMAGE**.
2. Masukkan teks watermark pada kolom input (contoh: `Hak Cipta © Rasx Studio`).
3. Sesuaikan **Font Size**, **Opacity** (transparansi cap), dan **Rotation Angle** (kemiringan sudut `-90°` s/d `+90°`).
4. Pilih posisi cap: *Center, Bottom-Right, Bottom-Left, Top-Right, Top-Left*, atau pilih **Tile Pattern (Repeated)** untuk memberi cap berulang menyelimuti seluruh foto secara diagonal.
5. Unduh hasil foto yang telah diberi tanda air.

---

### 8. 🎭 Meme Generator (Pembuat Meme)
1. Buka tool **Meme generator**.
2. Unggah gambar meme Anda.
3. Isi teks pada kolom **Top Text** (Teks Atas) dan **Bottom Text** (Teks Bawah).
4. Atur ukuran font (*Font Size*) dan pilih jenis font (*Impact, Arial Black, Comic Sans MS, Montserrat*).
5. Teks akan otomatis diformat dengan huruf kapital tebal dan outline hitam khas meme.
6. Unduh meme Anda dan bagikan ke media sosial!

---

### 9. 🔄 Rotate IMAGE (Putar & Balik Gambar)
1. Buka tool **Rotate IMAGE**.
2. Gunakan tombol rotasi cepat:
   - `↻ 90° Clockwise` (Putar searah jarum jam)
   - `↺ 90° Counter-CW` (Putar berlawanan jarum jam)
   - `⇆ Flip Horizontal` (Cermin horizontal)
   - `⇅ Flip Vertical` (Cermin vertikal)
3. Atau geser slider **Custom Angle** (-180° s/d +180°) untuk rotasi sudut bebas.
4. Unduh gambar hasil rotasi.

---

### 10. 🎨 Photo Editor (Edit Efek & Filter Foto)
1. Buka tool **Photo editor**.
2. Sesuaikan parameter warna foto:
   - **Brightness**: Mengatur tingkat kecerahan foto.
   - **Contrast**: Mengatur ketajaman kontras gelap dan terang.
   - **Saturation**: Menambah kepekatan atau memudarkan warna.
   - **Blur**: Memberi efek buram/blur artistik.
3. Pilih preset filter warna instan:
   - `Normal` (Asli)
   - `Noir` (Hitam Putih Dramatis / Grayscale)
   - `Vintage` (Nuansa Klasik Sepia)
   - `Invert` (Efek Negatif Film)
   - `Sunset` (Nuansa Emas Hangat)
   - `Cyber` (Nuansa Biru Neon / Cool)
4. Unduh hasil foto yang telah diedit.

---

## 💻 Cara Instalasi & Menjalankan Secara Lokal

Aplikasi ini dibangun murni menggunakan teknologi web standar tanpa dependensi server yang rumit, sehingga dapat langsung dijalankan di komputer Anda.

### Opsi 1: Menggunakan Laragon / XAMPP
1. Letakkan folder proyek `Rasx-tools` ke dalam direktori web server:
   - **Laragon**: `C:\laragon\www\Rasx-tools`
   - **XAMPP**: `C:\xampp\htdocs\Rasx-tools`
2. Pastikan Apache di Laragon / XAMPP dalam status **Start**.
3. Buka browser dan kunjungi:
   ```
   http://localhost/Rasx-tools/
   ```

### Opsi 2: Menggunakan Python HTTP Server
Jika Anda memiliki Python di komputer:
```bash
cd c:\laragon\www\Rasx-tools
python -m http.server 8080
```
Buka browser di: `http://localhost:8080/`

### Opsi 3: Menggunakan VS Code Live Server
1. Buka folder `Rasx-tools` di **Visual Studio Code**.
2. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.

### Opsi 4: Deploy ke Hosting Gratis (GitHub Pages / Vercel / Netlify)
Karena proyek ini merupakan *static web app*, Anda dapat langsung melakukan push repository ini ke **GitHub** dan mengaktifkan **GitHub Pages** di pengaturan repository (`Settings > Pages > Branch: main`).

---

## 📁 Struktur Direktori Proyek

```
c:/laragon/www/Rasx-tools/
├── index.html                  # Halaman utama, hero section, tool grid, & workspace modal
├── README.md                   # Dokumentasi lengkap proyek
├── css/
│   ├── variables.css           # Token desain (Light & Dark theme), warna, radius, & bayangan
│   ├── main.css                # Styling tata letak, card grid, hero, tombol, & responsivitas
│   └── tool-workspace.css      # Styling modal interaktif, live canvas viewer, & sidebar kontrol
└── js/
    ├── app.js                  # Entry point aplikasi, routing modal, queue gallery, & tema
    ├── modules/
    │   ├── tools-registry.js   # Daftar 12 tools beserta metadata, ikon SVG, & kategori
    │   └── utils.js            # Fungsi helper canvas, BMP/ICO encoder, kuantisasi, & JSZip
    └── tools/
        └── tool-handlers.js    # Logika proses interaktif & algoritma untuk seluruh 12 tools
```

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: Semantic HTML5, CSS3 Custom Properties (Variables), Modern Vanilla JavaScript (ES6+ Modules).
- **Image Processing Engine**: HTML5 Canvas 2D Context, ImageData Pixel Array Manipulation, Offscreen Processing.
- **Bulk Compression & Archiving**: [JSZip](https://stuk.github.io/jszip/) untuk pembuatan arsip `.zip` langsung di browser.
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *JetBrains Mono*).
- **Icons**: Clean Modern SVG Vector Icons.

---

## 👨‍💻 Tentang Pengembang & Layanan (Owner)

<div align="center">

### **Rizki Agung**
*Full-Stack Web Developer & Creative Digital Editor*

[![Instagram](https://img.shields.io/badge/Instagram-@rizkiagungid-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/rizkiagungid)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-081290053660-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6281290053660?text=Halo%20Rizki%20Agung,%20saya%20tertarik%20dengan%20jasa%20pembuatan%20website%20/%20editing)

</div>

### 💼 Layanan Profesional yang Tersedia:
- 🌐 **Jasa Pembuatan Website**:
  - Company Profile Perusahaan & Bisnis
  - Toko Online (E-Commerce) Modern & Cepat
  - Landing Page Produk / Penjualan Konversi Tinggi
  - Web Application Custom (Sistem Informasi, Dashboard, Tools)
  - Portofolio Pribadi & Blog Profesional
- 🎨 **Jasa Editing & Desain Multimedia**:
  - Photo Retouching, Color Grading & Efek Sinematik
  - Hapus & Ganti Background Foto Produk
  - Desain Banner Iklan, Feed Instagram & Materi Promosi
  - Video Editing & Motion Graphics

> **Tertarik membuat website atau butuh jasa editing profesional?**  
> Hubungi langsung via **WhatsApp: [081290053660](https://wa.me/6281290053660)** atau **Instagram: [@rizkiagungid](https://instagram.com/rizkiagungid)**.

---

## 🤝 Kontribusi & Pengembangan

Kontribusi sangat diterima! Jika Anda ingin menambahkan filter baru, tool pengolah gambar tambahan, atau perbaikan performa:
1. *Fork* repository ini.
2. Buat branch fitur baru (`git checkout -b fitur-baru`).
3. *Commit* perubahan Anda (`git commit -m 'Menambahkan tool baru'`).
4. *Push* ke branch Anda (`git push origin fitur-baru`).
5. Buat **Pull Request**.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT License** — Bebas digunakan untuk keperluan pribadi maupun komersial.

<div align="center">

Dibuat dengan ❤️ oleh **Rizki Agung** untuk kemudahan pengolahan gambar cepat dan privat.

</div>
