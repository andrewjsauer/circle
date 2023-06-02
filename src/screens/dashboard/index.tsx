import React, { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

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
  handleSubscribe,
  isSubscribing,
  isSubscriptionReady,
  navigation,
) => (
  <Home
    navigation={navigation}
    onSubscribe={handleSubscribe}
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
    handleSubscribe,
    isSubscribing,
    isSubscriptionReady,
    onSubscriptionErrorMessage,
    subscriptionErrorMessage,
  } = useInAppPurchases();

  useEffect(() => {
    if (subscriptionErrorMessage) {
      Alert.alert(
        "Subscription Error",
        `There was an error processing your subscription: ${subscriptionErrorMessage}`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ],
      );

      onSubscriptionErrorMessage("");
    }
  }, [subscriptionErrorMessage]);

  const renderScene = BottomNavigation.SceneMap({
    home: () =>
      HomeScreen(
        handleSubscribe,
        isSubscribing,
        isSubscriptionReady,
        navigation,
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

export default memo(withIAPContext(Dashboard));
