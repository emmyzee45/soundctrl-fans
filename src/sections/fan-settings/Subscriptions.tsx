// @mui
import { styled } from "@mui/material/styles";
import { Grid, Stack } from "@mui/material";
import { FandomCard } from "components/cards";
import { useAppSelector } from "../../redux/hooks";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
}));

export default function Subscriptions() {
  const user = useAppSelector((state) => state.user.currentUser);
  const artists = useAppSelector((state) => state.artist.artists);
  const fandoms = artists.filter((artist) => user?.subscribers?.includes(artist._id));
  return (
    <ContentStyle>
      <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
        {fandoms.map((fandom) => (
          <FandomCard 
            key={fandom._id}
            username={fandom.username}
            twitter={fandom.twitter}
            avatarImg={fandom.avatarImg}
            subscribedUsers={fandom.subscribedUsers}
            _id=""
          />
        ))}
      </Stack>
    </ContentStyle>
  );
}
