import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "react-native";

const INITIAL = {
  visibility: AppState.currentState,
};

export const appSlice = createSlice({
  name: "app",
  initialState: INITIAL,
  reducers: {
    updateAppVisibility: (state, action) => {
      state.visibility = action.payload;
    },
  },
});

export const { updateAppVisibility } = appSlice.actions;

export default appSlice.reducer;
