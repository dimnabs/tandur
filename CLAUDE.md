# Tandur — konteks project

Tandur (nama sementara) adalah app mobile React Native yang mengubah panduan menanam jadi jadwal perawatan harian, menemani pemula dari semai sampai panen. Ini proyek React Native pertama Dims, jadi utamakan kode yang jelas dan mudah dipelajari daripada yang paling canggih.

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

| Prioritas | Fitur |
| --- | --- |
| Must | Katalog plan kurasi, detail plan, mulai tanam → Kebunku, tab Hari ini (centang/tunda), notifikasi lokal |
| Should | Jurnal foto per Kebunku, akun & sinkronisasi, buat plan sendiri |
| Could | Fork plan, rating "berhasil panen", pengingat sesuai cuaca |
| Won't (v1) | Feed sosial, marketplace bahan, diagnosis penyakit pakai AI |

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

| Bagian | Pilihan |
| --- | --- |
| Setup | Expo (managed) |
| Navigasi | Expo Router, 3 tab: Hari ini, Jelajah, Kebunku |
| UI library | gluestack-ui v5 (komponen ditambahkan ke repo lewat CLI, jadi bisa diubah langsung) |
| Styling | NativeWind v5 (Tailwind CSS v4) lewat `className`; token di `global.css` |
| State | Zustand |
| Penyimpanan lokal | expo-sqlite (Kebunku, task, jurnal) |
| Data plan kurasi | File JSON dibundel di app |
| Foto jurnal | expo-image-picker + expo-file-system |
| Notifikasi | expo-notifications (lokal, terjadwal) |
| Backend (fase 2) | Supabase: auth, database, storage foto |
| Crash report | Sentry |
| Build & rilis | EAS Build + EAS Submit; Play Store dulu, App Store menyusul |

MVP berjalan **tanpa backend**. Jangan tambahkan server sebelum fase 2.

## Model data

```
Plan: id, nama, jenis_tanaman, kesulitan, media (pot|lahan|hidroponik),
      cahaya, durasi_hari, bahan[], alat[], author_id, versi
PlanStep: id, plan_id, judul, deskripsi, tipe (sekali|berulang),
      hari_mulai, hari_selesai?, interval_hari?
Grow (Kebunku): id, plan_id, plan_versi, nama_panggilan, tanggal_mulai,
      status (aktif|panen|gagal), catatan_akhir
Task: id, grow_id, step_id, tanggal, status (belum|selesai|tunda|lewat)
Jurnal: id, grow_id, tanggal, foto_uri?, catatan
```

Aturan generate task saat "Mulai tanam":
- Langkah **sekali** → satu task di `tanggal_mulai + hari_mulai`.
- Langkah **berulang** → satu task setiap `interval_hari`, dari `hari_mulai` sampai `hari_selesai`.
- Grow menyimpan `plan_versi` supaya perubahan plan tidak mengacaukan tanaman yang sedang berjalan.

Contoh plan (angka belum divalidasi): Kangkung di pot — rendam benih (hari 0), tabur (hari 1), siram tiap hari (1–28), pupuk organik cair tiap 7 hari (7–21), jarangkan (hari 10), panen (25–30).

## Notifikasi

- iOS membatasi sekitar 64 notifikasi lokal terjadwal per app. Jadwalkan hanya **7–14 hari ke depan**, dan jadwal ulang setiap app dibuka.
- Gabungkan semua tugas di hari yang sama jadi **satu notifikasi** di jam pilihan pengguna (default 06:30).

## Arah visual (wireframe v2)

Warna:

| Peran | Hex |
| --- | --- |
| Latar | `#EFEEE6` |
| Permukaan terangkat | `#F8F8F3` |
| Langkah tone (track, chip, kelompok) | `#E3E3D7` |
| Teks utama | `#142019` |
| Teks sekunder | `#3F4A43` / `#4A564E` |
| Bidang hijau tua (header, tile ilustrasi) | `#1E3A29` |
| Hijau tua kedua (tombol di atas bidang gelap) | `#2E4C38` |
| Aksen limau (status aktif, progres di bidang gelap) | `#C5EB6E` |
| Peringatan "telat" | `#8A4B0F` di latar terang, `#F2C48D` di latar gelap |

Tipografi:
- **Bricolage Grotesque** untuk judul dan angka besar, tracking −0.02 sampai −0.05em.
- **Figtree** untuk teks, minimal 16px untuk isi, 14px untuk keterangan.
- Pakai `@expo-google-fonts`.

Aturan:
- Pemisah pakai **beda tone latar**, bukan garis/border 1px. Tidak ada bayangan, kecuali pada yang benar-benar mengambang (tab bar).
- Satu aksen saja (limau), dipakai untuk status aktif dan progres.
- Tombol berbentuk **pil penuh**. Area sentuh minimal **44×44**.
- Tidak ada badge/pill label yang berlebihan; status ditulis sebagai teks berwarna.
- Tidak ada emoji sebagai ikon. Ikon garis custom yang konsisten.
- **Tab bar:** pil solid gelap `#142019` mengambang (kiri/kanan 20, bawah 28 + safe area). Tab aktif = pil limau berisi ikon + label; tab lain cukup ikon dengan `accessibilityLabel`. Konten mengalir di belakangnya, jadi beri padding bawah di list.
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

| Milestone | Isi |
| --- | --- |
| M0 | PRD + wireframe (selesai) |
| M1 | Setup lewat `npm create gluestack@latest`, token tema di `global.css`, Expo Router 3 tab, SQLite, format JSON plan |
| M2 | Katalog, detail plan, mulai tanam, generate task |
| M3 | Tab Hari ini, centang/tunda, notifikasi bergulir |
| M4 | 10–15 plan kurasi, jurnal foto, empty state, ikon |
| M5 | Beta 10–20 tester |
| M6 | Rilis Play Store |

## Pertanyaan terbuka

- Tanaman apa saja yang masuk 10–15 plan kurasi pertama, dan dari mana sumber isinya?
- Apakah tugas yang terlewat digeser otomatis atau dibiarkan?
- Durasi tanam bayam, cabai rawit, selada hidroponik masih `[durasi]`; semua angka plan perlu divalidasi.
- Nama final app (cek ketersediaan di Play Store).
