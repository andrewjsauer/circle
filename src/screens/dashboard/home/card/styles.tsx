import styled from "styled-components/native";
import { Text, TouchableRipple } from "react-native-paper";

export const Image = styled.Image`
  aspect-ratio: 1;
  height: 220px;
  width: 220px;
`;

export const ImageWrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled(TouchableRipple)`
  border-radius: 30px;
  background-color: #f1f3f4;
  padding: 20px;
  margin-top: 14px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
`;

export const Title = styled(Text)`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
`;

export const Description = styled(Text)`
  color: #000;
  font-size: 14px;
`;

export const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 160px;
`;

export const PlayButtonWrapper = styled.View`
  background-color: #000;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleIconWrapper = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

export const CircleIcon = styled.View`
  background-color: ${(p) => p.color};
  border-radius: 50px;
  width: 60px;
  height: 60px;
`;

export const TimeWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

export const Time = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
  color: #000;
`;
