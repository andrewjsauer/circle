import styled from "styled-components/native";
import { Text } from "react-native-paper";

export const Layout = styled.SafeAreaView`
  height: 100%;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px;
`;

export const TitleSection = styled.View`
  display: flex;
  margin-bottom: 40px;
`;

export const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: ${(p) => (p.isRow ? "row" : "column")};
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
  font-size: 18px;
  font-weight: ${(p) => (p.isBold ? "bold" : "normal")};
  margin-bottom: 14px;
`;

export const TermsText = styled(Text)`
  font-size: 14px;
`;

export const TermButtons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;
