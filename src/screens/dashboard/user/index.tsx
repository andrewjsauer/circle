import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MD2Colors } from "react-native-paper";

import { selectUserData } from "@store/user/selectors";
import { Navigation } from "@types";
import * as routes from "@constants/routes";

import backgroundImage from "@assets/background.png";

import { LoadingSpinner, Subtitle, Title, Layout } from "./styles";

const User = () => {
  const { t } = useTranslation();

  return (
    <Layout source={backgroundImage}>
      <Title>User</Title>
    </Layout>
  );
};

export default memo(User);
