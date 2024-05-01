import { UserProps } from "@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    fans: [] as UserProps[],
    isFetching: false,
    error: false,
}

const fansSlice = createSlice({
    name: "fans",
    initialState,
    reducers: {
        getFansStart: (state) => {
            state.isFetching = true;
        },
        getFansSuccess: (state, actions: PayloadAction<UserProps[]>) => {
            state.fans = actions.payload;
            state.isFetching = false;
            state.error = false;
        },
        getFansFailure: (state) => {
            state.error = true;
            state.isFetching = false;
        }
    }
});

export const {
    getFansFailure,
    getFansStart,
    getFansSuccess
} = fansSlice.actions;

export default fansSlice.reducer;