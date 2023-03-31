import React, { memo } from "react";
import { StyleSheet } from "react-native";

import PhoneInput from "react-native-phone-number-input";
import { HelperText } from "react-native-paper";

import { theme } from "@utils";

type Props = {
  onChange: (object) => void;
  value?: string;
  error?: string;
  phoneRef?: PhoneInput | undefined;
};

const PhoneInputContainer = ({ onChange, value, error, phoneRef }: Props) => (
  <>
    <PhoneInput
      ref={phoneRef}
      defaultValue={value}
      defaultCode="US"
      layout="second"
      onChangeFormattedText={(text) => onChange({ value: text, error: "" })}
      autoFocus
      containerStyle={styles.phoneInput}
      textInputStyle={styles.textInputStyle}
      flagButtonStyle={styles.flagButtonStyle}
      countryPickerButtonStyle={styles.flagButtonStyle}
      textContainerStyle={styles.flagButtonStyle}
    />
    <HelperText type="error" visible={!!error}>
      {error}
    </HelperText>
  </>
);

const styles = StyleSheet.create({
  phoneInput: {
    backgroundColor: theme.colors.surface,
    width: "100%",
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#fff",
  },
  flagButtonStyle: {
    backgroundColor: theme.colors.surface,
  },
  textInputStyle: {
    backgroundColor: theme.colors.surface,
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default memo(PhoneInputContainer);
