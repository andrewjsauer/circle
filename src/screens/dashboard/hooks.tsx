import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";

import { selectFirebaseUser } from "@store/user/selectors";
import { updateUserData, updateSubscriptions } from "@store/user/slice";

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectFirebaseUser);

  useEffect(() => {
    setIsLoading(true);

    const subscriptionsRef = firestore()
      .collection("subscriptions")
      .doc(user.uid);
    const userRef = firestore().collection("users").doc(user.uid);

    const unsubscribeSubscriptions = subscriptionsRef.onSnapshot(
      (doc) => {
        if (doc.exists) dispatch(updateSubscriptions(doc.data()));
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
        crashlytics().recordError(error);
      },
    );

    const unsubscribeUser = userRef.onSnapshot(
      (doc) => {
        if (doc.exists) dispatch(updateUserData(doc.data()));
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
        crashlytics().recordError(error);
      },
    );

    return () => {
      unsubscribeUser();
      unsubscribeSubscriptions();
    };
  }, []);

  return isLoading;
};
