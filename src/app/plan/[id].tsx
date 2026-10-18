import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getPlanById } from "@/data/plans";

export default function DetailPlanScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Detail plan</Heading>
            <Text>{getPlanById(id)?.nama}</Text>
        </View>
    );
}
