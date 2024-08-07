import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TrackPlayer, { State } from "react-native-track-player";

import * as routes from "@constants/routes";

import CloseButton from "@components/close-button";
import Icon from "react-native-vector-icons/Feather";
import { Navigation } from "@types";
import { trackEvent, trackScreen } from "@utils/analytics";

import { selectUserId } from "@store/user/selectors";

import {
  AudioView,
  AudioTime,
  LoadingLayout,
  LoadingSpinner,
  LoadingText,
  Layout,
} from "./styles";
import AudioButton from "./audio-button";
import { usePlayer } from "./hooks";

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
      audioId: string;
      data?: any;
      isSavedMeditation: boolean;
    };
  };
};

const PlayerScreen = ({ navigation, route }: Props) => {
  const { audioId, data, isSavedMeditation } = route.params;

  const [durationInMinutes, setDurationInMinutes] = useState(0);
  const userId: string = useSelector(selectUserId);

  const handleClose = async () => {
    TrackPlayer.reset();

    if (isSavedMeditation) {
      return navigation.navigate(routes.DASHBOARD_SCREEN);
    }

    return navigation.navigate(routes.FEEDBACK_SCREEN, {
      audioId,
      data: { ...data, userId, duration: durationInMinutes },
    });
  };

  useEffect(() => {
    trackScreen(routes.PLAYER_SCREEN);
  }, []);

  const { playbackState, isPlayerReady, isLoading, duration, position } =
    usePlayer(audioId, handleClose);

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
      const minutes = Math.floor(duration / 60);
      setDurationInMinutes(minutes);
    }
  }, [duration]);

  const handlePlayPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
      trackEvent("pause_meditation");
    } else {
      await TrackPlayer.play();
      trackEvent("play_meditation");
    }
  };

  if (isLoading || !duration || !isPlayerReady) {
    return (
      <LoadingLayout>
        <LoadingSpinner size={50} />
        <LoadingText>Loading your personalized meditation...</LoadingText>
      </LoadingLayout>
    );
  }

  const timeLeft = duration - position;
  return (
    <>
      <CloseButton onPress={handleClose} />
      <Layout>
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
