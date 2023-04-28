import React from "react";
import Icon from "react-native-vector-icons/Entypo";

import {
  Content,
  Wrapper,
  TextWrapper,
  Title,
  Description,
  PlayButtonWrapper,
  PlayWrapper,
} from "./styles";

const CardCompact = ({ onPress, title, description, color }: any) => {
  return (
    <Wrapper onPress={onPress}>
      <Content>
        <TextWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextWrapper>
        <PlayWrapper>
          <PlayButtonWrapper color={color}>
            <Icon name="controller-play" size={20} color="#fff" />
          </PlayButtonWrapper>
        </PlayWrapper>
      </Content>
    </Wrapper>
  );
};

export default CardCompact;
