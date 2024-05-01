import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ArtistProps } from "@types";
const initialState = {
    artists: [] as ArtistProps[],
    isFetching: false,
    error: false,
}
const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        getArtistsStart: (state) => {
            state.isFetching = true;
        },
        getArtistsSucces: (state, actions: PayloadAction<ArtistProps[]>) => {
            state.artists = actions.payload;
            state.isFetching = false;
            state.error = false;
        },
        getArtistsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getArtistsFailure,
    getArtistsSucces,
    getArtistsStart
} = artistSlice.actions;

export default artistSlice.reducer;