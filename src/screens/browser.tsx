import React from "react";

import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  route: any;
};

const Browser = ({ route }: Props) => (
  <View style={styles.full}>
    <WebView
      source={{
        uri: route.params.url,
      }}
      style={styles.full}
    />
  </View>
);

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

export default Browser;
