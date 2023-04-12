import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

import TrackPlayer, { State } from "react-native-track-player";

import * as routes from "@constants/routes";

import CloseButton from "@components/close-button";
import backgroundImage from "@assets/background.png";
import Icon from "react-native-vector-icons/Feather";
import Button from "@components/button";
import { Navigation } from "@types";

import { selectUserId } from "@store/user/selectors";

import {
  AudioView,
  AudioTime,
  ButtonWrapper,
  CompleteText,
  CompleteTitle,
  LoadingLayout,
  LoadingSpinner,
  Layout,
} from "./styles";
import AudioButton from "./audio-button";
import { usePlayer } from "./hooks";
import { onMeditationSave, onMeditationDelete } from "./utils";

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

type Props = {
  navigation: Navigation;
  route: {
    params: {
      meditationId: string;
      data?: any;
      isSavedMeditation: boolean;
    };
  };
};

const PlayerScreen = ({ navigation, route }: Props) => {
  const { meditationId, isSavedMeditation } = route.params;

  const [showEndScreen, setShowEndScreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

  const userId: string = useSelector(selectUserId);

  const handleClose = () => {
    TrackPlayer.reset();

    if (isSavedMeditation) {
      navigation.navigate(routes.DASHBOARD_SCREEN);
    } else {
      setShowEndScreen(true);
    }
  };

  const { playbackState, isPlayerReady, isLoading, duration, position } =
    usePlayer(meditationId, handleClose);

  useEffect(() => {
    if (isPlayerReady) {
      const play = async () => {
        await TrackPlayer.play();
      };

      play();
    }
  }, [isPlayerReady]);

  useEffect(() => {
    if (duration) {
      const durationInMinutes = Math.floor(duration / 60);
      setTotalDuration(durationInMinutes);
    }
  }, [duration]);

  const handlePlayPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    const isMeditationSaved = !route.params?.data ?? false;
    const meditationData = !isMeditationSaved ? route.params.data : null;

    try {
      await onMeditationSave(
        meditationId,
        meditationData,
        userId,
        totalDuration,
      );
    } catch (error) {
      console.error("Error saving meditation:", error);
    }

    navigation.navigate(routes.DASHBOARD_SCREEN);
    setIsSaving(false);
  };

  const handleNoThanks = async () => {
    try {
      await onMeditationDelete(meditationId);
    } catch (error) {
      console.error("Error deleting meditation:", error);
    }

    navigation.navigate(routes.DASHBOARD_SCREEN);
  };

  if (showEndScreen) {
    return (
      <LoadingLayout source={backgroundImage}>
        <CompleteTitle>Finished!</CompleteTitle>
        <CompleteText>
          Would you like to save this meditation to listen to later?
        </CompleteText>
        <ButtonWrapper>
          <Button
            loading={isSaving}
            disabled={isSaving}
            onPress={handleSave}
            mode="contained"
          >
            Save
          </Button>
          <Button disabled={isSaving} onPress={handleNoThanks}>
            No thanks
          </Button>
        </ButtonWrapper>
      </LoadingLayout>
    );
  }

  if (isLoading || !duration || !isPlayerReady) {
    return (
      <LoadingLayout source={backgroundImage}>
        <LoadingSpinner size={50} />
        <Text variant="titleMedium">Loading meditation...</Text>
      </LoadingLayout>
    );
  }

  const timeLeft = duration - position;
  return (
    <>
      <CloseButton onPress={handleClose} />
      <Layout source={backgroundImage}>
        <AudioView>
          <Icon name="clock" size={34} color="#000" />
          <AudioTime>{formatDuration(timeLeft)}</AudioTime>
        </AudioView>
        <AudioButton
          isPlaying={playbackState === State.Playing}
          onPress={handlePlayPause}
        />
      </Layout>
    </>
  );
};

export default PlayerScreen;
