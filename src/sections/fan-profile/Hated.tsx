import { styled } from "@mui/material/styles";
import { Typography, Grid, Stack } from "@mui/material";
import { FansCard } from "components/cards";
import { FANCARDS } from "data";
import { useAppSelector } from "../../redux/hooks";

const ContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 8),
  backgroundColor: "rgba(248, 248, 248, 1)",
  margin: "auto",
  overflow: "hidden",
}));

export default function Hated() {
  const fans = useAppSelector((state) => state.fans.fans);
  const sortedFans = [...fans].sort((a:any, b:any) => a.points - b.points)
  return (
    <ContentStyle>
      <Stack spacing={1} direction='row'>
        <Typography
          variant='h3'
          sx={{
            color: "common.black",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Most Hated Fandoms
        </Typography>
        <Typography
          variant='h3'
          sx={{
            color: "rgba(253, 147, 76, 1)",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          BOTTOM 4
        </Typography>
      </Stack>
      <Grid container spacing={3} sx={{ justifyContent: "center", mt: 5 }}>
        {sortedFans.slice(0,4).map((card, index) => (
          <Grid item key={index}>
            <FansCard
            _id={card._id}
              index={index}
              avatarImg={card.avatarImg}
              twitter={card.twitter}
              points={card.points}
              subscribers={card.subscribers}
            />
          </Grid>
        ))}
      </Grid>
    </ContentStyle>
  );
}
