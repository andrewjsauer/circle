import { createSelector } from "reselect";

export const selectFirebaseUser = (state) => state.user.firebaseUser;
export const selectUserData = (state) => state.user.userData;
export const selectIsFetching = (state) => state.user.isFetching;
export const selectSubscriptions = (state) => state.user.subscriptions;

export const selectIsUserLoggedIn = createSelector(
  selectFirebaseUser,
  (user) => !!user,
);

export const selectIsUserAlreadyRegistered = createSelector(
  selectFirebaseUser,
  (user) => !!user?.displayName && !!user?.email,
);

export const selectUserId = createSelector(
  selectIsUserLoggedIn,
  selectFirebaseUser,
  (isUserLoggedIn, user) => (isUserLoggedIn ? user.uid : null),
);

export const selectUserDisplayName = createSelector(
  selectIsUserLoggedIn,
  selectFirebaseUser,
  (isUserLoggedIn, user) => isUserLoggedIn && user.displayName,
);

export const selectIsSubscribed = createSelector(
  selectSubscriptions,
  (subscriptions) => subscriptions?.isSubscribed ?? false,
);

export const selectNumOfSubscribedSessionsLeft = createSelector(
  selectSubscriptions,
  (subscriptions) => ({
    personalized: subscriptions?.personalized ?? 1,
    micro: subscriptions?.micro ?? 1,
    course: subscriptions?.course ?? 1,
  }),
);
