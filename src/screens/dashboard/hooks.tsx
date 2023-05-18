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
  selectIsSubscribed,
} from "@store/user/selectors";
import { updateUserData, updateSubscriptions } from "@store/user/slice";

import { trackEvent } from "@utils/analytics";

const SKU = "circle_plus_version_1";

export const useInAppPurchases = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId: string = useSelector(selectUserId);
  const isSubscribed: boolean = useSelector(selectIsSubscribed);

  const {
    connected,
    currentPurchase,
    currentPurchaseError,
    finishTransaction,
    getSubscriptions,
    initConnectionError,
    subscriptions,
  } = useIAP();

  const handleError = (
    error,
    context,
    defaultMessage = "An error occurred",
  ) => {
    if (error instanceof PurchaseError) {
      console.log({ message: `[${error.code}]: ${error.message}`, error });
      crashlytics().recordError(error);
      setErrorMessage(`Purchase Error: ${error.message}`);
    } else if (error.message && error.message.includes("Network Error")) {
      console.log(`${context} network error`, error);
      crashlytics().recordError(error);
      setErrorMessage("Network error, please try again later");
    } else {
      console.log(`${context} error`, error);
      crashlytics().recordError(error);
      setErrorMessage(defaultMessage);
    }
  };

  useEffect(() => {
    if (initConnectionError) {
      handleError(
        initConnectionError,
        "initConnection",
        "Error connecting to the store",
      );
    }

    if (currentPurchaseError) {
      handleError(
        currentPurchaseError,
        "currentPurchase",
        "Error getting your purchase",
      );
    }
  }, [initConnectionError, currentPurchaseError]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        await getSubscriptions({ skus: [SKU] });
      } catch (error) {
        handleError(error, "getSubscriptions", "Error getting subscriptions");
      } finally {
        setIsSubscribing(false);
      }
    };

    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const validateReceipt = async (receipt) => {
      try {
        const { data } = await functions().httpsCallable("validateReceipt")({
          isTest: __DEV__ || RNTestFlight.isTestFlight,
          receipt,
          userId,
          isSubscribed,
        });

        if (data?.error) {
          handleError(
            data.error,
            "validateReceipt",
            "Error thrown validating receipt",
          );
        } else {
          await finishTransaction({
            isConsumable: true,
            purchase: currentPurchase,
          });

          setIsSubscribing(false);
          trackEvent("subscription_ended");
        }
      } catch (error: any) {
        handleError(error, "validateReceipt", "Error validating receipt");
      } finally {
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
      handleError(
        error,
        "requestSubscription",
        "Error requesting subscription",
      );
    } finally {
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
