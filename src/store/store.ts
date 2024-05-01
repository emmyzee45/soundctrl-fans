import axios from "../utils/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  fansData: null;
  artistsData: null;
  fandomData: null;
  userDetails: null;
}

interface StoreActions {
  getFans: () => void;
  getArtists: () => void;
  getFandom: () => void;
  updateProfile: (id: string, payload: any) => void;
  getUserDetails: (id: string) => void;
}

type Store = StoreState & StoreActions;

export const useStore = create<Store>()(
  devtools((set) => ({
    fansData: null, //fans initial data
    artistsData: null, // artists initial data
    fandomData: null, //fandom initial data
    userDetails: null, //get user datails

    getFans: async () => {
      //get fans
      const res = await axios.get("/users/fans");
      set((state) => (state.fansData = res?.data));
    },
    getArtists: async () => {
      //get artists
      const res = await axios.get("/users/artist");
      set((state) => (state.fansData = res?.data));
    },
    getFandom: async () => {
      //get fandoms
    },
    updateProfile: async (id: string, payload: any) => {
      //update profile
      const res = await axios.put(`/users/${id}`);
    },
    getUserDetails: async (id: string) => {
      //get User details
      const res = await axios.get(`/users/${id}`);
      set((state) => (state.userDetails = res.data));
    },
  }))
);
