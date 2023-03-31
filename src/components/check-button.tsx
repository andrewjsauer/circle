import React, { memo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import CheckIcon from "react-native-vector-icons/Ionicons";

type Props = {
  onPress: () => void;
};

const CheckButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <CheckIcon style={styles.image} size={24} name="ios-checkmark" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 14 + getStatusBarHeight(),
    right: 14,
    zIndex: 2,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(CheckButton);
