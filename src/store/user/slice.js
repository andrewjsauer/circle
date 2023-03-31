import { createSlice } from "@reduxjs/toolkit";

const INITIAL = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
