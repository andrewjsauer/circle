import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";

export const MeditationList = styled.ScrollView`
  height: 75%;
  padding: 0 12px;
`;

export const Layout = styled.ImageBackground`
  height: 100%;
`;

export const Container = styled.SafeAreaView`
  display: flex;
  padding: 0 24px;
`;

export const LoadingContainer = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  height: 100%;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
`;

export const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  margin-top: 12px;
  padding: 0 18px;
`;

export const Subtitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  margin: 14px 0;
  padding: 0 18px;
`;

export const LoadingTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const LogoutContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding: 0 18px;
`;
