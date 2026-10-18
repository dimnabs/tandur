import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function DetailKebunkuScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Detail kebunku</Heading>
            <Text>id: {id}</Text>
        </View>
    );
}
