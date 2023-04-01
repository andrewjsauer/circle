import React from "react";
import { View } from "react-native";

import { DropdownPicker } from "./styles";

const Dropdown = ({ selectedOption, onSelect, options }) => (
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
);

export default Dropdown;
