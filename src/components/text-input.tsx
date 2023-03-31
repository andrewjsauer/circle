import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme, IS_IOS } from "@utils";

type Props = React.ComponentProps<typeof Input> & {
  isError?: boolean;
  errorText?: string;
};

const TextInput = ({ isError, errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      outlineColor="#fff"
      activeOutlineColor="#fff"
      {...props}
    />
    {isError ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    padding: 8,
    fontWeight: IS_IOS ? "700" : "bold",
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
