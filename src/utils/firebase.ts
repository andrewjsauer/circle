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
    debugToken: "59A94965-FEBA-4DE1-8FA2-BC0B7D2BC602",
  },
  apple: {
    provider: __DEV__ ? "debug" : "appAttestWithDeviceCheckFallback",
    debugToken: "AC1DF5FA-B531-411B-BA25-4A9F5034D85D",
  },
});

firebase.appCheck().initializeAppCheck({
  provider: rnfbProvider,
  isTokenAutoRefreshEnabled: true,
});
