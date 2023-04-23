import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectUserData } from "@store/user/selectors";

import * as routes from "@constants/routes";
import { microHits } from "@constants/meditations";
import { getTimeOfDay } from "@utils";

import Card from "./card";
import CardCompact from "./card-compact";
import {
  CardsWrapper,
  Container,
  Layout,
  TypeOfDayText,
  Header,
  NameText,
  Section,
  SectionTitle,
  CardWrapper,
} from "./styles";

const Home = ({ navigation }: any) => {
  const { t } = useTranslation();
  const userData = useSelector(selectUserData);

  const handleGetStarted = (meditationType) => {
    navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, { meditationType });
  };

  const timeOfDay = getTimeOfDay();
  const name = userData?.name ? `${userData?.name}` : "Hello!";
  return (
    <Layout>
      <Container>
        <Header>
          <TypeOfDayText>Good {timeOfDay}</TypeOfDayText>
          <NameText>{name}</NameText>
        </Header>
        <Section>
          <Card
            onPress={() => handleGetStarted({ id: "personalized" })}
            title="Your guided personalized meditation"
            description="Answer a few questions about your goals, preferences, and current situation"
            image={require("@assets/meditation-1.png")}
            time="Begin"
          />
        </Section>
        <Section>
          <SectionTitle>Micro Hits</SectionTitle>
          <CardsWrapper horizontal>
            {microHits.map((option) => (
              <CardWrapper key={option.id}>
                <CardCompact
                  title={option.title}
                  color={option.color}
                  description={option.description}
                  onPress={() => handleGetStarted(option)}
                />
              </CardWrapper>
            ))}
          </CardsWrapper>
        </Section>
        <Section>
          <SectionTitle>Pre-Recorded Meditations</SectionTitle>
          <CardsWrapper horizontal>
            {microHits.map((option) => (
              <CardWrapper key={option.id}>
                <CardCompact
                  title={option.title}
                  color={option.color}
                  time="5 minutes"
                  onPress={() => handleGetStarted(option)}
                />
              </CardWrapper>
            ))}
          </CardsWrapper>
        </Section>
      </Container>
    </Layout>
  );
};

export default memo(Home);
