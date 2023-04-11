/* eslint-disable no-await-in-loop */
import { useEffect, useState } from "react";
import storage from "@react-native-firebase/storage";

import TrackPlayer, {
  useProgress,
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";

const setupPlayer = async () => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (error) {
      return (error as Error & { code?: string }).code;
    }
  };

  while ((await setup()) === "android_cannot_setup_player_in_background") {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
};

const SetupService = async () => {
  await setupPlayer();

  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    // This flag is now deprecated. Please use the above to define playback mode.
    // stoppingAppPausesPlayback: true,
    capabilities: [Capability.Play, Capability.Pause],
    compactCapabilities: [Capability.Play, Capability.Pause],
    progressUpdateEventInterval: 2,
  });
};

const useSetupPlayer = (meditationId, meditationUrl) => {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;

    if (meditationUrl) {
      (async () => {
        await SetupService();
        if (unmounted) return;
        setPlayerReady(true);
        if (unmounted) return;

        await TrackPlayer.add({
          id: meditationId,
          url: meditationUrl,
          title: "Meditation",
          artist: "Circle",
        });
      })();
    }

    return () => {
      unmounted = true;
    };
  }, [meditationUrl]);

  return playerReady;
};

export const usePlayer = (meditationId, onClose) => {
  const [isLoading, setIsLoading] = useState(true);
  const [meditationUrl, setMeditationUrl] = useState("");

  const isPlayerReady = useSetupPlayer(meditationId, meditationUrl);

  const playbackState = usePlaybackState();
  const { position, duration } = useProgress();

  useTrackPlayerEvents([Event.PlaybackQueueEnded], (event) => {
    if (event.type === Event.PlaybackQueueEnded) {
      onClose();
    }
  });

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const filePath = `audio/${meditationId}.mp3`;
        const url = await storage().ref(filePath).getDownloadURL();

        setMeditationUrl(url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching audio:", error);
        setIsLoading(false);
      }
    };

    setupAudio();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return { playbackState, isPlayerReady, isLoading, duration, position };
};
