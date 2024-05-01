import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface User {
    username: string,
    email: string,
    password: string,
    createdAt: string,
    _id: string,
    isArtist: boolean,
    subscribedUsers: string[],
    subscribers: number
}

interface userState {
    users: User[],
    isFetching: boolean,
    error: boolean
}

const initialState: userState = {
    users: [],
    isFetching: false,
    error: false,
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //GET ALL
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //UPDATE
    // updateUserStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // updateUserSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.currentUser = action.payload;
    // },
    // updateUserFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    // // Top Balance
    // topBalanceStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // topBalanceSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.currentUser.balance = action.payload;
    // },
    // topBalanceFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    // //LOGOOUT
    // logOutStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // logOutSuccess: (state) => {
    //   state.isFetching = false;
    //   state.isLoggedIn = false;
    //   state.currentUser = null;
    // },
    // logOutFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   logOutStart,
//   logOutSuccess,
//   logOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
