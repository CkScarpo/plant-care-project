import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import {
  IPlantsProps,
  StorageLoadPlant,
  StorageRemovePlant,
} from "../../libs/storage";
import waterdrop from "../../assets/waterdrop.png";
import emptyStateIcon from "../../assets/waterdrop.png";
import { FlatList } from "react-native-gesture-handler";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PlantCardSecondary } from "../../components/PlantCardSecondary";
import { Load } from "../../components/Load";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<IPlantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadingStorageData() {
      const plantsStorage = await StorageLoadPlant();
      if (plantsStorage.length === 0) {
        await wait(1000);
        setLoading(false);
      } else {
        await wait(3000);
      }

      const nextTime = formatDistanceToNow(
        new Date(plantsStorage[0].dateTimeNotification),
        { locale: ptBR }
      );
      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime}.`
      );
      setMyPlants(plantsStorage);
      setLoading(false);
    }

    loadingStorageData();
  }, []);

  const handleRemove = (plant: IPlantsProps) => {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😢",
        onPress: async () => {
          try {
            await StorageRemovePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover 😢");
          }
        },
      },
    ]);
  };

  if (loading) return <Load />;
  return (
    <View style={styles.container}>
      <Header />
      {myPlants.length && (
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>
      )}
      <View style={styles.plants}>
        {myPlants.length && (
          <Text style={styles.plantsTitle}>Próximas regadas</Text>
        )}
        {myPlants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={emptyStateIcon} style={styles.emptyImage} />
            <Text style={styles.emptyText}>
              Você ainda não tem nenhuma planta cadastrada.
            </Text>
          </View>
        ) : (
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemove={() => {
                  handleRemove(item);
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.plantsList}
          />
        )}
      </View>
    </View>
  );
}
