import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";

import {
  selectUserId,
  selectFirebaseUser,
  selectUserData,
  selectSubscriptions,
} from "@store/user/selectors";
import { logout } from "@store/user/slice";

import Button from "@components/button";
import ButtonURL from "@components/button-url";

import { trackScreen, trackEvent } from "@utils/analytics";

import {
  Container,
  Layout,
  TitleSection,
  Section,
  LogoutSection,
  Subtitle,
  Title,
  TermsText,
  TermButtons,
} from "./styles";

const User = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userId: string = useSelector(selectUserId);
  const userData = useSelector(selectUserData);
  const firebaseUserData = useSelector(selectFirebaseUser);
  const subscriptions = useSelector(selectSubscriptions);

  useEffect(() => {
    trackScreen("UserScreen");
  }, []);

  const handleLogout = async () => {
    trackEvent("logout_clicked");

    try {
      await auth().signOut();
    } catch (error) {
      crashlytics().recordError(error);
      console.error("Error logging out:", JSON.stringify(error));
    }

    dispatch(logout());
  };

  const handleVoicePreferenceChange = async (value) => {
    trackEvent("voice_preference_changed");

    try {
      await firestore().collection("users").doc(userId).update({
        voice: value,
      });
    } catch (error) {
      crashlytics().recordError(error);
      console.log("Change voice preference error", error);
    }
  };

  return (
    <Layout>
      <Container>
        <TitleSection>
          <Title>Account Settings</Title>
        </TitleSection>
        <Section isRow>
          <Subtitle isBold>Name: </Subtitle>
          <Subtitle>{userData?.name}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Username: </Subtitle>
          <Subtitle>{firebaseUserData?.displayName}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Email: </Subtitle>
          <Subtitle>{firebaseUserData?.email}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Membership: </Subtitle>
          <Subtitle>
            {subscriptions.isSubscribed ? "Circle Plus" : "Trial"}
          </Subtitle>
        </Section>
        <Section>
          <Subtitle isBold>Preferred audio voice</Subtitle>
          <RadioButton.Group
            onValueChange={handleVoicePreferenceChange}
            value={userData?.voice || "female"}
          >
            <RadioButton.Item label="Female" value="female" />
            <RadioButton.Item label="Male" value="male" />
          </RadioButton.Group>
        </Section>
        <LogoutSection>
          <Button mode="contained" onPress={handleLogout}>
            Logout
          </Button>
          <TermButtons>
            <ButtonURL url="https://docs.google.com/forms/d/e/1FAIpQLSdGoky30B_kDbtXwEpMChlHZrF9P7w9x6nqUj6jFWFySGYeMQ/viewform?usp=sf_link">
              Delete my account
            </ButtonURL>
          </TermButtons>
          <TermButtons>
            <ButtonURL url="https://docs.google.com/document/d/1aa7YQbnCb1cSFt6vcAurYPqZZ5T-fio8rX0HjqtSLJ8/edit?usp=sharing">
              {t("terms.termsOfService")}
            </ButtonURL>
            <TermsText> {t("and")} </TermsText>
            <ButtonURL url="https://docs.google.com/document/d/1-gu2BCXOrRabnHfSorQg46H0Hblt6ZP_aHs4gwfIqXw/edit?usp=sharing">
              {t("terms.privacyPolicy")}
            </ButtonURL>
            <TermsText>.</TermsText>
          </TermButtons>
        </LogoutSection>
      </Container>
    </Layout>
  );
};

export default memo(User);
