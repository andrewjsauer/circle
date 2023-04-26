import styled from "styled-components/native";
import {
  ProgressBar as ProgressBarPaper,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";

export const Layout = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
  padding: 0 18px;
`;

export const QuestionTitle = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const QuestionWrapper = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 70%;
`;

export const ProgressBar = styled(ProgressBarPaper)`
  border-radius: 10px;
  height: 8px;
`;

export const ProgressBarWrapper = styled.View`
  width: 100%;
  margin-top: 16px;
  padding: 0 32px;
`;

export const ProgressText = styled(Text)`
  font-size: 14px;
  text-align: center;
  margin-top: 12px;
`;

export const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 12px;
`;

export const NextButton = styled(Button)`
  width: 100%;
  min-width: 200px;
  padding: 4px 0;
`;

export const PreviousButton = styled(Button)`
  width: 100%;
  min-width: 100px;
  padding: 4px 0;
`;

export const TextInputField = styled(TextInput)`
  width: 100%;
  margin-top: 20px;
  height: 100px;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
`;

export const CompleteTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const CompleteSubTitle = styled(Text)`
  font-size: 18px;
  text-align: center;
  margin-top: 12px;
`;

export const ErrorButton = styled(Button)`
  width: 100%;
  min-width: 200px;
  margin-top: 60px;
  margin-bottom: 12px;
  padding: 4px 0;
`;

export const BreathingCircleView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;
