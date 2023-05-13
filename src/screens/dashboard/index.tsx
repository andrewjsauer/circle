import React, { useState, memo } from "react";
import { useTranslation } from "react-i18next";

import { withIAPContext } from "react-native-iap";
import { BottomNavigation, MD2Colors } from "react-native-paper";

import { Navigation } from "@types";

import Home from "./home";
import User from "./user";
import Meditations from "./meditations";
import { useGetUserData, useInAppPurchases } from "./hooks";

import { Layout, LoadingSpinner, Subtitle } from "./styles";

type Props = {
  navigation: Navigation;
};

const HomeScreen = (
  navigation,
  isSubscribing,
  isSubscriptionReady,
  subscriptionErrorMessage,
  handleSubscribe,
) => (
  <Home
    navigation={navigation}
    onSubscribe={handleSubscribe}
    subscriptionErrorMessage={subscriptionErrorMessage}
    isSubscriptionReady={isSubscriptionReady}
    isSubscribing={isSubscribing}
  />
);
const MeditationsScreen = (navigation) => (
  <Meditations navigation={navigation} />
);
const UserScreen = () => <User />;

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

  const {
    isSubscribing,
    isSubscriptionReady,
    subscriptionErrorMessage,
    handleSubscribe,
  } = useInAppPurchases();

  const renderScene = BottomNavigation.SceneMap({
    home: () =>
      HomeScreen(
        navigation,
        isSubscribing,
        isSubscriptionReady,
        subscriptionErrorMessage,
        handleSubscribe,
      ),
    saved: () => MeditationsScreen(navigation),
    user: () => UserScreen(),
  });

  return isLoading ? (
    <Layout>
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

export default withIAPContext(memo(Dashboard));
