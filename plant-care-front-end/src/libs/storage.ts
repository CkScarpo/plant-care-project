import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";

export interface IPlantsProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
  hour: string;
}

export interface IParamsProps {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: keyof TRootStackParamList;
}

export type TRootStackParamList = {
  Welcome: undefined;
  UserID: undefined;
  Confirmation: {};
  PlantSelect: undefined;
  PlantSave: { plantInfo: IPlantsProps };
  MyPlants: {};
};

export interface IStoragePlantProps {
  [id: string]: {
    data: IPlantsProps;
    notificationId: string;
  };
}

export async function StorageSavePlant(plant: IPlantsProps): Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else nextTime.setDate(nextTime.getDate() + 1);

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heeey, 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      },
    });

    const data = await AsyncStorage.getItem("@plantcare:plants");
    const oldPlants = data ? (JSON.parse(data) as IStoragePlantProps) : {};
    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
      },
    };
    await AsyncStorage.setItem(
      "@plantcare:plants",
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    );
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function StorageLoadPlant(): Promise<IPlantsProps[]> {
  try {
    const data = await AsyncStorage.getItem("@plantcare:plants");
    const plants = data ? (JSON.parse(data) as IStoragePlantProps) : {};
    const plantsSorted = Object.keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(
            new Date(plants[plant].data.dateTimeNotification),
            "HH:mm"
          ),
        };
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );
    return plantsSorted;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function StorageRemovePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantcare:plants");
  const plants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(
    plants[id].notificationId
  );
  delete plants[id];

  await AsyncStorage.setItem("@plantcare:plants", JSON.stringify(plants));
}
