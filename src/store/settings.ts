import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TempatMenanam = "balkon" | "teras" | "halaman" | "belum-ada";
export type Pengalaman = "pemula" | "pernah-coba" | "berpengalaman";

type SettingsState = {
    onboardingSelesai: boolean;
    tempatMenanam: TempatMenanam | null;
    pengalaman: Pengalaman | null;
    jamPengingat: string; // format "HH:mm"

    setTempatMenanam: (tempat: TempatMenanam) => void;
    setPengalaman: (pengalaman: Pengalaman) => void;
    setJamPengingat: (jam: string) => void;
    selesaikanOnboarding: () => void;
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            onboardingSelesai: false,
            tempatMenanam: null,
            pengalaman: null,
            jamPengingat: "06:30",

            setTempatMenanam: (tempatMenanam) => set({ tempatMenanam }),
            setPengalaman: (pengalaman) => set({ pengalaman }),
            setJamPengingat: (jamPengingat) => set({ jamPengingat }),
            selesaikanOnboarding: () => set({ onboardingSelesai: true }),
        }),
        {
            name: "tandur-settings",
            storage: createJSONStorage(() => Storage),
        },
    ),
);
