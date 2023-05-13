import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";

import { PurchaseError, requestSubscription, useIAP } from "react-native-iap";
import RNTestFlight from "react-native-test-flight";

import {
  selectFirebaseUser,
  selectUserId,
  selectSubscriptions,
} from "@store/user/selectors";
import { updateUserData, updateSubscriptions } from "@store/user/slice";

import { trackEvent } from "@utils/analytics";

const SKU = "circle_plus_version_1";

export const useInAppPurchases = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId: string = useSelector(selectUserId);
  const userSubscriptions: any = useSelector(selectSubscriptions);
  const { isSubscribed } = userSubscriptions;

  const {
    connected,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
    getSubscriptions,
    initConnectionError,
    subscriptions,
  } = useIAP();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        await getSubscriptions({ skus: [SKU] });
      } catch (error) {
        crashlytics().recordError(error);
        console.log("Error getting subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, []);

  useEffect(() => {
    if (initConnectionError) {
      console.log("initConnectionError", initConnectionError);
      crashlytics().recordError(initConnectionError);

      setErrorMessage("Error connecting to the store");
    }

    if (currentPurchaseError) {
      console.log("currentPurchaseError", currentPurchaseError);
      crashlytics().recordError(currentPurchaseError);

      setErrorMessage("Error getting your purchase");
    }
  }, [initConnectionError, currentPurchaseError]);

  useEffect(() => {
    const validateReceipt = async (receipt) => {
      try {
        const { data } = await functions().httpsCallable("validateReceipt")({
          isTest: __DEV__ || RNTestFlight.isTestFlight,
          receipt,
          userId,
          isSubscribed,
        });

        console.log("data", data);

        if (data?.error) {
          crashlytics().recordError(new Error(data.error));
          throw new Error(data.error);
        } else {
          await finishTransaction({
            isConsumable: true,
            purchase: currentPurchase,
          });

          setIsSubscribing(false);
          trackEvent("subscription_ended");
        }
      } catch (error: any) {
        if (error instanceof PurchaseError) {
          console.log({ message: `[${error.code}]: ${error.message}`, error });
          crashlytics().recordError(error);
        } else {
          console.log("validateReceipt error", error);
          crashlytics().recordError(error);
        }

        setIsSubscribing(false);
      }
    };

    if (currentPurchase && currentPurchase.transactionReceipt) {
      validateReceipt(currentPurchase.transactionReceipt);
    }
  }, [currentPurchase, finishTransaction]);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    trackEvent("subscription_started");

    const { productId } = subscriptions[0];

    try {
      await requestSubscription({ sku: productId });
    } catch (error) {
      if (error instanceof PurchaseError) {
        crashlytics().recordError(error);
        console.log({
          message: `[${error.code}]: ${error.message}`,
          error,
        });

        setErrorMessage("Error requesting subscription");
      } else {
        console.log("requestSubscription error", error);
        crashlytics().recordError(error);
      }

      setIsSubscribing(false);
    }
  };

  return {
    handleSubscribe,
    isSubscribing,
    isSubscriptionReady: connected && subscriptions.length > 0,
    subscriptionErrorMessage: errorMessage,
  };
};

export const useGetUserData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectFirebaseUser);

  useEffect(() => {
    if (!user.uid) {
      console.log("No user uid");
      return;
    }

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
        console.error("Error subscriptions: ", error);
        setIsLoading(false);
        crashlytics().log(error);
      },
    );

    const unsubscribeUser = userRef.onSnapshot(
      (doc) => {
        if (doc.exists) dispatch(updateUserData(doc.data()));
        setIsLoading(false);
      },
      (error) => {
        console.error("Error user: ", error);
        setIsLoading(false);
        crashlytics().log(error);
      },
    );

    return () => {
      unsubscribeUser();
      unsubscribeSubscriptions();
    };
  }, []);

  return isLoading;
};
