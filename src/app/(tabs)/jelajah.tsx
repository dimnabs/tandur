import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";

export default function JelajahScreen() {
    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Jelajah</Heading>
            <Link href="/plan/kangkung">
                <Text>Buka plan kangkung</Text>
            </Link>
        </View>
    );
}
