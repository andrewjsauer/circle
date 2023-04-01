import { createSlice } from "@reduxjs/toolkit";

const INITIAL = {
  firebaseUser: null,
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
  },
});

export const { updateUserData, login, logout } = userSlice.actions;

export default userSlice.reducer;
