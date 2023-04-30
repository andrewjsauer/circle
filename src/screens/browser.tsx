import React, { useEffect } from "react";
import analytics from "@react-native-firebase/analytics";

import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

import * as routes from "@constants/routes";

type Props = {
  route: any;
};

const Browser = ({ route }: Props) => {
  useEffect(() => {
    const logScreen = async () => {
      await analytics().logScreenView({
        screen_name: routes.BROWSER_SCREEN,
      });
    };

    logScreen();
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
