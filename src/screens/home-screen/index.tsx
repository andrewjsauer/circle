import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

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

  const handleLoginPress = () => {
    navigation.navigate(routes.LOGIN_SCREEN);
  };

  const handleRegistrationPress = () => {
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
            <ButtonURL url="https://docs.google.com/document/d/1MG1Tm3Ku7cLgS04aqKJZejACQFXWJiIiVuo5wrI5EVU/edit">
              {t("terms.termsOfService")}
            </ButtonURL>
            <Text> {t("and")} </Text>
            <ButtonURL url="https://docs.google.com/document/d/1j-Cn_cMNpm9XSbjS3ieooBsVhZ_yGP9kZMFbztRpQKA/edit">
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
    marginVertical: 30,
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
