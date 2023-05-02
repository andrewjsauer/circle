import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getAvailablePurchases,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";
import SplashScreen from "react-native-splash-screen";

import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import auth from "@react-native-firebase/auth";

import { login } from "@store/user/slice";
import { updateAppVisibility } from "@store/app/slice";

import {
  selectIsUserLoggedIn,
  selectIsUserAlreadyRegistered,
  selectUserId,
} from "@store/user/selectors";

export const useSetupIAP = async () => {
  const userId: string = useSelector(selectUserId);

  useEffect(() => {
    crashlytics().log("App mounted.");
    let purchaseUpdateSubscription;
    let purchaseErrorSubscription;

    const initIAP = async () => {
      try {
        await initConnection();

        purchaseUpdateSubscription = purchaseUpdatedListener(
          async (purchase) => {
            console.log("purchaseUpdatedListener", purchase);
            const receipt = purchase.transactionReceipt;

            if (receipt) {
              let deliveryResult = null;

              try {
                const { data } = await functions().httpsCallable(
                  "validateReceipt",
                )({
                  receipt: purchase.transactionReceipt,
                  isTest: __DEV__,
                });

                console.log("data", data);

                if (data.error) {
                  crashlytics().recordError(new Error(error));
                  throw new Error(error);
                }

                ({ deliveryResult } = data);
                console.log("deliveryResult", deliveryResult);
              } catch (error: any) {
                console.log("validateReceipt error", error);
                crashlytics().recordError(error);
              }

              if (deliveryResult) {
                try {
                  const subscriptionDocRef = firestore()
                    .collection("subscriptions")
                    .doc(userId);

                  await subscriptionDocRef.set({
                    isSubscribed: true,
                    subscriptions: firestore.FieldValue.arrayUnion({
                      purchase,
                      deliveryResult,
                    }),
                  });
                } catch (error) {
                  console.log("subscriptionDocRef error", error);
                  crashlytics().recordError(error);
                }

                try {
                  await finishTransaction({
                    purchase,
                    isConsumable: false,
                  });
                } catch (error) {
                  console.log("finishTransaction error", error);
                  crashlytics().recordError(error);
                }
              } else {
                console.log("Purchase validation failed");
                crashlytics().log("Purchase validation failed");
              }
            }
          },
        );

        purchaseErrorSubscription = purchaseErrorListener((error) => {
          console.log("purchaseErrorListener", error);
          crashlytics().recordError(new Error(error));
        });

        if (Platform.OS === "android") {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }

        if (Platform.OS === "ios") {
          let purchases: any = [];

          try {
            purchases = await getAvailablePurchases();
          } catch (error) {
            console.log("getAvailablePurchases error", error);
            crashlytics().recordError(error);
          }

          const cancelledPurchases = purchases.filter(
            (purchase) =>
              purchase.transactionReceipt &&
              purchase.transactionReceipt.includes("Cancelled"),
          );

          if (cancelledPurchases.length > 0) {
            const subscriptionDocRef = firestore()
              .collection("subscriptions")
              .doc(userId);

            await subscriptionDocRef.set({
              isSubscribed: false,
            });
          }
        }
      } catch (error) {
        console.log("initConnection error", error);
        crashlytics().recordError(error);
      }
    };

    initIAP();
    SplashScreen.hide();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }

      endConnection();
      crashlytics().log("App unmounted.");
    };
  }, []);
};

export function useAuthStateListener() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const isUserAlreadyRegistered = useSelector(selectIsUserAlreadyRegistered);

  function onAuthStateChanged(user, isRegistered) {
    if (!isRegistered || !user) return;

    crashlytics().setUserId(user.uid);
    crashlytics().setAttributes({
      email: user.email,
      name: user.displayName,
    });

    dispatch(login(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) =>
      onAuthStateChanged(user, isUserAlreadyRegistered),
    );
    return subscriber;
  }, []);

  return isUserLoggedIn && isUserAlreadyRegistered;
}

export function useAppStateListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      dispatch(updateAppVisibility(state));
    });
    return () => subscription.remove();
  }, [dispatch]);
}
