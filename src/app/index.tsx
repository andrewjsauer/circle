import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import SplashScreen from "react-native-splash-screen";

import { theme } from "@utils";
import { HomeScreen, LoginScreen, RegisterScreen, Dashboard } from "@screens";
import * as routes from "@constants/routes";

import { useAppStateListener, useAuthStateListener } from "./hooks";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const isUserAuthenticated = useAuthStateListener();

  useAppStateListener();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isUserAuthenticated ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.HOME_SCREEN}
                component={HomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.LOGIN_SCREEN}
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.REGISTER_SCREEN}
                component={RegisterScreen}
              />
            </>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name={routes.DASHBOARD_SCREEN}
              component={Dashboard}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
