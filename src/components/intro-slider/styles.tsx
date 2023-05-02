import styled from "styled-components/native";
import { Text } from "react-native-paper";

export const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const SliderView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Image = styled.Image`
  flex: 2;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const Description = styled(Text)`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TextWrapper = styled.View`
  flex: 1;
`;
