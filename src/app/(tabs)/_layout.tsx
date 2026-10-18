import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
    return (
        <NativeTabs tintColor="#1E3A29">
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Hari ini</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="checklist" md="checklist" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="jelajah">
                <NativeTabs.Trigger.Label>Jelajah</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="kebunku">
                <NativeTabs.Trigger.Label>Kebunku</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf={{ default: "leaf", selected: "leaf.fill" }}
                    md="eco"
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
