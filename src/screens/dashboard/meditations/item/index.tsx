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

const getType = (item: any) => {
  let title = "";
  let description = "";

  const createdAt = convertTimestamp(item.createdAt);

  switch (item.type) {
    case "micro":
      title = `Micro ${item.title}`;
      description = `Created on ${createdAt}`;
      break;
    case "course":
      title = `${item.title} Course • ${item.lessonTitle}`;
      description = `Created on ${createdAt}`;
      break;
    case "personalized":
      title = `${item.title}`;
      description = `Created on ${createdAt}`;
      break;
    default:
      break;
  }

  return {
    title,
    description,
  };
};

const Item = ({ item, onPlay }: any) => {
  const { title, description } = getType(item);
  return (
    <Wrapper onPress={() => onPlay(item.audioId)}>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
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
