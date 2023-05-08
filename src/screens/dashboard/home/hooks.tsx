/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import crashlytics from "@react-native-firebase/crashlytics";

import { PurchaseError, requestSubscription, useIAP } from "react-native-iap";
import RNTestFlight from "react-native-test-flight";

import functions from "@react-native-firebase/functions";

import { trackEvent } from "@utils/analytics";
import { selectUserId } from "@store/user/selectors";

const SKU = "circle_plus_version_1";

export const useInAppPurchases = (
  isSubscriptionModalOpen,
  onSubscriptionModal,
  isSubscribed,
) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userId: string = useSelector(selectUserId);

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

          if (isSubscriptionModalOpen) onSubscriptionModal(false);
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
