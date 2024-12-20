import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { EnviromentButton } from "../../components/EnviromentButton";
import api from "../../services/api";
import { PlantCardPrimary } from "../../components/PlantCardPrimary";
import { Load } from "../../components/Load";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IPlantsProps, TRootStackParamList } from "../../libs/storage";

interface IEnviromentProps {
  key: string;
  title: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type NavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "PlantSelect"
>;

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<IEnviromentProps[]>([]);
  const [enviromentsSelected, setEnviromentsSelected] = useState("all");
  const [plants, setPlants] = useState<IPlantsProps[]>([]);
  const [filterdPlants, setFilterdPlants] = useState<IPlantsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const navigation = useNavigation<NavigationProp>();

  const limit = 8;

  useEffect(() => {
    async function fetchEnvirioment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      await wait(3000);

      setEnviroments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fetchEnvirioment();
  }, []);

  async function fetchPlants(start: number, limit: number) {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_start=${start}&_limit=${limit}`
    );
    await wait(3000);
    if (!data) return setLoading(true);

    if (start > 0) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilterdPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilterdPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchPlants((page - 1) * limit, limit);
  }, [page]);

  const handleEnviromentsSelected = (enviroment: string) => {
    setEnviromentsSelected(enviroment);

    if (enviroment === "all") return setFilterdPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(enviroment)
    );
    setFilterdPlants(filtered);
  };

  const handlePlantSelect = (plant: IPlantsProps) => {
    navigation.navigate("PlantSave", { plantInfo: plant });
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
  };

  if (loading) return <Load />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentsSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>
      <View style={styles.plantsCard}>
        <FlatList
          data={filterdPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
}
