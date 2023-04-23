import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import backgroundImage from "@assets/background.png";
import { selectUserId, selectUserData } from "@store/user/selectors";

import Button from "@components/button";

import {
  Container,
  Layout,
  TitleSection,
  UserOptionSection,
  LogoutSection,
  Subtitle,
  Title,
} from "./styles";

const User = () => {
  const userId: string = useSelector(selectUserId);
  const userData = useSelector(selectUserData);

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
    <Layout source={backgroundImage}>
      <Container>
        <TitleSection>
          <Title>Account Settings</Title>
        </TitleSection>
        <UserOptionSection>
          <Subtitle>Preferred audio preference</Subtitle>
          <RadioButton.Group
            onValueChange={handleVoicePreferenceChange}
            value={userData?.voice || "female"}
          >
            <RadioButton.Item label="Female" value="female" />
            <RadioButton.Item label="Male" value="male" />
          </RadioButton.Group>
        </UserOptionSection>
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
