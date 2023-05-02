import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { trackScreen, trackEvent } from "@utils/analytics";

import Background from "@components/background";
import Button from "@components/button";
import ButtonURL from "@components/button-url";
import Slider from "@components/intro-slider";

import * as routes from "@constants/routes";
import { Navigation } from "@types";

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    trackScreen(routes.HOME_SCREEN);
  }, []);

  const handleLoginPress = async () => {
    trackEvent("login_button_pressed");
    navigation.navigate(routes.LOGIN_SCREEN);
  };

  const handleRegistrationPress = async () => {
    trackEvent("registration_button_pressed");
    navigation.navigate(routes.REGISTER_SCREEN);
  };

  return (
    <Background>
      <View style={styles.sliders}>
        <Slider />
      </View>
      <View style={styles.actions}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleRegistrationPress}
        >
          {t("getStarted")}
        </Button>
        <Button mode="outlined" onPress={handleLoginPress}>
          {t("logIn")}
        </Button>
        <View style={styles.terms}>
          <Text>{t("terms.line1")}</Text>
          <View style={styles.termButtons}>
            <ButtonURL url="https://docs.google.com/document/d/1aa7YQbnCb1cSFt6vcAurYPqZZ5T-fio8rX0HjqtSLJ8/edit?usp=sharing">
              {t("terms.termsOfService")}
            </ButtonURL>
            <Text> {t("and")} </Text>
            <ButtonURL url="https://docs.google.com/document/d/1-gu2BCXOrRabnHfSorQg46H0Hblt6ZP_aHs4gwfIqXw/edit?usp=sharing">
              {t("terms.privacyPolicy")}
            </ButtonURL>
            <Text>.</Text>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  sliders: {
    flex: 3,
  },
  actions: {
    flex: 1,
  },
  terms: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  termButtons: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
});

export default memo(HomeScreen);
