import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const ItemView = styled.View`
  display: flex;
  background-color: #f5f5f5;
  width: 100%;
  padding: 12px 16px;
`;

export const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PlayButton = styled(Button)`
  width: 120px;
`;
