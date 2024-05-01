// @mui
import { styled } from "@mui/material/styles";
import { Typography, Stack } from "@mui/material";
import { FandomCard } from "components/cards";
import { useAppSelector } from "../../redux/hooks";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

export default function Fandoms() {
  const user = useAppSelector((state) => state.user.currentUser);
  const artists = useAppSelector((state) => state.artist.artists);
  const fandoms = artists.filter((artist) => user?.subscribers?.includes(artist._id));
  return (
    <ContentStyle>
      <Typography
        variant='h3'
        sx={{ color: "common.black", fontWeight: 700, textTransform: "uppercase" }}
      >
        Proof of Fandoms
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent='space-between'
        sx={{ marginBlock: 5 }}
      >
        { fandoms.map((fandom) => (
          <FandomCard 
            username={fandom.username}
            avatarImg={fandom.avatarImg}
            subscribedUsers={fandom.subscribedUsers}
            twitter={fandom.twitter}
            _id=""
          />
        ))}
      </Stack>
    </ContentStyle>
  );
}
