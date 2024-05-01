import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState, UserProps } from "@types";
// import type { PayloadAction } from "@reduxjs/toolkit"
const initialState: userState = {
  currentUser: null,
  isFetching: false,
  authenticated: false,
  error: false,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // GET ALL
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<UserProps>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.authenticated = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSuccess: (state, action: PayloadAction<UserProps>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.authenticated = true;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.authenticated = false;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
