// @mui
import { Icon } from "@iconify/react";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArtistImageTwo } from "assets";
import Image from "components/Image";

const ContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: "rgba(248, 248, 248, 1)",
  margin: "auto",
  overflow: "hidden",
}));

export default function ExploreChat() {
  return (
    <ContentStyle>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems='flex-start'
        justifyContent='space-between'
        sx={{ borderRadius: 5, bgcolor: "common.white", padding: 4 }}
      >
        <Stack spacing={10}>
          <Stack spacing={2}>
            <Typography variant='h3'>Explore The Official Super Fan Chat</Typography>
            <Typography variant='subtitle2' sx={{ width: "45ch" }}>
              Chat with other superfans, get exclusive content, live streams, memes, listening
              parties, and much more from your favorite artist.
            </Typography>
          </Stack>

          <IconButton sx={{ width: "fit-content", justifySelf: "self-end" }}>
            <Icon icon='ph:arrow-right-thin' fontSize={50} />
          </IconButton>
        </Stack>
        <Image
          src={ArtistImageTwo}
          alt='artist image'
          sx={{ borderRadius: 2, height: 500, width: 500 }}
        />
      </Stack>
    </ContentStyle>
  );
}
