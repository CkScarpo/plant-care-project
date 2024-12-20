import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { styles } from "./styles";
import watering from "../../assets/waterdrop.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function LoadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantcare:user");
      setUserName(user || "");
    }

    LoadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={watering} style={styles.image} />
    </View>
  );
}
