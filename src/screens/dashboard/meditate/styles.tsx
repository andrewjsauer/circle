import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";

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

export const Title = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 70px;
`;

export const Subtitle = styled(Text)``;
