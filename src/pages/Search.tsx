import { styled } from "@mui/material/styles";
import { Fans, SearchForm, TrendingArtists } from "../sections/search";
import { useStore } from "store/store";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ArtistProps, UserProps } from "@types";
// sections
// import Trending from "../sections/search/Trending";
// import Fans from "../sections/search/Fans";
// import SearchForm from "../sections/search/SearchForm";

// ----------------------------------------------------------------------
import SearchNotFound from "components/SearchNotFound";
import { COMMUNITYCARDS } from "data";
import { ArtistCommunityCardType } from "@types";

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

export default function Search() {
  const { artistsData, getArtists } = useStore();
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchResults, setSearchResults] = useState<ArtistProps[]>([]);
  const [searchResultsFound, setSearchResultsFound] = useState(true);

  const fans = useAppSelector((state) => state.fans.fans);
  const artists = useAppSelector((state) => state.artist.artists);

  const topFans: UserProps[] = fans.sort((a: any,b:any) => {
    if(b.points === undefined) return -1;
    if(a.points === undefined) return -1;
    return b.points - a.points
  });

  const trending: ArtistProps[] = [...artists]?.sort((a,b) => b.subscribedUsers.length - a.subscribedUsers.length);

  useEffect(() => {
    getArtists();
  }, []);

  const handleSearch = (query: string) => {
    setSearchInProgress(true);

    const filteredArtists = [...artists].filter(artist =>
      artist?.username?.toLowerCase().includes(query.toLowerCase()) ||
      artist?.username?.toLowerCase().includes(query.toLowerCase())
    );

    setTimeout(() => {
      setSearchInProgress(false);
      setSearchResults(filteredArtists);

      setSearchResultsFound(filteredArtists.length > 0);
    }, 1000);
  };

  return (
    <RootStyle>
      <SearchForm onSearch={handleSearch} />
      {searchInProgress ? (
        <p>Loading...</p>
      ) : searchResultsFound ? (
        <TrendingArtists trending={searchResults} />
      ) : (
        <SearchNotFound />
      )}
      <Fans topFans={topFans} />
    </RootStyle>
  );
}
