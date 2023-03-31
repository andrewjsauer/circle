import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "@utils";
import { useNavigation } from "@react-navigation/native";

type ButtonURLProps = {
  url: string;
  children: string;
};

const ButtonURL = ({ url, children }: ButtonURLProps) => {
  const navigation = useNavigation();

  const handlePress = () => navigation.navigate("Browser", { url });

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ButtonURL);
