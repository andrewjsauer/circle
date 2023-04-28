import React, { memo, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserData, selectSubscriptions } from "@store/user/selectors";

import * as routes from "@constants/routes";
import {
  microHits,
  coursesPt1,
  coursesPt2,
  coursesPt3,
  personalizedMeditation,
} from "@constants/meditations";
import { getTimeOfDay } from "@utils";

import TrialModal from "./trial-modal";
import TrialLock from "./trial-lock";
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
  TrialWrapper,
  TrialText,
  TrialTitle,
  TrialButton,
} from "./styles";

const Home = ({ navigation }: any) => {
  const [shouldShowSubscriptionModal, setShouldShowSubscriptionModal] =
    useState(false);

  const userData = useSelector(selectUserData);
  const userSubscriptions = useSelector(selectSubscriptions);

  const timeOfDay = getTimeOfDay();
  const name = userData?.name ? `${userData?.name}` : "Hello!";

  const handleGetStarted = (meditation, isSessionsExpired) => {
    if (isSessionsExpired && !isSubscribed) {
      return setShouldShowSubscriptionModal(true);
    }

    if (meditation.type === "course") {
      return navigation.navigate(routes.COURSES_SCREEN, { meditation, name });
    }

    navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, { meditation, name });
  };

  const { isSubscribed, personalized, micro, course }: any = userSubscriptions;
  return (
    <>
      <TrialModal
        isVisible={shouldShowSubscriptionModal}
        onClose={() => setShouldShowSubscriptionModal(false)}
        onSubscribe={() => {
          setShouldShowSubscriptionModal(false);
          navigation.navigate(routes);
        }}
      />
      <Layout>
        <Container>
          <Header>
            <TypeOfDayText>Good {timeOfDay}</TypeOfDayText>
            <NameText>{name}</NameText>
          </Header>
          {!isSubscribed ? (
            <TrialWrapper>
              <TrialTitle>Upgrade to Circle Plus</TrialTitle>
              <TrialText>
                Get unlimited access to personalized meditations, micro hits,
                and courses.
              </TrialText>
              <TrialButton>Go Plus</TrialButton>
            </TrialWrapper>
          ) : null}
          <Section>
            {!isSubscribed ? (
              <TrialLock
                title="Personalized Meditation"
                numOfSessionsLeft={personalized}
                text={`${personalized} left`}
              />
            ) : (
              <SectionTitle>Personalized Meditation</SectionTitle>
            )}
            <Card
              onPress={() =>
                handleGetStarted(personalizedMeditation, personalized === 0)
              }
              title="Your Tailored Meditation Journey"
              description="This personalized meditation is based upon 5 questions that will shape the direction and unlock a unique, personal journey tailored to your needs and preferences."
              image={require("@assets/meditation-1.png")}
              time="Begin"
              isSubscribed={isSubscribed}
              numOfSessionsLeft={personalized}
            />
          </Section>
          <Section>
            {!isSubscribed ? (
              <TrialLock
                title="Micro Hits"
                numOfSessionsLeft={micro}
                text={`${micro} left`}
              />
            ) : (
              <SectionTitle>Micro Hits</SectionTitle>
            )}
            <CardsWrapper horizontal>
              {microHits.map((option) => (
                <CardWrapper key={option.id}>
                  <CardCompact
                    title={option.title}
                    color={option.color}
                    description={option.description}
                    onPress={() => handleGetStarted(option, micro === 0)}
                    isSubscribed={isSubscribed}
                    numOfSessionsLeft={micro}
                  />
                </CardWrapper>
              ))}
            </CardsWrapper>
          </Section>
          <Section>
            {!isSubscribed ? (
              <TrialLock
                title="Courses"
                numOfSessionsLeft={course}
                text={`${course} left`}
              />
            ) : (
              <SectionTitle>Courses</SectionTitle>
            )}
            <CardsWrapper horizontal>
              {coursesPt1.map((option) => (
                <CardWrapper key={option.id}>
                  <CardCourse
                    title={option.title}
                    color={option.color}
                    description={option.description}
                    onPress={() => handleGetStarted(option, course === 0)}
                    time={option.time}
                    isSubscribed={isSubscribed}
                    numOfSessionsLeft={course}
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
                    onPress={() => handleGetStarted(option, course === 0)}
                    time={option.time}
                    isSubscribed={isSubscribed}
                    numOfSessionsLeft={course}
                  />
                </CardWrapper>
              ))}
            </CardsWrapper>
            <CardsWrapper horizontal>
              {coursesPt3.map((option) => (
                <CardWrapper key={option.id}>
                  <CardCourse
                    title={option.title}
                    color={option.color}
                    description={option.description}
                    onPress={() => handleGetStarted(option, course === 0)}
                    time={option.time}
                    isSubscribed={isSubscribed}
                    numOfSessionsLeft={course}
                  />
                </CardWrapper>
              ))}
            </CardsWrapper>
          </Section>
        </Container>
      </Layout>
    </>
  );
};

export default memo(Home);
