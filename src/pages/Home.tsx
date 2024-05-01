// @mui
import { styled } from "@mui/material/styles";
// sections
import { HomeHero, Questions, Subscribe, Trending } from "../sections/home";
import { useEffect, useState } from "react";
import { ArtistProps } from "@types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getArtistsSucces, getArtistsStart, getArtistsFailure } from "../redux/redux-slices/ArtistSlice";
import { getFansFailure, getFansStart, getFansSuccess } from "../redux/redux-slices/FansSlice";
import axios from "axios";

// ---------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [filteredArtist, setFilteredArtist] = useState<ArtistProps[]>([]);

  const dispatch = useAppDispatch();

  const artists = useAppSelector((state) => state.artist.artists);
  const trending: ArtistProps[] = [...artists].sort((a,b) => b.subscribedUsers.length - a.subscribedUsers.length);

  useEffect(() => {
    if(search) {
      setFilteredArtist([...artists].filter((item) => item.username?.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search])

  useEffect(() => {
    const getArtists = async() => {
      dispatch(getArtistsStart())
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/artist`);
        dispatch(getArtistsSucces(res.data))
      }catch(err) {
        dispatch(getArtistsFailure())
      }
    }
    getArtists();
  },[])

  useEffect(() => {
    const getFans = async() => {
      dispatch(getFansStart())
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/fans`);
        dispatch(getFansSuccess(res.data));
      }catch(err) {
        dispatch(getFansFailure())
      }
    }
    getFans();
  }, [])

  return (
    <RootStyle>
      <HomeHero setSearch={setSearch} />
      {filteredArtist.length ? (
        <Trending trending={filteredArtist} />
      ):(
        <Trending trending={trending}/>
        )}
      <Questions />
      <Subscribe />
    </RootStyle>
  );
}
