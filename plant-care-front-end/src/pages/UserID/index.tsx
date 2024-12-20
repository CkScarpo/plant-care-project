import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "../../components/Button";
import colors from "../../styles/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRootStackParamList } from "../../libs/storage";

type NavigationProp = NativeStackNavigationProp<TRootStackParamList, "UserID">;

export function UserID() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  async function handleSubmit() {
    if (!name) return Alert.alert("Me diz como chamar você 😢");

    try {
      await AsyncStorage.setItem("@plantcare:user", name);
      navigation.navigate("Confirmation", {
        title: "Prontinho",
        subTitle:
          "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantSelect",
      });
    } catch {
      Alert.alert("Não foi possível salvar o seu nome. 😢");
    }
  }

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!name);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = (value: string) => {
    setIsFilled(!!value);
    setName(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
              <Text style={styles.title}>Como podemos {"\n"} chamar você?</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green },
              ]}
              placeholder="Digite um nome"
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <View style={styles.button}>
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
