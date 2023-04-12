import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Entypo";

import backgroundImage from "@assets/background.png";
import * as routes from "@constants/routes";
import { homeScreenOptions } from "@constants/meditations";

import {
  Card,
  Title,
  CardWrapper,
  CardContainer,
  Container,
  Layout,
  CardText,
  CardTouchable,
  IconView,
} from "./styles";

const Meditate = ({ navigation }: any) => {
  const { t } = useTranslation();

  const handleGetStarted = (meditationType) => {
    navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, { meditationType });
  };

  return (
    <Layout source={backgroundImage}>
      <Container>
        <Title>{t("introTitle")}</Title>
        <CardWrapper>
          <CardContainer>
            {homeScreenOptions.map((type) => (
              <CardTouchable key={type.id}>
                <Card onPress={() => handleGetStarted(type)} color={type.color}>
                  <>
                    <CardText variant="titleMedium">{type.value}</CardText>
                    {type.id === "custom" && (
                      <IconView>
                        <Icon name="plus" size={34} color="#fff" />
                      </IconView>
                    )}
                  </>
                </Card>
              </CardTouchable>
            ))}
          </CardContainer>
        </CardWrapper>
      </Container>
    </Layout>
  );
};

export default memo(Meditate);
