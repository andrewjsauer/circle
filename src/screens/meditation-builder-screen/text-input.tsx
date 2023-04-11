import React from "react";
import { HelperText } from "react-native-paper";

import { QuestionTitle, TextInputField } from "./styles";

const TextInput = ({
  placeholder,
  errorMessage,
  onChangeText,
  title,
  value,
  color,
}) => {
  return (
    <>
      <QuestionTitle>{title}</QuestionTitle>
      <TextInputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        outlineColor={color}
        activeOutlineColor={color}
        multiline
        error={!!errorMessage}
        numberOfLines={4}
        autoFocus
      />

      <HelperText type="error" visible={!!errorMessage}>
        {errorMessage}
      </HelperText>
    </>
  );
};

export default TextInput;
