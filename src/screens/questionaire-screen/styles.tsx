import styled from "styled-components/native";
import {
  ProgressBar as ProgressBarPaper,
  Button,
  Text,
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
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

export const QuestionWrapper = styled.View`
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
  margin-bottom: 32px;
  padding: 0 16px;
`;

export const ProgressText = styled(Text)`
  font-size: 14px;
  text-align: center;
  margin-top: 12px;
`;

export const NextButton = styled(Button)`
  width: 100%;
  min-width: 250px;
  margin-top: 8px;
  padding: 6px 0;
`;
