import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform } from "react-native";

import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import functions from "@react-native-firebase/functions";

import {
  PurchaseError,
  requestSubscription,
  useIAP,
  validateReceiptAndroid,
} from "react-native-iap";
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
  }, [initConnectionError]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setIsSubscribing(true);

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

  const unsubscribeUser = async () => {
    try {
      const subscriptionRef = firestore()
        .collection("subscriptions")
        .doc(userId);

      await subscriptionRef.set({ isSubscribed: false }, { merge: true });
      console.log("User unsubscribed");
    } catch (error: any) {
      handleError(error, "unsubscribeUser", "Error unsubscribing user");
    }
  };

  const subscribeUser = async (receipt) => {
    if (!isSubscribed) {
      try {
        const subscriptionRef = firestore()
          .collection("subscriptions")
          .doc(userId);

        await subscriptionRef.set({ isSubscribed: true }, { merge: true });

        const subscriptionCollectionRef = firestore()
          .collection("subscriptions")
          .doc(userId)
          .collection("subscriptions")
          .doc();
        await subscriptionCollectionRef.set(
          { subscriptions: firestore.FieldValue.arrayUnion(receipt) },
          { merge: true },
        );

        console.log("User subscribed");
      } catch (error: any) {
        handleError(error, "subscribeUser", "Error subscribing user");
      }
    } else {
      console.log("User already subscribed");
    }
  };

  useEffect(() => {
    const androidValidateReceipt = async () => {
      try {
        const { data } = await functions().httpsCallable("getAccessToken")();

        const response = await validateReceiptAndroid({
          packageName: currentPurchase.packageNameAndroid,
          productId: currentPurchase.productId,
          productToken: currentPurchase.purchaseToken,
          accessToken: data,
          isSub: true,
        });

        console.log("response", response);

        if (data?.error) {
          handleError(
            data.error,
            "validateReceipt",
            "Error thrown validating receipt",
          );
        } else {
          if (response.status === "canceled" || response.status === "paused") {
            await unsubscribeUser();
          } else if (response.status === "purchased") {
            await subscribeUser(response);
          }

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

    const iOSValidateReceipt = async (receipt) => {
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
      if (Platform.OS === "android") androidValidateReceipt();
      else iOSValidateReceipt(currentPurchase.transactionReceipt);
    }
  }, [currentPurchase, finishTransaction]);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    trackEvent("subscription_started");

    const { productId, subscriptionOfferDetails } = subscriptions[0];
    console.log("subscriptions[0]", subscriptions[0]);

    try {
      const test = await requestSubscription({
        sku: productId,
        ...(subscriptionOfferDetails && {
          subscriptionOffers: [
            {
              sku: productId,
              offerToken: subscriptionOfferDetails[0].offerToken,
            },
          ],
        }),
      });

      console.log("test", test);
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

  console.log("currentPurchase", currentPurchase);
  console.log("subscriptions", JSON.stringify(subscriptions));

  return {
    handleSubscribe,
    isSubscribing,
    isSubscriptionReady: connected && subscriptions.length > 0,
    onSubscriptionErrorMessage: setErrorMessage,
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
