import styled from "styled-components/native";
import { Text, TouchableRipple } from "react-native-paper";

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  flex: 1;
`;

export const Wrapper = styled(TouchableRipple)`
  border-radius: 30px;
  background-color: #f1f3f4;
  padding: 20px;
  min-height: 175px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;
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
  max-width: 180px;
`;

export const PlayButtonWrapper = styled.View`
  background-color: ${(p) => (p.color ? p.color : "#000")};
  border-radius: 50px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: 14px;
`;
