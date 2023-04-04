import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import firestore from "@react-native-firebase/firestore";

import backgroundImage from "@assets/background.png";
import Button from "@components/button";

import { Title, Layout } from "./styles";

const User = () => {
  const { t } = useTranslation();

  const handlePress = async () => {
    console.log("Test");

    // const test = await firestore().collection("test").get();
    // console.log(
    //   "test",
    //   test.docs.map((doc) => doc.data()),
    // );

    firestore()
      .collection("test")
      .add({
        name: "Andrew TEST",
        age: 30,
      })
      .then(() => {
        console.log("User added!");
      })
      .catch((error) => {
        console.log("Error adding user: ", error);
      });
  };

  return (
    <Layout source={backgroundImage}>
      <Title>User</Title>
      <Button onPress={handlePress}>Test</Button>
    </Layout>
  );
};

export default memo(User);
