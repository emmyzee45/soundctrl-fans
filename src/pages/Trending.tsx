// @mui
import { styled } from "@mui/material/styles";
// sections
import { Fans, SearchForm, TrendingArtists } from "../sections/search";
import { useStore } from "store/store";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ArtistProps, UserProps } from "@types";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

// ----------------------------------------------------------------------

export default function Trending() {

  const [search, setSearch] = useState("");
  const [filterArtist, setFilterArtist] = useState<ArtistProps[]>([]);

  const fans = useAppSelector((state) => state.fans.fans);
  const artists = useAppSelector((state) => state.artist.artists);

  const topFans: UserProps[] = [...fans].sort((a: any,b:any) => {
    if(b.points === undefined) return -1;
    if(a.points === undefined) return -1;
    return b.points - a.points
  });

  const trending: ArtistProps[] = [...artists]?.sort((a,b) => b.subscribedUsers.length - a.subscribedUsers.length);

  useEffect(() => {
    if(search) {
      setFilterArtist([...artists].filter((item) => item.email?.toLowerCase().includes(search.toLowerCase())))
    }
  }, [search]);


  return (
    <RootStyle>
      <SearchForm onSearch={setSearch} />
      {filterArtist.length ? (
        <TrendingArtists trending={filterArtist} />
      ):(
      <TrendingArtists trending={trending}/>
      )}
      <Fans topFans={topFans} />
    </RootStyle>
  );
}
