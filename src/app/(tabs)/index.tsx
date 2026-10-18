import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";

export default function HariIniScreen() {
    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Hari ini</Heading>
            <Link href="/profil">Go to Profil page</Link>
        </View>
    );
}
