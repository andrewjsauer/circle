import "@react-native-firebase/app";
import { firebase } from "@react-native-firebase/app-check";
import firestore from "@react-native-firebase/firestore";

if (__DEV__) {
  firestore().useEmulator("localhost", 8080);
}

const rnfbProvider = firebase
  .appCheck()
  .newReactNativeFirebaseAppCheckProvider();

rnfbProvider.configure({
  android: {
    provider: __DEV__ ? "debug" : "playIntegrity",
    debugToken: "45D613D5-9384-420C-848B-7731C9CE4398",
  },
  apple: {
    provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
    debugToken: "2C95B674-8856-4AB6-A879-CF8A4158B1F7",
  },
});

firebase.appCheck().initializeAppCheck({
  provider: rnfbProvider,
  isTokenAutoRefreshEnabled: true,
});
