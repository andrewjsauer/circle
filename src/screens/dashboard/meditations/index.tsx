import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { List } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import backgroundImage from "@assets/background.png";
import { selectUserId, selectIsUserLoggedIn } from "@store/user/selectors";
import * as routes from "@constants/routes";

import MeditationItem from "./meditation-item";
import {
  Container,
  Layout,
  LoadingContainer,
  LoadingSpinner,
  LoadingTitle,
  MeditationList,
  Subtitle,
  NoMeditationsText,
} from "./styles";

const Meditations = ({ navigation }) => {
  const userId: string = useSelector(selectUserId);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .doc(userId)
      .collection("meditations")
      .onSnapshot((querySnapshot) => {
        if (!isUserLoggedIn) return;
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

  const handlePlay = (audioId) => {
    navigation.navigate(routes.PLAYER_SCREEN, {
      audioId,
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

  return (
    <Layout source={backgroundImage}>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner size="large" />
          <LoadingTitle>Loading profile...</LoadingTitle>
        </LoadingContainer>
      ) : (
        <Container>
          <Subtitle>Saved meditations ({meditations.length || 0})</Subtitle>
          {!meditations.length ? (
            <LoadingContainer>
              <NoMeditationsText>
                You do not have any saved meditations yet
              </NoMeditationsText>
            </LoadingContainer>
          ) : (
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
          )}
        </Container>
      )}
    </Layout>
  );
};

export default memo(Meditations);
