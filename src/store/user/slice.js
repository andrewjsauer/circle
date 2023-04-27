import { createSlice } from "@reduxjs/toolkit";

const INITIAL = {
  firebaseUser: null,
  subscriptions: null,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL,
  reducers: {
    login: (state, action) => {
      state.firebaseUser = action.payload;
    },
    logout: (state) => {
      state.firebaseUser = null;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
  },
});

export const { updateUserData, updateSubscriptions, login, logout } =
  userSlice.actions;

export default userSlice.reducer;
