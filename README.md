# Adat Sunda

Adat Sunda adalah website editorial interaktif yang memperkenalkan budaya Sunda melalui pengalaman visual, narasi, gerak, audio ambient, dan asisten AI. Website ini dirancang sebagai ruang digital untuk mengenalkan nilai adat Sunda secara hangat, modern, dan mudah dipahami oleh pengunjung.

## Tujuan Website

Website ini dibuat untuk:

- Mengenalkan adat dan budaya Sunda melalui tampilan web yang imersif.
- Menjelaskan hubungan masyarakat Sunda dengan alam, rumah, busana, musik, dan nilai sosial.
- Menyajikan materi budaya dalam bentuk narasi visual yang lebih menarik daripada halaman teks biasa.
- Membantu pengunjung bertanya tentang adat Sunda melalui widget AI yang fokus pada topik budaya Sunda.
- Menjadi media edukasi digital yang dapat digunakan untuk presentasi, pembelajaran, atau portofolio web bertema budaya.

## Fungsi Utama

- **Navigasi satu halaman**: Pengunjung dapat berpindah ke bagian Panglawungan, Filosofi, Ruang, Bunyi, Busana, Alam, Nilai, dan Rawat melalui navbar.
- **Hero video responsif**: Bagian pembuka menggunakan aset video dan poster untuk memberi kesan visual Tanah Pasundan.
- **Narasi budaya Sunda**: Konten menjelaskan filosofi hidup, rumah adat, musik tradisi, busana, alam, dan nilai adat.
- **Animasi scroll**: Elemen halaman muncul dengan transisi halus, parallax, dan stagger animation.
- **Smooth scrolling**: Pergerakan halaman dibuat lebih lembut menggunakan Lenis.
- **Audio ambient**: Pengunjung dapat mengaktifkan suasana bunyi ambient berbasis Web Audio API.
- **Scroll progress dan tombol kembali ke atas**: Membantu orientasi saat menjelajahi halaman panjang.
- **Asisten AI Adat Sunda**: Widget chat melayang untuk bertanya tentang adat, tata krama, rumah adat, angklung, busana, nilai hidup, dan budaya Sunda.
- **Rendering jawaban Markdown**: Jawaban AI dapat tampil dalam paragraf, daftar, penekanan, kutipan, dan format Markdown sederhana.

## Konten Website

Website dibagi menjadi beberapa bagian utama:

- **Panglawungan**: Pembuka visual yang mengundang pengunjung masuk ke cerita adat Sunda.
- **Filosofi**: Narasi tentang tutur, rasa, harmoni, dan hubungan masyarakat Sunda dengan sesama serta alam.
- **Ruang**: Pembahasan rumah adat Sunda, seperti rumah panggung, material lokal, dan prinsip arsitektur yang rendah hati.
- **Bunyi**: Penjelasan musik tradisi, terutama angklung dan resonansi bambu.
- **Busana**: Catatan tentang pakaian adat Sunda sebagai bahasa identitas, martabat, dan penghormatan.
- **Alam**: Gambaran lanskap Pasundan sebagai bagian dari cara pandang dan keseimbangan hidup.
- **Nilai**: Gotong royong, tata krama, pelestarian alam, musyawarah, kesederhanaan, dan hormat pada leluhur.
- **Rawat**: Ajakan penutup agar warisan budaya tetap dipahami dan diteruskan.

## Teknologi yang Digunakan

- **React 19**: Membangun antarmuka berbasis komponen.
- **Vite 7**: Development server dan build tool yang cepat.
- **Tailwind CSS 4**: Styling utility-first untuk layout, warna, responsivitas, dan detail visual.
- **Motion for React**: Animasi UI, terutama panel chat dan tombol interaktif.
- **GSAP dan ScrollTrigger**: Animasi reveal, parallax, stagger, dan efek berbasis scroll.
- **Lenis**: Smooth scrolling yang terintegrasi dengan GSAP ScrollTrigger.
- **React Markdown dan Remark GFM**: Menampilkan jawaban AI dalam format Markdown.
- **Google Gemini API**: Menjawab pertanyaan pengunjung melalui model Gemini.
- **Vercel Serverless Function**: Endpoint `/api/chat` untuk menjaga API key tetap berada di server.
- **Web Audio API**: Membuat audio ambient langsung di browser.
- **Sharp**: Digunakan oleh script optimasi media.
- **ESLint**: Menjaga kualitas dan konsistensi kode.

## Alur AI Gemini

Widget AI di frontend mengirim pertanyaan ke endpoint `/api/chat`. Endpoint ini meneruskan pesan ke fungsi server `generateSundaChatReply`, lalu memanggil Gemini melalui endpoint `generateContent`.

Beberapa hal penting pada integrasi AI:

- API key tidak dikirim ke browser.
- Asisten diarahkan untuk menjawab hanya seputar adat dan budaya Sunda.
- Konteks utama website ikut digunakan sebagai pengetahuan dasar.
- Riwayat percakapan dibatasi agar request tetap ringan.
- Sistem memiliki fallback model dari `gemini-2.5-flash` ke `gemini-2.5-flash-lite`.
- Ada retry singkat untuk gangguan sementara seperti overload atau rate limit.
- Jika jawaban terpotong karena batas token, sistem mencoba meminta lanjutan jawaban.

## Struktur Folder

```text
api/
  chat.js                  Endpoint serverless untuk chat AI di Vercel
public/
  media/                   Aset gambar dan video website
scripts/
  optimize-media.mjs       Script optimasi media
server/
  geminiChat.js            Logika pemanggilan Gemini dan prompt asisten
src/
  components/              Komponen UI utama
  components/sections/     Bagian-bagian halaman
  data/siteContent.js      Konten narasi dan data website
  hooks/                   Hook scroll, audio, reveal, dan scroll spy
  lib/assets.js            Pemetaan aset media
```

## Menjalankan Project

1. Install dependency:

   ```bash
   npm install
   ```

2. Siapkan environment:

   ```bash
   cp .env.example .env
   ```

3. Isi API key Gemini di `.env`:

   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka URL lokal yang ditampilkan Vite di terminal.

Opsional, atur daftar model Gemini:

```env
GEMINI_MODELS=gemini-2.5-flash,gemini-2.5-flash-lite
```

## Scripts

- `npm run dev`: menjalankan website dalam mode development.
- `npm run build`: membuat build production ke folder `dist`.
- `npm run preview`: menjalankan preview hasil build production.
- `npm run lint`: mengecek kualitas kode dengan ESLint.
- `npm run optimize:media`: mengoptimalkan aset media lewat script internal.

## Deployment

Project ini siap dideploy ke Vercel. Untuk fitur AI, tambahkan environment variable berikut pada project Vercel:

```env
GEMINI_API_KEY=your_google_ai_studio_api_key
GEMINI_MODELS=gemini-2.5-flash,gemini-2.5-flash-lite
```

`GEMINI_MODELS` bersifat opsional. Jika tidak diisi, sistem memakai model default yang sudah ditentukan di kode.
