import React from "react";
import Icon from "react-native-vector-icons/Entypo";

import { convertTimestamp } from "../utils";
import {
  Content,
  Wrapper,
  Title,
  SubTitle,
  Description,
  PlayButtonWrapper,
  TimeWrapper,
  Time,
} from "./styles";

const getType = (item: any) => {
  let title: any = "";
  let description = "";

  const createdAt = convertTimestamp(item.createdAt);

  switch (item.type) {
    case "micro":
      title = <Title>Micro {item.title}</Title>;
      description = `Created on ${createdAt}`;
      break;
    case "course":
      title = (
        <>
          <Title>{item.lessonTitle}</Title>
          <SubTitle>{item.title} Course</SubTitle>
        </>
      );
      description = `Created on ${createdAt}`;
      break;
    case "personalized":
      title = <Title>{item.title}</Title>;
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
        {title}
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
