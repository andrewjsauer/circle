import React, { useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

import {
  selectUserId,
  selectFirebaseUser,
  selectUserData,
  selectSubscriptions,
} from "@store/user/selectors";

import Button from "@components/button";

import {
  Container,
  Layout,
  TitleSection,
  Section,
  LogoutSection,
  Subtitle,
  Title,
} from "./styles";

const User = () => {
  const userId: string = useSelector(selectUserId);
  const userData = useSelector(selectUserData);
  const firebaseUserData = useSelector(selectFirebaseUser);
  const subscriptions = useSelector(selectSubscriptions);

  useEffect(() => {
    const logScreen = async () => {
      await analytics().logScreenView({
        screen_name: "UserScreen",
      });
    };

    logScreen();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error logging out:", JSON.stringify(error));
    }
  };

  const handleVoicePreferenceChange = async (value) => {
    try {
      await firestore().collection("users").doc(userId).update({
        voice: value,
      });
    } catch (error) {
      console.log("error", error);
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
          <Subtitle>{userData.name}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Username: </Subtitle>
          <Subtitle>{firebaseUserData.displayName}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Email: </Subtitle>
          <Subtitle>{firebaseUserData.email}</Subtitle>
        </Section>
        <Section isRow>
          <Subtitle isBold>Circle Plus Subscriber: </Subtitle>
          <Subtitle>{subscriptions.isSubscribed ? "Yes" : "No"}</Subtitle>
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
        </LogoutSection>
      </Container>
    </Layout>
  );
};

export default memo(User);
