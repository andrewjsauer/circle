import React, { memo } from "react";
import { useSelector } from "react-redux";

import { selectUserData } from "@store/user/selectors";

import * as routes from "@constants/routes";
import {
  microHits,
  coursesPt1,
  coursesPt2,
  personalizedMeditation,
} from "@constants/meditations";
import { getTimeOfDay } from "@utils";

import Card from "./card";
import CardCompact from "./card-compact";
import CardCourse from "./card-course";
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
  const userData = useSelector(selectUserData);

  const timeOfDay = getTimeOfDay();
  const name = userData?.name ? `${userData?.name}` : "Hello!";

  const handleGetStarted = (meditation) => {
    if (meditation.type === "course") {
      return navigation.navigate(routes.COURSES_SCREEN, { meditation, name });
    }

    navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, { meditation, name });
  };

  return (
    <Layout>
      <Container>
        <Header>
          <TypeOfDayText>Good {timeOfDay}</TypeOfDayText>
          <NameText>{name}</NameText>
        </Header>
        <Section>
          <Card
            onPress={() => handleGetStarted(personalizedMeditation)}
            title="Your Tailored Meditation Journey"
            description="Answer a series of questions to shape your meditation's direction and unlock a unique, personal journey tailored to your needs and preferences."
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
          <SectionTitle>Courses</SectionTitle>
          <CardsWrapper horizontal>
            {coursesPt1.map((option) => (
              <CardWrapper key={option.id}>
                <CardCourse
                  title={option.title}
                  color={option.color}
                  description={option.description}
                  onPress={() => handleGetStarted(option)}
                  time={option.time}
                />
              </CardWrapper>
            ))}
          </CardsWrapper>
          <CardsWrapper horizontal>
            {coursesPt2.map((option) => (
              <CardWrapper key={option.id}>
                <CardCourse
                  title={option.title}
                  color={option.color}
                  description={option.description}
                  onPress={() => handleGetStarted(option)}
                  time={option.time}
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
