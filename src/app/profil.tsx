import { View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useSettingsStore } from "@/store/settings";

export default function ProfilScreen() {
    const jamPengingat = useSettingsStore((state) => state.jamPengingat);
    const setJamPengingat = useSettingsStore((state) => state.setJamPengingat);

    return (
        <View className="flex-1 gap-4 bg-background px-4 pt-16">
            <Heading size="lg">Profil</Heading>
            <Text>Jam pengingat: {jamPengingat}</Text>
            <Button onPress={() => setJamPengingat("07:00")}>
                <ButtonText>Ganti ke 07:00</ButtonText>
            </Button>
        </View>
    );
}
