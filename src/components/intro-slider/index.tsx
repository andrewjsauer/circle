import React, { useEffect, useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { TextWrapper, Description, Title, SliderView, Image } from "./styles";

const getSlides = (t) => [
  {
    key: 1,
    title: t("slider.one.title"),
    description: t("slider.one.description"),
    image: require("../../assets/slider-1.png"),
  },
  {
    key: 2,
    title: t("slider.two.title"),
    description: t("slider.two.description"),
    image: require("../../assets/slider-2.png"),
  },
  {
    key: 3,
    title: t("slider.three.title"),
    description: t("slider.three.description"),
    image: require("../../assets/slider-3.png"),
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
      <SliderView>
        <Image resizeMode="contain" source={item.image} />
        <TextWrapper>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </TextWrapper>
      </SliderView>
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

export default IntroSlider;
