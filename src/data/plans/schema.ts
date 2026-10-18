import { z } from "zod";

const langkahDasar = {
    id: z.string(),
    judul: z.string(),
    deskripsi: z.string(),
    hari_mulai: z.number().int().min(0),
};

export const planStepSchema = z.discriminatedUnion("tipe", [
    z.object({ ...langkahDasar, tipe: z.literal("sekali") }),
    z.object({
        ...langkahDasar,
        tipe: z.literal("berulang"),
        hari_selesai: z.number().int().min(0),
        interval_hari: z.number().int().min(1),
    }),
]);

const barangSchema = z.object({ nama: z.string(), jumlah: z.string() });

export const planSchema = z.object({
    id: z.string(),
    versi: z.number().int().min(1),
    nama: z.string(),
    ringkasan: z.string(),
    jenis_tanaman: z.enum(["sayur", "tanaman-hias"]),
    kesulitan: z.enum(["mudah", "sedang", "sulit"]),
    media: z.enum(["pot", "lahan", "hidroponik"]),
    cahaya: z.enum(["penuh", "sebagian", "teduh"]),
    durasi_hari: z.number().int().min(1),
    bahan: z.array(barangSchema),
    alat: z.array(barangSchema),
    langkah: z.array(planStepSchema),
    author_id: z.string(),
});

export type Plan = z.infer<typeof planSchema>;
export type PlanStep = z.infer<typeof planStepSchema>;
