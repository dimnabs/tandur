import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center gap-3 bg-background px-4">
            <Button>
                <ButtonText>Mulai tanam</ButtonText>
            </Button>
        </View>
    );
}
