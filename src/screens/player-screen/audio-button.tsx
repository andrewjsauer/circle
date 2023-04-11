import React from "react";
import { IconButton } from "react-native-paper";

import { AudioButtonView } from "./styles";

const AudioButton = ({ isPlaying, onPress }) => {
  const iconName = isPlaying ? "pause" : "play";
  return (
    <AudioButtonView>
      <IconButton
        iconColor="#fff"
        icon={iconName}
        size={64}
        onPress={onPress}
      />
    </AudioButtonView>
  );
};

export default AudioButton;
