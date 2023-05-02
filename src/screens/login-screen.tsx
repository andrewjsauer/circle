import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { trackScreen } from "@utils/analytics";

import {
  selectIsUserLoggedIn,
  selectIsUserAlreadyRegistered,
} from "@store/user/selectors";

import Background from "@components/background";
import Auth from "@components/auth";

import * as routes from "@constants/routes";
import { Navigation } from "@types";

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });

  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isUserAlreadyRegistered = useSelector(selectIsUserAlreadyRegistered);

  useEffect(() => {
    trackScreen(routes.LOGIN_SCREEN);
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (!isUserAlreadyRegistered) {
        navigation.navigate(routes.REGISTER_SCREEN);
      } else navigation.navigate(routes.DASHBOARD_SCREEN);
    }
  }, [isUserLoggedIn]);

  return (
    <Background>
      <Auth
        code={code}
        navigation={navigation}
        confirm={confirm}
        isLoading={isLoading}
        onCode={setCode}
        onConfirm={setConfirm}
        onIsLoading={setIsLoading}
        onPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
      />
    </Background>
  );
};

export default memo(LoginScreen);
