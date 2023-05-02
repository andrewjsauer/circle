import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import { theme } from "@utils";
import {
  Browser,
  CoursesScreen,
  Dashboard,
  HomeScreen,
  LoginScreen,
  MeditationBuilderScreen,
  PlayerScreen,
  RegisterScreen,
  FeedbackScreen,
} from "@screens";
import * as routes from "@constants/routes";

import {
  useSetupIAP,
  useAppStateListener,
  useAuthStateListener,
} from "./hooks";

const Stack = createStackNavigator();

export default function App() {
  useSetupIAP();

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
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.DASHBOARD_SCREEN}
                component={Dashboard}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.MEDITATION_BUILDER_SCREEN}
                component={MeditationBuilderScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.COURSES_SCREEN}
                component={CoursesScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.PLAYER_SCREEN}
                component={PlayerScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={routes.FEEDBACK_SCREEN}
                component={FeedbackScreen}
              />
            </>
          )}
          <Stack.Screen
            options={{ headerTitle: "", headerBackTitle: "Go Back" }}
            name={routes.BROWSER_SCREEN}
            component={Browser}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
