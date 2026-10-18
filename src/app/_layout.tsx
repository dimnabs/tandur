import { SplashScreen, Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useFonts } from "expo-font";
import {
    Figtree_400Regular,
    Figtree_600SemiBold,
    Figtree_700Bold,
} from "@expo-google-fonts/figtree";
import {
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Figtree_400Regular,
        Figtree_600SemiBold,
        Figtree_700Bold,
        BricolageGrotesque_700Bold,
        BricolageGrotesque_800ExtraBold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light">
            <Stack screenOptions={{ headerShown: false }} />
        </GluestackUIProvider>
    );
}
