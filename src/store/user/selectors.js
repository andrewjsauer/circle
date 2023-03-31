import { createSelector } from "reselect";

export const selectUser = (state) => state.user.userData;

export const selectIsUserLoggedIn = createSelector(
  selectUser,
  (user) => !!user,
);

export const selectIsUserAlreadyRegistered = createSelector(
  selectUser,
  (user) => !!user?.displayName && !!user?.email,
);

export const selectUserId = createSelector(
  selectIsUserLoggedIn,
  selectUser,
  (isUserLoggedIn, user) => isUserLoggedIn && user.uid,
);

export const selectUserDisplayName = createSelector(
  selectIsUserLoggedIn,
  selectUser,
  (isUserLoggedIn, user) => isUserLoggedIn && user.displayName,
);
