import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import wateringImg from "../../assets/watering.png";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRootStackParamList } from "../../libs/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<TRootStackParamList, "Welcome">;

export function Welcome() {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function LoadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantcare:user");
      setUserName(user || "");
    }

    LoadStorageUserName();
  }, []);

  const handleStart = () => {
    if (!userName) navigation.navigate("UserID");
    else navigation.navigate("PlantSelect");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"} suas plantas de {"\n"} forma fácil
      </Text>
      <Image source={wateringImg} style={styles.image} resizeMode="contain" />
      <Text style={styles.subTitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handleStart}
      >
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
