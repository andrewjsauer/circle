import styled from "styled-components/native";
import { Button, Text } from "react-native-paper";

export const ItemView = styled.View`
  display: flex;
  background-color: #f5f5f5;
  width: 100%;
  padding: 12px 16px;
`;

export const ItemText = styled(Text)`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`;

export const PlayButton = styled(Button)`
  width: 120px;
`;
