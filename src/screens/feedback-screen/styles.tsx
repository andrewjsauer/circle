import styled from "styled-components/native";
import { ActivityIndicator, Text, Button, TextInput } from "react-native-paper";

export const Layout = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

export const Container = styled.ScrollView`
  flex: 1;
`;

export const TextInputField = styled(TextInput)`
  width: 100%;
  height: 100px;
`;

export const Section = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 0 20px;
`;

export const SectionTitle = styled(Text)`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
`;

export const Description = styled(Text)`
  font-size: 14px;
  margin-top: 8px;
`;

export const SubmitButton = styled(Button)`
  border-radius: 14px;
  padding: 2px 0;
  width: 100%;
  margin-top: 20px;
`;

export const SkipButton = styled(Button)`
  margin-top: 12px;
  border-radius: 14px;
  padding: 2px 0;
  width: 100%;
`;

export const LoadingSpinner = styled(ActivityIndicator)`
  margin-bottom: 24px;
`;

export const ErrorButton = styled(Button)`
  width: 100%;
  padding: 2px 0;
`;

export const ErrorText = styled(Text)`
  font-size: 18px;
  margin-bottom: 20px;
`;
