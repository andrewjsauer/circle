import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import crashlytics from "@react-native-firebase/crashlytics";
import auth from "@react-native-firebase/auth";

import { trackEvent } from "@utils/analytics";

import { login } from "@store/user/slice";
import { updateAppVisibility } from "@store/app/slice";

import {
  selectIsUserLoggedIn,
  selectIsUserAlreadyRegistered,
} from "@store/user/selectors";

export function useAuthStateListener() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isUserAlreadyRegistered = useSelector(selectIsUserAlreadyRegistered);

  function onAuthStateChanged(user, isRegistered) {
    if (!isRegistered || !user) return;

    user
      .getIdTokenResult()
      .then((token) => {
        const authTime = Date.parse(token.authTime);

        if (authTime < Date.now() - 60 * 60 * 1000) {
          user
            .getIdToken(/* forceRefresh */ true)
            .then(() => {
              // Token has been refreshed
              trackEvent("token_refreshed");
              console.log("token", token);
            })
            .catch((error) => {
              console.log("Error refreshing token", error);
              crashlytics().recordError(error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting token", error);
        crashlytics().recordError(error);
      });

    crashlytics().setUserId(user.uid);
    crashlytics().setAttributes({
      email: user.email,
      name: user.displayName,
    });

    dispatch(login(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onAuthStateChanged(user, isUserAlreadyRegistered),
    );
    return () => subscriber();
  }, []);

  return isUserLoggedIn && isUserAlreadyRegistered;
}

export function useAppStateListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      dispatch(updateAppVisibility(state));
    });
    return () => subscription.remove();
  }, [dispatch]);
}
