// @mui
import { Button, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArtsitBackgroundImage } from "assets";
import { Icon } from "@iconify/react";
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
  backgroundImage: `url(${ArtsitBackgroundImage})`,
  backgroundSize: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "75vh",
}));

export default function BookTimeHero() {
  const { id } = useParams();
  const artists = useAppSelector((state) => state.artist.artists);
  const artist = [...artists].filter((artist) => artist._id === id)[0];

  return (
    <ContentStyle>
      <Stack spacing={5}>
        <Button sx={{ color: "common.white", textTransform: "lowercase", width: "fit-content" }}>
          back
        </Button>

        <Stack spacing={2}>
          <Stack direction='row' spacing={1}>
            <Icon icon='mdi:twitter' width={20} height={20} color='white' />
            <Icon icon='ri:instagram-fill' width={20} height={20} color='white' />
            <Icon icon='mdi:spotify' width={20} height={20} color='white' />
          </Stack>
          <Typography variant='h2' sx={{ color: "common.white" }}>
            French Kiwi juice
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "common.white" }}>
            French musician
          </Typography>
        </Stack>
      </Stack>
    </ContentStyle>
  );
}
