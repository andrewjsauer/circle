import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@localization/i18n";

import { AppSafeAreaProvider } from "@components/safe-area";
import { MainErrorBoundary } from "@screens/error";

// import withStorybookUI from "./utils/storybook/withStorybook";
import "./utils/ignore-logs";
import "./utils/firebase";

import App from "./app";
import { store, persist } from "./store";

const Main = () => (
  <AppSafeAreaProvider>
    <MainErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </MainErrorBoundary>
  </AppSafeAreaProvider>
);

export default Main;
