import React, { memo } from "react";
import { Text } from "react-native-paper";

import { useTranslation } from "react-i18next";

import { Navigation } from "@types";
import * as routes from "@constants/routes";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return <Text>test</Text>;
};

export default memo(Dashboard);
