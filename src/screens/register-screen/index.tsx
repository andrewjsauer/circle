import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectIsUserAlreadyRegistered,
  selectIsUserLoggedIn,
} from "@store/user/selectors";

import Background from "@components/background";
import Auth from "@components/auth";
import User from "@components/user";

import * as routes from "@constants/routes";
import { Navigation } from "@types";

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserSettings, setIsUserSettings] = useState(false);

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });

  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isUserAlreadyRegistered = useSelector(selectIsUserAlreadyRegistered);

  useEffect(() => {
    if (isUserLoggedIn) {
      if (isUserAlreadyRegistered) {
        navigation.navigate(routes.DASHBOARD_SCREEN);
      } else setIsUserSettings(true);
    }
  }, [isUserLoggedIn, isUserAlreadyRegistered]);

  return (
    <Background>
      {isUserSettings ? (
        <User />
      ) : (
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
      )}
    </Background>
  );
};

export default memo(RegisterScreen);
