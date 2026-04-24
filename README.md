# Adat Sunda

Website editorial interaktif bertema adat Sunda yang dibangun dengan React, Vite, Tailwind, Motion, GSAP, dan Lenis.

## Menjalankan project

1. Install dependency:
   `npm install`
2. Siapkan environment:
   salin `.env.example` menjadi `.env`
3. Isi API key Gemini:
   `GEMINI_API_KEY=your_google_ai_studio_api_key`
4. Jalankan development server:
   `npm run dev`

Opsional:
`GEMINI_MODELS=gemini-2.5-flash,gemini-2.5-flash-lite`

## Fitur AI Gemini

- Widget AI muncul sebagai tombol melayang di sudut kanan bawah.
- Chat diarahkan khusus untuk pertanyaan seputar adat dan budaya Sunda.
- Request ke Gemini dikirim lewat endpoint server-side `/api/chat` agar API key tidak ikut tampil di browser.
- Secara default integrasi memakai endpoint `generateContent` dengan fallback model `gemini-2.5-flash` lalu `gemini-2.5-flash-lite`.
- Backend akan retry singkat untuk error overload sementara sebelum pindah ke model cadangan.
- Untuk deployment di Vercel, tambahkan `GEMINI_API_KEY` dan opsional `GEMINI_MODELS` pada project environment variables.

## Scripts

- `npm run dev` menjalankan website dalam mode development.
- `npm run build` membuat build production.
- `npm run lint` mengecek kualitas kode.
- `npm run optimize:media` mengoptimalkan aset media lewat script internal.
