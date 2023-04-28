import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";

import firestore from "@react-native-firebase/firestore";

import { selectUserId, selectIsUserLoggedIn } from "@store/user/selectors";
import * as routes from "@constants/routes";

import MeditationItem from "./item";
import {
  Layout,
  LoadingContainer,
  LoadingSpinner,
  LoadingTitle,
  List,
  Title,
  NoMeditationsText,
} from "./styles";

const Meditations = ({ navigation }) => {
  const userId: string = useSelector(selectUserId);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  const [meditations, setMeditations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection("meditations")
      .where("userId", "==", userId)
      .onSnapshot((querySnapshot) => {
        if (!isUserLoggedIn) return;
        setIsLoading(true);

        const meditationData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data) return;

          const isMeditation = data?.createdAt?.seconds ?? false;
          if (isMeditation) {
            meditationData.push({
              ...data,
              audioId: doc.id,
            });
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

  return (
    <Layout>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner size="large" />
          <LoadingTitle>Loading profile...</LoadingTitle>
        </LoadingContainer>
      ) : (
        <>
          <Title>Your meditations ({meditations.length || 0})</Title>
          {!meditations.length ? (
            <LoadingContainer>
              <NoMeditationsText>
                You do not have any saved meditations yet
              </NoMeditationsText>
            </LoadingContainer>
          ) : (
            <List>
              {meditations.map((meditation) => (
                <MeditationItem
                  key={meditation.id}
                  onPlay={handlePlay}
                  item={meditation}
                />
              ))}
            </List>
          )}
        </>
      )}
    </Layout>
  );
};

export default memo(Meditations);
