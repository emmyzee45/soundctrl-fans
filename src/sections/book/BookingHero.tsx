// @mui
import { Icon } from "@iconify/react";
import { Box, Button, Chip, Stack, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArtistImage } from "assets";
import Image from "components/Image";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(15, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

export default function BookingHero() {
  const search = useParams()
  const id = search.id;
  const artists = useAppSelector((state) => state.artist.artists);
  const artist = [...artists].filter((artist) => artist._id === id)[0];

  return (
    <ContentStyle>
      <Stack
        alignItems='flex-start'
        justifyContent='space-between'
        direction={{ xs: "column", md: "row" }}
      >
        <Stack spacing={5}>
          <Stack direction='row' spacing={1}>
            <Chip
              label='verified'
              sx={{
                bgcolor: "rgba(120, 225, 177, 1)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            />
            <Icon icon='mdi:help-circle' />
          </Stack>
          <Typography variant='h2'>{artist?.username}</Typography>
          <Typography variant='subtitle2' sx={{ width: "40ch" }}>
            {/* Vincent Fenton is a self taught multi-instrumentalist from France. As FKJ, aka French
            Kiwi Juice, his loose and colorful arrangements could soundtrack just about anything,
            anywhere. */}
            {artist?.desc}
          </Typography>
          <Link href={`/pay/${id}?type=subscription&price=${3}`} underline="none">
          <Button
            variant='contained'
            size='large'
            sx={{
              bgcolor: "common.black",
              color: "common.white",
              width: "fit-content",
              boxShadow: "none",
              ":hover": {
                bgcolor: "common.black",
                color: "rgba(253, 147, 76, 1)",
              },
            }}
          >
            Click to subscribe
          </Button>
          </Link>
        </Stack>
        <Stack spacing={2} justifyContent='center' alignItems='center'>
          <Image src={artist?.avatarImg} alt='artist image' />
          <Stack spacing={4} direction='row' sx={{ alignItems: "center" }}>
            <Box>
              <Typography variant='h4'>730</Typography>
              <Typography variant='subtitle2'>Video calls</Typography>
            </Box>
            <Box>
              <Typography variant='h4'>12,888</Typography>
              <Typography variant='subtitle2'>fan base</Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </ContentStyle>
  );
}
