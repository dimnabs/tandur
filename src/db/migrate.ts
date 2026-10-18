import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    // Dijalankan setiap app dibuka, karena setting ini tidak tersimpan di file DB
    await db.execAsync("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

    const result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version",
    );
    let currentVersion = result?.user_version ?? 0;

    if (currentVersion >= DATABASE_VERSION) {
        return;
    }

    if (currentVersion === 0) {
        await db.execAsync(`
            CREATE TABLE grows (
                id TEXT PRIMARY KEY NOT NULL,
                plan_id TEXT NOT NULL,
                plan_versi INTEGER NOT NULL,
                nama_panggilan TEXT NOT NULL,
                tanggal_mulai TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'aktif'
                    CHECK (status IN ('aktif', 'panen', 'gagal')),
                catatan_akhir TEXT
            );

            CREATE TABLE tasks (
                id TEXT PRIMARY KEY NOT NULL,
                grow_id TEXT NOT NULL REFERENCES grows(id) ON DELETE CASCADE,
                step_id TEXT NOT NULL,
                tanggal TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'belum'
                    CHECK (status IN ('belum', 'selesai', 'tunda', 'lewat'))
            );
            CREATE INDEX idx_tasks_tanggal ON tasks(tanggal);
            CREATE INDEX idx_tasks_grow_id ON tasks(grow_id);

            CREATE TABLE jurnal (
                id TEXT PRIMARY KEY NOT NULL,
                grow_id TEXT NOT NULL REFERENCES grows(id) ON DELETE CASCADE,
                tanggal TEXT NOT NULL,
                foto_uri TEXT,
                catatan TEXT
            );
        `);
        currentVersion = 1;
    }

    // Migrasi berikutnya nanti ditambah di sini:
    // if (currentVersion === 1) { ...ALTER TABLE...; currentVersion = 2; }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
