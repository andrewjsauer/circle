import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import auth from "@react-native-firebase/auth";

import { IS_IOS } from "@utils";

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

  function onAuthStateChanged(user) {
    dispatch(login(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
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
