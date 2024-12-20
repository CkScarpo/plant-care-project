import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./stack.routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Routes: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Routes;
