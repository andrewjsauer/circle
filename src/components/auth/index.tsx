import React, { useRef, memo } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import PhoneInput from "react-native-phone-number-input";
import auth from "@react-native-firebase/auth";
import { useTranslation } from "react-i18next";
import { login } from "@store/user/slice";

import * as routes from "@constants/routes";
import { Navigation } from "@types";

import TextInput from "@components/text-input";
import BackButton from "@components/back-button";
import Button from "@components/button";
import PhoneInputComponent from "@components/phone-input";

import { DetailMessage, Message, Title, Layout } from "./styles";

type Props = {
  code: { error: string; value: string };
  confirm: any;
  isLoading: boolean;
  navigation: Navigation;
  onCode: (object) => void;
  onConfirm: (any) => void;
  onIsLoading: (boolean) => void;
  onPhoneNumber: (object) => void;
  phoneNumber: { error: string; value: string };
};

const Auth = ({
  code,
  confirm,
  isLoading,
  navigation,
  onCode,
  onConfirm,
  onIsLoading,
  onPhoneNumber,
  phoneNumber,
}: Props) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const phoneInputRef = useRef<PhoneInput>(null);

  const signInWithPhoneNumber = async (number) => {
    onIsLoading(true);

    const confirmation = await auth().signInWithPhoneNumber(number);

    onIsLoading(false);
    onConfirm(confirmation);
  };

  const confirmCode = async (vcode) => {
    onIsLoading(true);

    try {
      await confirm.confirm(vcode);
    } catch (error) {
      onCode({ ...phoneNumber, error: t("errors.invalidCode") });
    }

    const user = auth().currentUser;
    dispatch(login(user));

    onIsLoading(false);
  };

  const onVerificationCodeSubmit = () => {
    const { value } = code;

    if (!value) {
      onCode({ ...phoneNumber, error: t("errors.verificationCodeEmpty") });
      return;
    }

    confirmCode(value);
  };

  const onPhoneNumberSubmit = () => {
    const { value } = phoneNumber;
    const isValid = phoneInputRef.current?.isValidNumber(value);

    if (!value) {
      onPhoneNumber({ ...phoneNumber, error: t("errors.phoneNumberEmpty") });
      return;
    } else if (!isValid) {
      onPhoneNumber({ ...phoneNumber, error: t("errors.phoneNumberInvalid") });
      return;
    }

    signInWithPhoneNumber(value);
  };

  const confirmationFlow = (
    <Layout>
      <View>
        <Title>{t("auth.verificationCode")}</Title>
        <TextInput
          autoFocus
          error={!!code.error}
          errorText={code.error}
          keyboardType="phone-pad"
          onChangeText={(text) => onCode({ value: text, error: "" })}
          returnKeyType="done"
          value={code.value}
        />
      </View>
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        onPress={onVerificationCodeSubmit}
      >
        {t("submit")}
      </Button>
    </Layout>
  );

  const phoneNumberFlow = (
    <>
      <BackButton goBack={() => navigation.navigate(routes.HOME_SCREEN)} />
      <Layout>
        <View>
          <Title>{t("auth.whatPhoneNumber")}</Title>
          <Message>{t("auth.whatVerificationCode")}</Message>
          <PhoneInputComponent
            error={phoneNumber.error}
            onChange={onPhoneNumber}
            phoneRef={phoneInputRef}
            value={phoneNumber.value}
          />
          <DetailMessage>{t("auth.detailMessage")}</DetailMessage>
        </View>
        <Button
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={onPhoneNumberSubmit}
        >
          {t("submit")}
        </Button>
      </Layout>
    </>
  );

  return !confirm ? phoneNumberFlow : confirmationFlow;
};

export default memo(Auth);
