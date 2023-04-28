import React from "react";
import LockIcon from "react-native-vector-icons/FontAwesome";

import { SectionTitle } from "../styles";
import { Container, Title, TrailView } from "./styles";

const TrialLock = ({ title, text, numOfSessionsLeft }: any) => (
  <Container>
    <SectionTitle>{title}</SectionTitle>
    <TrailView>
      <Title>{text}</Title>
      <LockIcon
        name={numOfSessionsLeft === 0 ? "lock" : "unlock"}
        size={16}
        color="#000"
      />
    </TrailView>
  </Container>
);

export default TrialLock;
