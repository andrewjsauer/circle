import { createSelector } from "reselect";

export const selectAppVisibility = (state) => state.app.visibility;

export const selectIsAppVisible = createSelector(
  selectAppVisibility,
  (appVisibility) => appVisibility === "active" || false,
);
