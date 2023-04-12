import React, { memo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

const CloseButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name="close" size={28} color="#000" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 14 + getStatusBarHeight(),
    right: 20,
    zIndex: 2,
    padding: 6,
  },
});

export default memo(CloseButton);
