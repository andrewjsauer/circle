import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import firestore from "@react-native-firebase/firestore";

import { selectFirebaseUser, selectUserData } from "@store/user/selectors";
import { updateUserData } from "@store/user/slice";

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectFirebaseUser);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const getUserData = async () => {
      const userRef = firestore().collection("users").doc(user.uid);
      const doc = await userRef.get();

      if (doc.exists) {
        dispatch(updateUserData(doc.data()));
      }
    };

    if (!userData) {
      setIsLoading(true);
      getUserData();
      setIsLoading(false);
    }
  }, []);

  return isLoading;
};
