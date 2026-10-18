import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import { plans } from "@/data/plans";

export default function JelajahScreen() {
    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Jelajah</Heading>
            {plans.map((plan) => (
                <Link key={plan.id} href={`/plan/${plan.id}`}>
                    <Text>{plan.nama}</Text>
                </Link>
            ))}
        </View>
    );
}
