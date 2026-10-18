import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Link } from "expo-router";

export default function HariIniScreen() {
    const db = useSQLiteContext();
    const [tables, setTables] = useState<string[]>([]);

    useEffect(() => {
        db.getAllAsync<{ name: string }>(
            "SELECT name FROM sqlite_master WHERE type = 'table'",
        ).then((rows) => setTables(rows.map((row) => row.name)));
    }, [db]);

    return (
        <View className="flex-1 bg-background px-4 pt-16">
            <Heading size="lg">Hari ini</Heading>
            <Link href="/profil">Go to Profil page</Link>
        </View>
    );
}
