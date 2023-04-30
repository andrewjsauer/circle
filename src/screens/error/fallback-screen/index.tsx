import * as React from "react";
import { Button } from "react-native-paper";

import { Layout, Message, Container } from "./styles";

interface Props {
  resetState: () => void;
}

function FallbackScreen({ resetState }: Props) {
  return (
    <Layout>
      <Container>
        <Message>Whoops! Looks like there was an error</Message>
        <Button
          style={{
            backgroundColor: "#6699CC",
            paddingVertical: 8,
            paddingHorizontal: 12,
            color: "#fff",
          }}
          mode="contained"
          onPress={resetState}
        >
          Try again
        </Button>
      </Container>
    </Layout>
  );
}

export default FallbackScreen;
