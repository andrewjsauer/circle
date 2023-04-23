import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { IS_IOS } from "@utils";

const getSlides = (t) => [
  {
    key: 1,
    title: t("slider.one.title"),
    description: t("slider.one.description"),
    image: require("../assets/slider-1.png"),
  },
  {
    key: 2,
    title: t("slider.two.title"),
    description: t("slider.two.description"),
    image: require("../assets/slider-2.png"),
  },
  {
    key: 3,
    title: t("slider.three.title"),
    description: t("slider.three.description"),
    image: require("../assets/slider-3.png"),
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
    timeout.current = setInterval(() => tick(), 3000);
    return () => timeout.current && clearInterval(timeout.current);
  }, []);

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text variant="headlineMedium" style={styles.title}>
          {item.title}
        </Text>
        <Text variant="titleMedium" style={styles.description}>
          {item.description}
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
    marginVertical: 32,
  },
  title: {
    textAlign: "center",
    fontWeight: IS_IOS ? "600" : "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 16,
    color: "rgba(0, 0, 0, 0.54)",
  },
});
export default IntroSlider;
