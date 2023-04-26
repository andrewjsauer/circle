import React from "react";
import Icon from "react-native-vector-icons/Entypo";

import {
  Content,
  Wrapper,
  Title,
  Description,
  PlayButtonWrapper,
  TimeWrapper,
  Time,
} from "./styles";

const Card = ({ onPress, time, color, title, description }: any) => {
  return (
    <Wrapper onPress={onPress}>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <TimeWrapper>
          <PlayButtonWrapper color={color}>
            <Icon name="controller-play" size={20} color="#fff" />
          </PlayButtonWrapper>
          <Time>{time}</Time>
        </TimeWrapper>
      </Content>
    </Wrapper>
  );
};

export default Card;
