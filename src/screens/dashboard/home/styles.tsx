import styled from "styled-components/native";
import { Text, Button } from "react-native-paper";

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

export const TrialWrapper = styled.View`
  display: flex;
  justify-content: flex-start;
  margin: 0 20px;
  padding: 20px;
  border-radius: 30px;
  background-color: #2c7da0;
`;

export const TrialText = styled(Text)`
  font-size: 14px;
  color: #f2f2f2;
  margin-top: 6px;
`;

export const TrialTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`;

export const TrialButton = styled(Button)`
  margin-top: 12px;
  border-radius: 14px;
  background-color: #fff;
  padding: 2px 0;
`;
