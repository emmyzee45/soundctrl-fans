import { Grid, Typography } from "@mui/material";
import { ArtistCommunityCard } from "components/cards";
// @mui
import { styled } from "@mui/material/styles";
import { COMMUNITYCARDS } from "data";
import { useAppSelector } from "../../redux/hooks";
import { ArtistProps, UserProps } from "@types";

interface Artist {
  image: string;
  name: string;
  handle: string;
}

const ContentStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "common.white",
  padding: theme.spacing(2, 10),
}));

type ArtistListProps = {
  trending: ArtistProps[]
}

export default function Trending({trending}: ArtistListProps) {

  return (
    <ContentStyle>
      <Typography
        variant='h3'
        sx={{
          color: "common.black",
          width: "16ch",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontFamily: "Dela Gothic One, cursive",
        }}
      >
        Trending Communities
      </Typography>
      <Grid container spacing={2} sx={{ my: 5, justifyContent: "center", width: "100%" }}>
        {trending.slice(0,6).map((card, index) => (
          <Grid item key={index}>
            <ArtistCommunityCard _id={card._id} avatarImg={card.avatarImg} username={card.username} />
          </Grid>
        ))}
        {trending.length > 0 ? (
          trending.map((artist, index) => (
            <Grid item key={index}>
              <ArtistCommunityCard _id={artist._id} avatarImg={artist.avatarImg} username={artist.username} />
            </Grid>
          ))
        ) : (
          <Typography variant='body1' color='textSecondary'>No matching artists found</Typography>
        )}
      </Grid>
    </ContentStyle>
  );
}
