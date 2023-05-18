import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-native";

import {
  selectUserData,
  selectNumOfSubscribedSessionsLeft,
  selectIsSubscribed,
} from "@store/user/selectors";

import * as routes from "@constants/routes";
import {
  microHits,
  coursesPt1,
  coursesPt2,
  coursesPt3,
  personalizedMeditation,
} from "@constants/meditations";
import { getTimeOfDay } from "@utils";
import { trackScreen, trackEvent } from "@utils/analytics";

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

const Home = ({
  isSubscribing,
  isSubscriptionReady,
  navigation,
  onSubscribe,
  subscriptionErrorMessage,
}: any) => {
  const [shouldShowSubscriptionModal, setShouldShowSubscriptionModal] =
    useState(false);

  const userData = useSelector(selectUserData);
  const userSubscriptions = useSelector(selectNumOfSubscribedSessionsLeft);
  const isSubscribed = useSelector(selectIsSubscribed);

  const timeOfDay = getTimeOfDay();
  const name = userData?.name ? `${userData?.name}` : "Hello!";

  useEffect(() => {
    if (subscriptionErrorMessage) {
      Alert.alert(
        "Subscription Error",
        `There was an error processing your subscription: ${subscriptionErrorMessage}`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK" },
        ],
      );
    }
  }, [subscriptionErrorMessage]);

  useEffect(() => {
    trackScreen("DashboardScreen");
  }, []);

  const handleGetStarted = async (meditation, isSessionsExpired) => {
    if (isSessionsExpired && !isSubscribed) {
      trackEvent("show_subscription_modal");
      return setShouldShowSubscriptionModal(true);
    }

    if (meditation.type === "course") {
      trackEvent("course_started");
      return navigation.navigate(routes.COURSES_SCREEN, { meditation, name });
    }

    trackEvent("meditation_started");
    navigation.navigate(routes.MEDITATION_BUILDER_SCREEN, { meditation, name });
  };

  const { personalized, micro, course }: any = userSubscriptions;
  return (
    <>
      <TrialModal
        isVisible={shouldShowSubscriptionModal}
        onClose={() => setShouldShowSubscriptionModal(false)}
        onSubscribe={onSubscribe}
        isSubscribing={isSubscribing}
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
              <TrialButton
                disabled={isSubscribing || !isSubscriptionReady}
                loading={isSubscribing}
                onPress={onSubscribe}
              >
                Go Plus for $12.99 / Month
              </TrialButton>
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
