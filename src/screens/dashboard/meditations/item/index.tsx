import React from "react";
import Icon from "react-native-vector-icons/Entypo";

import { convertTimestamp } from "../utils";
import {
  Content,
  Wrapper,
  Title,
  Description,
  PlayButtonWrapper,
  TimeWrapper,
  Time,
} from "./styles";

const getType = (type: string) => {
  let meditationType = "";
  switch (type) {
    case "micro":
      meditationType = "Micro";
      break;
    case "course":
      meditationType = "Course";
      break;
    case "personalized":
      meditationType = "Personalized";
      break;
    default:
      break;
  }

  return meditationType;
};

const Item = ({ item, onPlay }: any) => {
  const createdAt = convertTimestamp(item.createdAt);
  const type = getType(item.type);
  return (
    <Wrapper onPress={() => onPlay(item.id)}>
      <Content>
        <Title>
          {type} {item.title}
        </Title>
        <Description>Created on {createdAt}</Description>
        <TimeWrapper>
          <PlayButtonWrapper color={item.color}>
            <Icon name="controller-play" size={20} color="#fff" />
          </PlayButtonWrapper>
          <Time>{item.duration} minutes</Time>
        </TimeWrapper>
      </Content>
    </Wrapper>
  );
};

export default Item;
