import React from "react";
import Icon from "react-native-vector-icons/Entypo";

import {
  Content,
  Image,
  Wrapper,
  TextWrapper,
  Title,
  Description,
  PlayButtonWrapper,
  TimeWrapper,
  Time,
} from "./styles";

const Card = ({ onPress, time, title, description, color, image }: any) => {
  return (
    <Wrapper onPress={onPress}>
      <Content>
        <TextWrapper>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          <TimeWrapper>
            <PlayButtonWrapper>
              <Icon name="controller-play" size={20} color="#fff" />
            </PlayButtonWrapper>
            <Time>{time}</Time>
          </TimeWrapper>
        </TextWrapper>
        <Image source={image} />
      </Content>
    </Wrapper>
  );
};

export default Card;
