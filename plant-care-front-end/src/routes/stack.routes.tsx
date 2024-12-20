import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../styles/colors";
import { Welcome } from "../pages/Welcome";
import { UserID } from "../pages/UserID";
import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import { TRootStackParamList } from "../libs/storage";
import { MyPlants } from "../pages/MyPlants";
import AuthRoutes from "./tab.routes";

const Stack = createNativeStackNavigator<TRootStackParamList>();

const AppRoutes: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={{
      contentStyle: {
        backgroundColor: colors.white,
      },
      gestureEnabled: true,
      gestureDirection: "horizontal",
      headerShown: false,
    }}
  >
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="UserID" component={UserID} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="PlantSelect" component={AuthRoutes} />
    <Stack.Screen name="PlantSave" component={PlantSave} />
    <Stack.Screen name="MyPlants" component={AuthRoutes} />
  </Stack.Navigator>
);

export default AppRoutes;
