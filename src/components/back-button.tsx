import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require("../assets/arrow_back.png")} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 14 + getStatusBarHeight(),
    left: 14,
    zIndex: 2,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
