import styled from "styled-components/native";
import { Text } from "react-native-paper";

export const Layout = styled.ImageBackground`
  height: 100%;
  padding: 0 20px;
`;

export const Container = styled.SafeAreaView`
  display: flex;
  height: 100%;
`;

export const TitleSection = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  justify-content: flex-start;
`;

export const UserOptionSection = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

export const LogoutSection = styled.View`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
`;

export const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
`;

export const Subtitle = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 14px;
`;
