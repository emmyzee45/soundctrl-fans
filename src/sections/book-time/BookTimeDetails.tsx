// @mui
import { Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

export default function BookTimeDetails() {
  return (
    <ContentStyle>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Stack spacing={1} sx={{ width: 250 }}>
          <Typography variant='h3' sx={{ color: "common.black" }}>
            01
          </Typography>
          <Typography variant='h4' sx={{ color: "grey.700" }}>
            Subscribe To A Fandom
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "grey.700" }}>
            Before you can book a call with your favorite artist you need to be subscribe to their
            fandom.
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ width: 250 }}>
          <Typography variant='h3' sx={{ color: "common.black" }}>
            02
          </Typography>
          <Typography variant='h4' sx={{ color: "grey.700" }}>
            Purchase A Time Ticket
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "grey.700" }}>
            Buy a ticket to have a one on one video conversation. Tell your favorite artist how much
            you love them, tell them a funny story, or just say hi. Theses are private moments you
            will never forget. These are for a minimum of for 1 minute.
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ width: 250 }}>
          <Typography variant='h3' sx={{ color: "common.black" }}>
            03
          </Typography>
          <Typography variant='h4' sx={{ color: "grey.700" }}>
            Find Time On The Calendar
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "grey.700" }}>
            The artist available time slots are listed on the calendar below. If there are no
            available time slots we will notify you when the artist makes more time available.
          </Typography>
        </Stack>
        <Stack spacing={1} sx={{ width: 250 }}>
          <Typography variant='h3' sx={{ color: "common.black" }}>
            04
          </Typography>
          <Typography variant='h4' sx={{ color: "grey.700" }}>
            Enjoy Your Movement
          </Typography>
          <Typography variant='subtitle2' sx={{ color: "grey.700" }}>
            Its your time to shine. Create a life long memory with your favorite artist. Please be
            respectful. no weirdo vibes.
          </Typography>
        </Stack>
      </Stack>
    </ContentStyle>
  );
}
