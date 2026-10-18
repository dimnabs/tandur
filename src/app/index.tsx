import { Button, ButtonText } from "@/components/ui/button";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center gap-3 bg-background px-4">
            <Button>
                <ButtonText>Mulai tanam</ButtonText>
            </Button>
            <Button variant="secondary">
                <ButtonText>Secondary</ButtonText>
            </Button>
            <Button variant="destructive">
                <ButtonText>Tandai gagal</ButtonText>
            </Button>
            <Button variant="ghost">
                <ButtonText>Lewati dulu</ButtonText>
            </Button>
            <Button variant="link">
                <ButtonText>Link</ButtonText>
            </Button>
            <Button size="sm">
                <ButtonText>Kecil</ButtonText>
            </Button>
            <Text className="font-body text-foreground">Teks biasa</Text>
        </View>
    );
}
