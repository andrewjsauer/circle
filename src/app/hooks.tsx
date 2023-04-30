import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import crashlytics from "@react-native-firebase/crashlytics";
import auth from "@react-native-firebase/auth";

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
    if (!isRegistered) return;

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
    return subscriber;
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
