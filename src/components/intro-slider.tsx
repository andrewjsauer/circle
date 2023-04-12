import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { IS_IOS } from "@utils";

const getSlides = (t) => [
  {
    key: 1,
    text: t("slider.one"),
    image: require("../assets/logo.png"),
  },
  {
    key: 2,
    text: t("slider.two"),
    image: require("../assets/logo.png"),
  },
  {
    key: 3,
    text: t("slider.three"),
    image: require("../assets/logo.png"),
  },
];

type Slide = {
  key: string;
  text: string;
  image: string;
};

const IntroSlider = () => {
  const { t } = useTranslation();

  const timeout = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderRef = useRef<any>(null);

  let sliderIndex = 0;
  const theme = useTheme();

  const tick = () => {
    sliderRef.current.goToSlide(sliderIndex);

    if (sliderIndex === 2) sliderIndex = 0;
    else sliderIndex += 1;
  };

  useEffect(() => {
    timeout.current = setInterval(() => tick(), 2500);
    return () => timeout.current && clearInterval(timeout.current);
  }, []);

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text variant="headlineSmall" style={styles.text}>
          {item.text}
        </Text>
      </View>
    );
  };

  const slides = getSlides(t);
  return (
    <AppIntroSlider
      activeDotStyle={{ backgroundColor: theme.colors.primary }}
      data={slides}
      ref={sliderRef}
      renderItem={renderItem}
      showDoneButton={false}
      showNextButton={false}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 32,
  },
  text: {
    textAlign: "center",
    fontWeight: IS_IOS ? "600" : "bold",
  },
});
export default IntroSlider;
