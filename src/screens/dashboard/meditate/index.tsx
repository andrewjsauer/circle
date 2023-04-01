/* eslint-disable react-native/no-inline-styles */
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MD2Colors } from "react-native-paper";

import { selectUserData } from "@store/user/selectors";

import backgroundImage from "@assets/background.png";
import Button from "@components/button";

import * as routes from "@constants/routes";

import { useGetUserData } from "./hooks";
import { LoadingSpinner, Subtitle, Title, Layout } from "./styles";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);

  const isLoading = useGetUserData();

  const handleGetStarted = () => {
    navigation.navigate(routes.QUESTIONAIRE_SCREEN);
  };

  return (
    <Layout source={backgroundImage}>
      {isLoading ? (
        <>
          <LoadingSpinner
            size="large"
            animating={true}
            color={MD2Colors.blue500}
          />
          <Subtitle variant="titleLarge">{t("fetchingYourData")}</Subtitle>
        </>
      ) : (
        <>
          <Subtitle variant="titleMedium">
            Welcome back, {userData?.name}
          </Subtitle>
          <Title>{t("letsGetStarted")}</Title>
          <Button onPress={handleGetStarted} mode="contained">
            {t("getStarted")}
          </Button>
        </>
      )}
    </Layout>
  );
};

export default memo(Home);
