import React, { useState, memo } from "react";
import { useTranslation } from "react-i18next";

import { BottomNavigation, MD2Colors } from "react-native-paper";
import { Navigation } from "@types";
import backgroundImage from "@assets/background.png";

import Home from "./home";
import User from "./user";
import Meditations from "./meditations";
import { useGetUserData } from "./hooks";
import { Layout, LoadingSpinner, Subtitle } from "./styles";

type Props = {
  navigation: Navigation;
};

const HomeScreen = (navigation) => <Home navigation={navigation} />;
const MeditationsScreen = (navigation) => (
  <Meditations navigation={navigation} />
);
const UserScreen = (navigation) => <User navigation={navigation} />;

const Dashboard = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {
      key: "saved",
      title: "Saved",
      focusedIcon: "download-box",
      unfocusedIcon: "download-box-outline",
    },
    {
      key: "home",
      title: "Home",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    {
      key: "user",
      title: "User",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const isLoading = useGetUserData();

  const renderScene = BottomNavigation.SceneMap({
    home: () => HomeScreen(navigation),
    saved: () => MeditationsScreen(navigation),
    user: () => UserScreen(navigation),
  });

  return isLoading ? (
    <Layout source={backgroundImage}>
      <LoadingSpinner size="large" animating={true} color={MD2Colors.blue500} />
      <Subtitle variant="titleLarge">{t("fetchingYourData")}</Subtitle>
    </Layout>
  ) : (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default memo(Dashboard);
