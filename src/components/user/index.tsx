import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";

import { emailValidator, nameValidator } from "@utils";

import { selectFirebaseUser } from "@store/user/selectors";
import { login, updateUserData } from "@store/user/slice";

import TextInput from "@components/text-input";
import Button from "@components/button";

import { DetailMessage, Title, Layout } from "./styles";
import {
  updateUserEmail,
  checkUsername,
  updateUserProfile,
  addUserProfile,
  updateUser,
} from "./utils";

const User = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState({ value: "", error: "" });
  const [displayName, setDisplayName] = useState({ value: "", error: "" });
  const [firstName, setFirstName] = useState({ value: "", error: "" });

  const user = useSelector(selectFirebaseUser);

  const onSendPressed = async () => {
    const nameError = nameValidator(displayName.value);
    const emailError = emailValidator(email.value);
    const firstNameError = nameValidator(firstName.value);

    if (firstNameError) {
      setFirstName((prevFirstName) => ({
        ...prevFirstName,
        error: firstNameError,
      }));

      return;
    }

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

    const isFirstNameSuccessful = updateUser(user, firstName.value);
    if (!isFirstNameSuccessful) {
      setIsLoading(false);

      const error = t("errors.firstNameServer");
      setFirstName((prevEmail) => ({ ...prevEmail, error }));

      return;
    }

    const userCurrent = auth().currentUser;
    dispatch(login(userCurrent));

    dispatch(
      updateUserData({
        displayName: displayName.value,
        email: email.value,
        firstName: firstName.value,
        id: userCurrent?.uid ?? "",
      }),
    );

    setIsLoading(false);
  };

  return (
    <Layout>
      <View>
        <Title>{t("user.title")}</Title>
        <TextInput
          errorText={firstName.error}
          isError={!!firstName.error}
          label={t("firstName")}
          onChangeText={(text) => setFirstName({ value: text, error: "" })}
          returnKeyType="next"
          value={firstName.value}
        />
        <DetailMessage>{t("user.firstNameHelper")}</DetailMessage>
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
