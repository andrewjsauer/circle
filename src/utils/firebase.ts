import "@react-native-firebase/app";
import { firebase } from "@react-native-firebase/app-check";

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
    debugToken: "E135E255-B6BD-4C8D-966E-1EF6450665D1",
  },
});

firebase.appCheck().initializeAppCheck({
  provider: rnfbProvider,
  isTokenAutoRefreshEnabled: true,
});
