import styled from "styled-components/native";
import { Text } from "react-native-paper";

export const Layout = styled.SafeAreaView`
  height: 100%;
  background-color: #fff;
`;

export const Content = styled.View`
  padding: 20px;
  height: 100%;
  margin-top: 38px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

export const LessonList = styled.ScrollView`
  margin-top: 20px;
`;

export const CardWrapper = styled.View`
  margin-bottom: 12px;
`;
