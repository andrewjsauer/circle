import styled from "styled-components/native";
import { Text } from "react-native-paper";

import Button from "@components/button";
import { theme } from "@utils";

export const ScrollView = styled.ScrollView``;

export const Layout = styled.View`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin: 60px 0 8px 0;
`;

export const Message = styled(Text)`
  font-size: 16px;
  margin: 2px 0 20px 0;
  color: ${theme.colors.inverseSurface};
`;

export const DetailMessage = styled(Text)`
  font-size: 14px;
  color: ${theme.colors.backdrop};
`;

export const SubmitButton = styled(Button)`
  margin: 28px 0;
`;
