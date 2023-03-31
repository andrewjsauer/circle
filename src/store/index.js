import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createLogger } from "redux-logger";

import reducer from "./rootReducer";

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}

const config = {
  key: "root",
  storage: AsyncStorage,
  timeout: undefined,
  whitelist: ["user"],
};

const persistedAppReducer = persistCombineReducers(config, reducer);

const store = configureStore({
  reducer: persistedAppReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

const persist = persistStore(store, null);
export { store, persist };
