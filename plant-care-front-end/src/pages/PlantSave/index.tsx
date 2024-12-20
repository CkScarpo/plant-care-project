import React, { useState } from "react";
import {
  View,
  Alert,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import { styles } from "./styles";
import waterdrop from "../../assets/waterdrop.png";
import { Button } from "../../components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";
import {
  StorageLoadPlant,
  StorageSavePlant,
  TRootStackParamList,
} from "../../libs/storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PlantSaveRouteProp = RouteProp<TRootStackParamList, "PlantSave">;

type NavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "PlantSave"
>;

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const route = useRoute<PlantSaveRouteProp>();
  const { plantInfo } = route.params;

  const navigation = useNavigation<NavigationProp>();

  const formattedTime = format(selectedDateTime, "HH:mm");

  const handleChangeTime = (
    event: DateTimePickerEvent,
    dateTime: Date | undefined
  ) => {
    if (event.type === "set") {
      if (Platform.OS == "android") setShowDatePicker((oldState) => !oldState);
      if (dateTime && isBefore(dateTime, new Date())) {
        setSelectedDateTime(new Date());
        return Alert.alert("Escolha uma data no futuro! ⏰");
      }
      if (dateTime) setSelectedDateTime(dateTime);
    }
  };

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker((oldState) => !oldState);
  };

  async function handleSave() {
    try {
      await StorageSavePlant({
        ...plantInfo,
        dateTimeNotification: selectedDateTime,
      });
      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subTitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar. 😢");
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plantInfo.photo} width={150} height={150} />
          <Text style={styles.plantName}>{plantInfo.name}</Text>
          <Text style={styles.plantAbout}>{plantInfo.about}</Text>
        </View>
        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plantInfo.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>{plantInfo.water_tips}</Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode={"time"}
              display={Platform.OS === "ios" ? "spinner" : "clock"}
              onChange={handleChangeTime}
            />
          )}
          {Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${formattedTime}`}
              </Text>
            </TouchableOpacity>
          )}
          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}
