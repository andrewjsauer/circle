import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";

import { emailValidator, nameValidator } from "@utils";

import { selectUser } from "@store/user/selectors";
import { login } from "@store/user/slice";

import TextInput from "@components/text-input";
import Button from "@components/button";

import { DetailMessage, Title, Layout } from "./styles";
import {
  updateUserEmail,
  checkUsername,
  updateUserProfile,
  addUserProfile,
} from "./utils";

const User = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [displayName, setDisplayName] = useState({ value: "", error: "" });

  const user = useSelector(selectUser);

  const onSendPressed = async () => {
    const nameError = nameValidator(displayName.value);
    const emailError = emailValidator(email.value);

    if (nameError) {
      setDisplayName((prevDisplayName) => ({
        ...prevDisplayName,
        error: nameError,
      }));

      return;
    }

    if (emailError) {
      setEmail((prevEmail) => ({ ...prevEmail, error: emailError }));
      return;
    }

    setIsLoading(true);

    const isUsernameSuccessful = await checkUsername(displayName.value);
    if (!isUsernameSuccessful) {
      setIsLoading(false);

      const error = t("errors.displayNameTaken");
      setDisplayName((prevDisplayName) => ({
        ...prevDisplayName,
        error,
      }));

      return;
    }

    const isEmailSuccessful = await updateUserEmail(user, email.value);
    if (!isEmailSuccessful) {
      setIsLoading(false);

      const error = t("errors.emailAddressServer");
      setEmail((prevEmail) => ({ ...prevEmail, error }));

      return;
    }

    const isProfileSuccessful = await updateUserProfile(
      user,
      displayName.value,
    );
    const isAddProfileSuccessful = addUserProfile(displayName.value);

    if (!isProfileSuccessful || !isAddProfileSuccessful) {
      setIsLoading(false);

      const error = t("errors.displayNameServer");
      setDisplayName((prevDisplayName) => ({
        ...prevDisplayName,
        error,
      }));

      return;
    }

    const updatedUser = auth().currentUser;
    dispatch(login(updatedUser));

    setIsLoading(false);
  };

  return (
    <Layout>
      <View>
        <Title>{t("user.title")}</Title>
        <TextInput
          autoCapitalize="none"
          errorText={displayName.error}
          isError={!!displayName.error}
          label={t("username")}
          onChangeText={(text) => setDisplayName({ value: text, error: "" })}
          returnKeyType="next"
          value={displayName.value}
        />
        <DetailMessage>{t("user.displayNameHelper")}</DetailMessage>
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          errorText={email.error}
          isError={!!email.error}
          keyboardType="email-address"
          label={t("email")}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          returnKeyType="done"
          textContentType="emailAddress"
          value={email.value}
        />
        <DetailMessage>{t("user.emailHelper")}</DetailMessage>
      </View>
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        onPress={onSendPressed}
      >
        {t("submit")}
      </Button>
    </Layout>
  );
};

export default User;
