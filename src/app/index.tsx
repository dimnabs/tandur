import { Heading } from "@/components/ui/heading";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center gap-3 bg-background px-4">
            <Heading size="xl">Kangkung di pot</Heading>
            <Heading size="lg">Kamu menanam di mana?</Heading>
            <Heading size="md">Jalur 30 hari</Heading>
            <Heading size="sm">Tandur</Heading>
            <Text>Isi paragraf biasa</Text>
            <Text semibold>Label semibold</Text>
            <Text bold>Teks bold</Text>
        </View>
    );
}
