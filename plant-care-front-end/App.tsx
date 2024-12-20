import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import Routes from "./src/routes";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoadded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoadded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoadded]);

  if (!fontsLoadded) {
    return null;
  }
  return <Routes />;
}
