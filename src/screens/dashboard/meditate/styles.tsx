import styled from "styled-components/native";
import { Text, TouchableRipple } from "react-native-paper";

export const Layout = styled.ImageBackground`
  display: flex;
  height: 100%;
  position: relative;
`;

export const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 80px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 0 24px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 6px;
`;

export const CardWrapper = styled.ScrollView`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 80px;
`;

export const CardContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CardTouchable = styled.View`
  flex-basis: 50%;
  flex-grow: 1;
`;

export const Card = styled(TouchableRipple)`
  display: flex;
  border-radius: 30px;
  margin-bottom: 14px;
  margin-right: 14px;
  flex-basis: 50%;
  flex-grow: 1;
  height: 120px;
  color: #fff;
  background-color: ${(p) => p.color};
  position: relative;
`;

export const CardText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  padding: 14px;
  width: 100%;
`;

export const IconView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const Subtitle = styled(Text)``;
