import styled from "styled-components/native";
import { Text } from "react-native-paper";

export const Layout = styled.SafeAreaView`
  height: 100%;
  position: relative;
`;

export const Container = styled.ScrollView`
  display: flex;
  height: 100%;
`;

export const Header = styled.View`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const TypeOfDayText = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const NameText = styled(Text)`
  font-size: 32px;
  font-weight: 600;
  margin-top: 4px;
`;

export const Section = styled.View`
  padding: 20px;
`;

export const SectionTitle = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;

export const CardsWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
`;

export const CardWrapper = styled.View`
  margin-right: 12px;
`;
