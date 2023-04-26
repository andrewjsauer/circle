import React from "react";
import { HelperText } from "react-native-paper";

import { TextInputField } from "./styles";

const TextInput = ({ placeholder, errorMessage, onChangeText, value }: any) => {
  return (
    <>
      <TextInputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        multiline
        error={!!errorMessage}
        autoFocus
      />
      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage}
      </HelperText>
    </>
  );
};

export default TextInput;
