import React, { useEffect } from "react";

import { trackScreen } from "@utils/analytics";

import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import * as routes from "@constants/routes";

type Props = {
  route: any;
};

const Browser = ({ route }: Props) => {
  useEffect(() => {
    trackScreen(routes.BROWSER_SCREEN);
  }, []);

  return (
    <View style={styles.full}>
      <WebView
        source={{
          uri: route.params.url,
        }}
        style={styles.full}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

export default Browser;
