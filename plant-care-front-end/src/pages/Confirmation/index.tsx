import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IParamsProps, TRootStackParamList } from "../../libs/storage";

type NavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "Confirmation"
>;

const emojis = {
  hug: "🤗",
  smile: "😄",
};

export function Confirmation() {
  const navigation = useNavigation<NavigationProp>();
  const routes = useRoute();

  const { title, subTitle, buttonTitle, icon, nextScreen } =
    routes.params as IParamsProps;

  const handleStart = () => {
    navigation.navigate({ name: nextScreen } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={styles.button}>
          <Button title={buttonTitle} onPress={handleStart} />
        </View>
      </View>
    </SafeAreaView>
  );
}
