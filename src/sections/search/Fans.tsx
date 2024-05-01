import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import { FansCard } from "components/cards";
import { FANCARDS } from "data";
import { UserProps } from "@types";

const ContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 8),
  backgroundColor: "rgba(248, 248, 248, 1)",
  margin: "auto",
  overflow: "hidden",
}));

type UserListProps = {
  topFans: UserProps[]
}

export default function Fans({topFans}: UserListProps) {
 

  return (
    <ContentStyle>
      <Typography
        variant='h3'
        sx={{
          color: "common.black",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontFamily: "Dela Gothic One, cursive",
        }}
      >
        Top Fans of the Week
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: "center", mt: 5 }}>
        {topFans.slice(0,10).map((card, index) => (
          <Grid item key={index}>
            <FansCard
              index={index}
              avatarImg={card.avatarImg}
              username={card.username}
              points={card.points}
              _id={card._id}
              // fandom={card.fandom}
            />
          </Grid>
        ))}
      </Grid>
    </ContentStyle>
  );
}
