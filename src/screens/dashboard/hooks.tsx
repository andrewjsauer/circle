import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import firestore from "@react-native-firebase/firestore";

import { selectFirebaseUser } from "@store/user/selectors";
import { updateUserData } from "@store/user/slice";

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectFirebaseUser);

  useEffect(() => {
    setIsLoading(true);

    const userRef = firestore().collection("users").doc(user.uid);

    const unsubscribe = userRef.onSnapshot(
      (doc) => {
        console.log("doc", doc.data());

        if (doc.exists) {
          dispatch(updateUserData(doc.data()));
        }

        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return isLoading;
};
