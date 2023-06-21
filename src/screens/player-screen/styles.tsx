import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";

export const Layout = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const LoadingLayout = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
`;

export const LoadingText = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  padding: 0 24px;
`;

export const AudioButtonView = styled.View`
  border-radius: 64px;
  background-color: #667380;
  width: 128px;
  height: 128px;
  align-items: center;
  justify-content: center;
`;

export const AudioTime = styled(Text)`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-left: 14px;
`;

export const AudioView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px 38px;
  border-radius: 32px;
  background-color: #b3cce5;
  min-width: 220px;
`;
