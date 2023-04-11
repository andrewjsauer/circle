import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

import backgroundImage from "@assets/background.png";
import { selectUserId, selectUserData } from "@store/user/selectors";
import * as routes from "@constants/routes";

import Button from "@components/button";

import MeditationItem from "./meditation-item";
import {
  Container,
  Layout,
  LoadingContainer,
  LoadingSpinner,
  LoadingTitle,
  LogoutContainer,
  MeditationList,
  Subtitle,
  Title,
} from "./styles";

const User = ({ navigation }) => {
  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const userId: string = useSelector(selectUserId);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(userId)
      .collection("meditations")
      .onSnapshot((querySnapshot) => {
        setIsLoading(true);

        const meditationData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data) return;

          const isMeditation = data?.createdAt?.seconds ?? false;
          if (isMeditation) {
            meditationData.push(data);
          }
        });

        meditationData.sort(
          (a, b) => b.createdAt.seconds - a.createdAt.seconds,
        );

        setMeditations(meditationData);
        setIsLoading(false);
      });

    return () => subscriber();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error logging out:", JSON.stringify(error));
    }
  };

  const handlePlay = (meditationId) => {
    navigation.navigate(routes.PLAYER_SCREEN, {
      meditationId,
      isSavedMeditation: true,
    });
  };

  const handleDelete = async (meditationId) => {
    setIsDeleting(true);

    try {
      firestore()
        .collection("users")
        .doc(userId)
        .collection("meditations")
        .doc(meditationId)
        .delete();

      firestore().collection("meditations").doc(meditationId).delete();

      storage().ref(`audio/${meditationId}.mp3`).delete();
    } catch (error) {
      console.log("error", error);
    }

    setIsDeleting(false);
  };

  const name = userData?.name ? `, ${userData?.name}` : "!";
  return (
    <Layout source={backgroundImage}>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner size="large" />
          <LoadingTitle>Loading profile...</LoadingTitle>
        </LoadingContainer>
      ) : (
        <Container>
          <Title>Hi{name}</Title>
          <Subtitle>
            {meditations.length === 0
              ? "You do not have any saved meditations yet."
              : `Your saved meditations (${meditations.length})`}
          </Subtitle>
          <MeditationList>
            <List.AccordionGroup>
              {meditations.map((meditation) => (
                <MeditationItem
                  key={meditation.id}
                  onPlay={handlePlay}
                  onDelete={handleDelete}
                  item={meditation}
                  isDeleting={isDeleting}
                />
              ))}
            </List.AccordionGroup>
          </MeditationList>
          <LogoutContainer>
            <Button mode="contained" onPress={handleLogout}>
              Logout
            </Button>
          </LogoutContainer>
        </Container>
      )}
    </Layout>
  );
};

export default memo(User);
