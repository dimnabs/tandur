# Tandur — konteks project

Tandur (nama sementara) adalah app mobile React Native yang mengubah panduan menanam jadi jadwal perawatan harian, menemani pemula dari semai sampai panen. Ini proyek React Native pertama Dims, jadi utamakan kode yang jelas dan mudah dipelajari daripada yang paling canggih.

- **Mode belajar:** Project ini untuk belajar. **Jangan tulis atau ubah kode app kecuali Dims minta secara eksplisit.** Defaultnya jadi mentor: jelaskan konsep, tunjukkan docs, review kode yang Dims tulis. Snippet di penjelasan boleh, tapi jangan terapkan ke repo tanpa diminta.
- **Cara mengajar:** untuk konsep yang **baru** (library/API yang belum pernah dipakai), beri contoh kode lengkap + penjelasan tiap bagian, lalu Dims yang mengetik. Hint dan pertanyaan pancingan hanya untuk konsep yang sudah pernah dipelajari. Contoh kode harus dicek dulu (typecheck) terhadap versi library yang terpasang.
- **Komunikasi:** Bahasa Indonesia santai; istilah teknis boleh tetap bahasa Inggris.
- **Dokumen sumber:**
    - PRD: https://claude.ai/code/artifact/ea09b55e-b2c4-4dee-9e42-eb9d203a2700
    - Wireframe (kanvas Design, halaman "v2 · arah visual" adalah versi acuan): https://claude.ai/artifact/WpwhJtrwqujjwv4BoVUoLc
- Kalau ada keputusan baru yang mengubah isi file ini, usulkan update ke CLAUDE.md.

## Konsep inti

- **Plan** = "resep tanam" terstruktur: bahan, alat, langkah, jadwal perawatan. MVP hanya berisi 10–15 plan kurasi untuk pemula.
- **Kebunku (Grow)** = satu tanaman yang sedang dijalankan dari sebuah plan, dengan tanggal mulai milik pengguna. Saat "Mulai tanam", semua langkah plan dihitung jadi **Task** bertanggal.
- **Tugas hari ini** = gabungan task semua Kebunku aktif untuk hari ini, bisa dicentang atau ditunda.
- Masalah cold start (belum ada plan karena belum ada pengguna) diatasi dengan plan kurasi. Fitur komunitas menyusul.

## Pengguna

- **Utama:** pemula di kota (balkon, teras, halaman kecil), usia 20–40.
- **Kedua (fase 2):** penghobi berpengalaman yang ingin membagikan plan.
- **Bukan target MVP:** petani atau usaha tani komersial.

## Scope MVP

| Prioritas  | Fitur                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Must       | Katalog plan kurasi, detail plan, mulai tanam → Kebunku, tab Hari ini (centang/tunda), notifikasi lokal |
| Should     | Jurnal foto per Kebunku, akun & sinkronisasi, buat plan sendiri                                         |
| Could      | Fork plan, rating "berhasil panen", pengingat sesuai cuaca                                              |
| Won't (v1) | Feed sosial, marketplace bahan, diagnosis penyakit pakai AI                                             |

Kerjakan fitur **Must** sampai beta sebelum menyentuh yang lain.

## Layar (7)

1. **Onboarding** — 3 pertanyaan: tempat menanam, pengalaman, jam pengingat. Bisa dilewati.
2. **Hari ini** (tab) — tugas semua tanaman, dikelompokkan per tanaman. Tugas terlewat ditandai "telat N hari" tanpa menghukum.
3. **Jelajah** (tab) — cari + filter (Semua, Sayur, Tanaman hias, Hidroponik), satu plan unggulan, lalu daftar plan.
4. **Detail plan** — info ringkas, diagram "Jalur N hari", bahan & alat, langkah, tombol "Mulai tanam".
5. **Kebunku** (tab) — kartu tanaman aktif/selesai dengan angka hari besar dan progres.
6. **Detail Kebunku** — hari ke-N, perkiraan panen, jadwal (hari ini, 3 hari ke depan, riwayat), jurnal, "Tandai panen atau gagal".
7. **Profil** — masuk (Google/email, fase 2), jam pengingat, satukan notifikasi, tempat menanam, tentang.

Kondisi khusus yang wajib ada: Kebunku kosong, tugas terlewat, tanpa internet (semua fitur inti tetap jalan), izin notifikasi ditolak.

## Stack

| Bagian            | Pilihan                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| Setup             | Expo (managed)                                                                                     |
| Navigasi          | Expo Router + `NativeTabs` (`expo-router/unstable-native-tabs`), 3 tab: Hari ini, Jelajah, Kebunku |
| UI library        | gluestack-ui v5 (komponen ditambahkan ke repo lewat CLI, jadi bisa diubah langsung)                |
| Styling           | NativeWind v5 (Tailwind CSS v4) lewat `className`; token di `global.css`                           |
| State             | Zustand; setting disimpan lewat middleware `persist` ke `expo-sqlite/kv-store`                     |
| Penyimpanan lokal | expo-sqlite (Kebunku, task, jurnal), migrasi lewat `PRAGMA user_version`                           |
| Data plan kurasi  | File JSON dibundel di app, divalidasi dengan zod saat app dibuka                                   |
| Animasi           | react-native-reanimated (pakai `.get()`/`.set()` karena React Compiler aktif)                      |
| Foto jurnal       | expo-image-picker + expo-file-system                                                               |
| Notifikasi        | expo-notifications (lokal, terjadwal)                                                              |
| Backend (fase 2)  | Supabase: auth, database, storage foto                                                             |
| Crash report      | Sentry                                                                                             |
| Build & rilis     | EAS Build + EAS Submit; Play Store dulu, App Store menyusul                                        |

MVP berjalan **tanpa backend**. Jangan tambahkan server sebelum fase 2.

## Model data

```
Plan (JSON): id, versi, nama, ringkasan, jenis_tanaman (sayur|tanaman-hias),
      kesulitan (mudah|sedang|sulit), media (pot|lahan|hidroponik),
      cahaya (penuh|sebagian|teduh), durasi_hari,
      bahan[{nama, jumlah}], alat[{nama, jumlah}], langkah[PlanStep], author_id
PlanStep (di dalam plan, tanpa plan_id): discriminated union pada `tipe`
      sekali:   id, judul, deskripsi, hari_mulai
      berulang: id, judul, deskripsi, hari_mulai, hari_selesai, interval_hari
Grow (Kebunku): id, plan_id, plan_versi, nama_panggilan, tanggal_mulai,
      status (aktif|panen|gagal), catatan_akhir
Task: id, grow_id, step_id, tanggal, status (belum|selesai|tunda|lewat)
Jurnal: id, grow_id, tanggal, foto_uri?, catatan
```

- Skema plan = zod di `src/data/plans/schema.ts`; tipe `Plan`/`PlanStep` diturunkan lewat `z.infer`. Akses plan hanya lewat `src/data/plans/index.ts` (`plans`, `getPlanById`).
- Grow, Task, Jurnal = tabel SQLite (`grows`, `tasks`, `jurnal`) di `src/db/migrate.ts`, skema versi 1. Foreign key `ON DELETE CASCADE`, `CHECK` untuk status, index di `tasks(tanggal)` dan `tasks(grow_id)`.
- Tanggal disimpan sebagai teks `YYYY-MM-DD`. ID bertipe teks (UUID).
- "Hidroponik" di filter Jelajah diambil dari `media`, bukan `jenis_tanaman`.

Aturan generate task saat "Mulai tanam":

- Langkah **sekali** → satu task di `tanggal_mulai + hari_mulai`.
- Langkah **berulang** → satu task setiap `interval_hari`, dari `hari_mulai` sampai `hari_selesai`.
- Grow menyimpan `plan_versi` supaya perubahan plan tidak mengacaukan tanaman yang sedang berjalan.

Contoh plan (angka belum divalidasi): Kangkung di pot — rendam benih (hari 0), tabur (hari 1), siram tiap hari (1–28), pupuk organik cair tiap 7 hari (7–21), jarangkan (hari 10), panen (25–30). Sudah ada di `src/data/plans/kangkung-di-pot.json`; panen sementara ditulis sebagai `sekali` di hari 25, rentangnya di deskripsi.

## Struktur kode

```
src/app/                 route saja (Expo Router)
  _layout.tsx            root Stack (headerShown false): font, GluestackUIProvider, SQLiteProvider
  (tabs)/_layout.tsx     NativeTabs: index (Hari ini), jelajah, kebunku
  plan/[id].tsx          Detail plan
  kebunku/[id].tsx       Detail Kebunku
  profil.tsx, onboarding.tsx
src/components/ui/       komponen gluestack yang sudah disesuaikan (button, text, heading, pressable)
src/db/migrate.ts        skema + migrasi SQLite
src/store/settings.ts    Zustand: onboarding, tempat menanam, pengalaman, jam pengingat
src/data/plans/          skema zod + JSON plan kurasi
src/global.css           token warna & font
example/                 contoh template Expo, hanya referensi (di-ignore tsc, ESLint, Prettier)
```

- Path alias `@/*` → `src/*`, cukup dari `tsconfig.json` (tidak pakai `module-resolver` di Babel).
- Sebelum commit: `npm run lint`, `npm run typecheck`, `npx prettier --check .` (Prettier: 4 spasi, kutip ganda).
- Setelah `npx gluestack-ui add`, rapikan warning `import/no-duplicates` di file baru.

## Notifikasi

- iOS membatasi sekitar 64 notifikasi lokal terjadwal per app. Jadwalkan hanya **7–14 hari ke depan**, dan jadwal ulang setiap app dibuka.
- Gabungkan semua tugas di hari yang sama jadi **satu notifikasi** di jam pilihan pengguna (default 06:30).

## Arah visual (wireframe v2)

Warna:

| Peran                                               | Hex                                                 |
| --------------------------------------------------- | --------------------------------------------------- |
| Latar                                               | `#EFEEE6`                                           |
| Permukaan terangkat                                 | `#F8F8F3`                                           |
| Langkah tone (track, chip, kelompok)                | `#E3E3D7`                                           |
| Teks utama                                          | `#142019`                                           |
| Teks sekunder                                       | `#3F4A43` / `#4A564E`                               |
| Bidang hijau tua (header, tile ilustrasi)           | `#1E3A29`                                           |
| Hijau tua kedua (tombol di atas bidang gelap)       | `#2E4C38`                                           |
| Teks di atas bidang gelap / tombol utama            | `#EEF3E8`                                           |
| Hijau panen (diagram Jalur)                         | `#3D7A2E` untuk teks, `#4F8A3A` untuk bar           |
| Aksen limau (status aktif, progres di bidang gelap) | `#C5EB6E`                                           |
| Peringatan "telat"                                  | `#8A4B0F` di latar terang, `#F2C48D` di latar gelap |

Token di `global.css`: slot semantik gluestack diisi palet di atas (`background`, `card`, `muted`, `primary`, `border` = sama dengan `muted`, dst.; nama slot jangan diganti), plus token tambahan `forest`, `forest-2`, `lime`, `warning`, `warning-on-dark`, `secondary-text`. App dikunci ke **light mode** (`userInterfaceStyle: "light"`, provider `mode="light"`); class `dark:` di komponen gluestack masih pakai warna bawaan dan harus ditinjau kalau dark mode diaktifkan.

Tipografi:

- **Bricolage Grotesque** untuk judul dan angka besar, tracking −0.02 sampai −0.05em.
- **Figtree** untuk teks, minimal 16px untuk isi, 14px untuk keterangan.
- Pakai `@expo-google-fonts`. Ketebalan yang di-load: Bricolage 700/800, Figtree 400/600/700.
- Di RN tiap ketebalan = font terpisah, jadi **jangan pakai `font-bold`**. Pakai token: `font-display`, `font-display-heavy`, `font-body`, `font-body-semibold`, `font-body-bold`.
- `Text` default `font-body text-base`. `Heading` default `font-display`, ukuran `xl` 40 / `lg` 34 / `md` 24 (default) / `sm` 22.

Aturan:

- Pemisah pakai **beda tone latar**, bukan garis/border 1px. Tidak ada bayangan, kecuali pada yang benar-benar mengambang (tab bar).
- Satu aksen saja (limau), dipakai untuk status aktif dan progres.
- Tombol berbentuk **pil penuh**. Area sentuh minimal **44×44**.
- Tidak ada badge/pill label yang berlebihan; status ditulis sebagai teks berwarna.
- Tidak ada emoji sebagai ikon. Ikon garis custom yang konsisten.
- **Tab bar:** pakai `NativeTabs`, yaitu tab bar asli sistem (iOS: liquid glass, Android: Material bottom navigation). Tampilannya memang beda per platform; yang diatur cukup warna (`tintColor`, latar, indikator) dari palet. Ikon tab: SF Symbols di iOS (`sf`), Material Symbols di Android (`md`), jadi aturan "ikon garis custom" tidak berlaku untuk tab bar. API masih `unstable-`, cek ulang saat upgrade SDK. Layar detail (plan, Kebunku) ada di luar grup tab, jadi tab bar tidak tampil di sana.
- Elemen khas: angka hari besar ("12 hari dari 30") dan diagram "Jalur N hari" di Detail plan.
- Ilustrasi tanaman sekarang hanya SVG sementara; nanti diganti foto asli.

## gluestack-ui

- Setup project baru: `npm create gluestack@latest` (template Expo + Expo Router). Tambah komponen per kebutuhan: `npx gluestack-ui add button checkbox input ...`.
- Pin `lightningcss` ke versi 1.30.1 di `overrides`/`resolutions` untuk menghindari error build Metro (catatan rilis v5).
- Token tema (warna, radius, font, dark mode) didefinisikan sebagai CSS variable di `global.css` dalam blok `@layer theme`, lalu diekspos ke Tailwind lewat `@theme inline`. Isi token dengan palet di bagian "Arah visual", jangan pakai warna default gluestack.
- Tampilan bawaan gluestack (border 1px, bayangan, radius sedang) **bertentangan** dengan aturan visual project ini. Karena komponennya ada di repo, ubah variannya: border → tone latar, tombol → pil penuh, bayangan dihapus.
- Jangan campur dengan `StyleSheet` atau library UI lain kecuali ada alasan jelas.

## Interaksi & animasi (prinsip Emil Kowalski)

- Tombol: scale 0.97 saat ditekan, 100–160ms, ease-out.
- Animasi UI di bawah 300ms. Jangan pakai ease-in. Jangan animasikan dari `scale(0)`; mulai dari 0.95 + opacity.
- Animasikan hanya `transform` dan `opacity`.
- Hormati setting reduce motion.
- Untuk animasi di Expo, rujuk skill `animate-expo` dari `emilkowalski/skills`.

## Skill yang disarankan untuk repo ini

```
npx skills add vercel-labs/agent-skills    # berisi vercel-react-native-skills
npx skills add emilkowalski/skills         # pakai animate-expo, emil-design-eng
```

`taste-skill` dibuat untuk halaman web, jadi tidak wajib dipasang. Aturan visualnya sudah dirangkum di atas.

## Milestone

| Milestone | Isi                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| M0        | PRD + wireframe (selesai)                                                                                                    |
| M1        | Setup lewat `npm create gluestack@latest`, token tema di `global.css`, Expo Router 3 tab, SQLite, format JSON plan (selesai) |
| M2        | Katalog, detail plan, mulai tanam, generate task                                                                             |
| M3        | Tab Hari ini, centang/tunda, notifikasi bergulir                                                                             |
| M4        | 10–15 plan kurasi, jurnal foto, empty state, ikon                                                                            |
| M5        | Beta 10–20 tester                                                                                                            |
| M6        | Rilis Play Store                                                                                                             |

## Pertanyaan terbuka

- Tanaman apa saja yang masuk 10–15 plan kurasi pertama, dan dari mana sumber isinya?
- Apakah tugas yang terlewat digeser otomatis atau dibiarkan?
- Durasi tanam bayam, cabai rawit, selada hidroponik masih `[durasi]`; semua angka plan perlu divalidasi.
- Nama final app (cek ketersediaan di Play Store).
- Panen itu rentang hari (mis. 25–30). Perlu tipe langkah ketiga `rentang`, atau cukup `sekali` + deskripsi? Putuskan di fase 1 (pengaruh ke diagram Jalur dan perkiraan panen).
- Layar masih pakai `pt-16` sementara; ganti dengan safe area saat membangun layar asli.
