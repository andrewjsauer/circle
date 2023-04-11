import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";
import Button from "@components/button";

export const Layout = styled.ImageBackground`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
`;

export const Subtitle = styled(Text)``;

export const ErrorButton = styled(Button)`
  margin-top: 24px;
`;
