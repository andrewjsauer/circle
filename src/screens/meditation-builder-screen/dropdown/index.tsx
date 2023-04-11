import React from "react";
import { View } from "react-native";

import { DropdownPicker } from "./styles";
import { QuestionTitle } from "../styles";

const Dropdown = ({ title, selectedOption, onSelect, options }) => (
  <>
    <QuestionTitle>{title}</QuestionTitle>
    <View>
      <DropdownPicker onValueChange={onSelect} selectedValue={selectedOption}>
        {options.map((option) => (
          <DropdownPicker.Item
            key={option.id}
            label={option.value}
            value={option.id}
          />
        ))}
      </DropdownPicker>
    </View>
  </>
);

export default Dropdown;
