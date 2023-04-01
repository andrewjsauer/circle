import React, { useState, memo } from "react";

import { BottomNavigation } from "react-native-paper";
import { Navigation } from "@types";

import Meditate from "./meditate";
import User from "./user";

type Props = {
  navigation: Navigation;
};

const HomeScreen = (navigation) => <Meditate navigation={navigation} />;

const Dashboard = ({ navigation }: Props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Meditate",
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

  const renderScene = BottomNavigation.SceneMap({
    home: () => HomeScreen(navigation),
    user: User,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
};

export default memo(Dashboard);
