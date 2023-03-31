import React from "react";
import { StyleSheet, Button, Platform, View } from "react-native";
import { Subtract } from "utility-types";
import StorybookUIRoot from "../../../.storybook/storybook";

export interface WithStorybookUIProps {
  showStorybookUI: boolean;
  setShowStorybookUI: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function withStorybookUI<T extends WithStorybookUIProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  const EnhancedComponent = (props: Subtract<T, WithStorybookUIProps>) => {
    const [showStorybookUI, setShowStorybookUI] =
      React.useState<boolean>(false);

    const injectedProps: WithStorybookUIProps = {
      setShowStorybookUI,
      showStorybookUI,
    };

    return (
      <View style={styles.flex}>
        {showStorybookUI ? (
          <StorybookUIRoot />
        ) : (
          <WrappedComponent {...injectedProps} {...(props as T)} />
        )}

        {__DEV__ && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => setShowStorybookUI((prev) => !prev)}
              title="Toggle storybook"
            />
          </View>
        )}
      </View>
    );
  };

  return EnhancedComponent;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: Platform.select({
      android: 0,
      ios: 15,
    }),
  },
});
