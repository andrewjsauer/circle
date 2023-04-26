import styled from "styled-components/native";
import { Text, ActivityIndicator } from "react-native-paper";

export const Layout = styled.ImageBackground`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const LoadingLayout = styled.ImageBackground`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
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

export const CompleteText = styled(Text)`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  padding: 0 24px;
  color: #000;
`;

export const CompleteTitle = styled(Text)`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 14px;
  color: #3378bd;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  height: 100px;
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
