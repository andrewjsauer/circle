import styled from "styled-components/native";
import { Text } from "react-native-paper";
import Button from "@components/button";

export const Description = styled(Text)`
  font-size: 16px;
  color: #f2f2f2;
  margin-top: 6px;
`;

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: 600;
  color: #fff;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 12px;
  border-radius: 14px;
  background-color: #fff;
  padding: 2px 0;
  width: 300px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 14px;
  right: 20px;
  z-index: 2;
  padding: 6px;
`;
