// @mui
import { styled } from "@mui/material/styles";
import { Box, Container, Typography, Stack } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionInView, varFade } from "../../components/animate";
import { LikeIceSpice } from "assets";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 0),
  backgroundColor: "rgba(248, 248, 248, 1)",
  position: "relative",
  marginTop: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Questions() {
  return (
    <Container sx={{ position: "relative" }}>
      <ContentStyle>
        <Typography variant='h2' sx={{ color: "common.black" }}>
          Got Questions?
        </Typography>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Stack spacing={2} sx={{ borderRadius: 2, bgcolor: "common.white", padding: 6 }}>
              <Typography variant='h5' sx={{ color: "common.black" }}>
                Who can I subscribe to?
              </Typography>
              <Typography variant='subtitle2' sx={{ color: "common.black" }}>
                Every artist has a fandom on SOUNDCTRL. You can just search for your favorite artist
                and join the official fandom. If your favorite artist is not on here yet, don't
                worry we add new artist every day 🙃
              </Typography>
            </Stack>
            <Stack spacing={2} sx={{ borderRadius: 2, bgcolor: "common.white", padding: 6 }}>
              <Typography variant='h5' sx={{ color: "common.black" }}>
                What happens after I subscribe to a fandom?
              </Typography>
              <Typography variant='subtitle2' sx={{ color: "common.black" }}>
                The magic begins. Once you are in the official fandom, you can "book time" with the
                artist you subscribe to. This is a private video call with your favorite artist.
              </Typography>
              <Typography variant='subtitle2' sx={{ color: "common.black" }}>
                You will also unlock SuperChat. A chat room where you will see exclusive content,
                live streams, conversation, memes, listening parties, and much more from your
                favorite artist.
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ bgcolor: "rgba(191, 241, 49, 1)", position: "relative", borderRadius: 2 }}
            >
              <Stack spacing={2} sx={{ mt: 5, padding: 3 }}>
                <Typography variant='h5' sx={{ color: "common.black" }}>
                  Why do I not get blocked and banned?
                </Typography>
                <Typography variant='subtitle2' sx={{ color: "common.black", width: "40ch" }}>
                  You can log in with your personal account. If you don’t have access to Soundctrl
                  for Artists yet, you can get access to connect your account to your artist profile
                  or label team.
                </Typography>
              </Stack>
              <Image
                src={LikeIceSpice}
                alt='banner image'
                sx={{
                  position: "relative",
                  top: 0,
                  height: 400,
                  width: 400,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Stack>
            <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
              <Stack
                spacing={2}
                sx={{ borderRadius: 2, bgcolor: "rgba(253, 147, 76, 1)", padding: 6 }}
              >
                <Typography variant='h5' sx={{ color: "common.black" }}>
                  Can I get kicked out of a fandom?
                </Typography>
                <Typography variant='subtitle2' sx={{ color: "common.black" }}>
                  We love the passion of our users! Ultimately the artist and their team decide who
                  can stay in their fandoms. Take a look at our fandom policies.
                </Typography>
              </Stack>
              <Stack spacing={2} sx={{ borderRadius: 2, bgcolor: "common.white", padding: 6 }}>
                <Typography variant='h5' sx={{ color: "common.black" }}>
                  What are Fan Experience Points?
                </Typography>
                <Typography variant='subtitle2' sx={{ color: "common.black" }}>
                  On SoundCTRL you are rewarded for being a superfan, the more support your favorite
                  on and off this platform the more points you will receive. Points can be redeemed
                  for experiences, merch, tickets, and surprises.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ContentStyle>
    </Container>
  );
}
