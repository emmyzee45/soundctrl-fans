import { m } from "framer-motion";
import { Link, Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Button,
  Box,
  Container,
  Typography,
  Stack,
  StackProps,
  InputBase,
  Paper,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Image from "../../components/Image";
import { MotionContainer, varFade } from "../../components/animate";

//images
import { CrowdImage } from "assets";
import { outlineButtonStyles, primaryButtonStyles } from "utils/cssStyles";

// ----------------------------------------------------------------------

const ContentStyle = styled((props: StackProps) => <Stack spacing={8} {...props} />)(
  ({ theme }) => ({
    position: "relative",
    backgroundColor: "rgba(248, 248, 248, 1)",
    padding: theme.spacing(15, 0),
  })
);

type SearchFormProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

// ----------------------------------------------------------------------

export default function HomeHero({setSearch}: SearchFormProps) {

  return (
    <MotionContainer>
      <Container>
        <ContentStyle>
          <m.div variants={varFade().inRight}>
            <Stack>
              <Typography variant='h1' sx={{ color: "common.black", textAlign: "center" }}>
                Fandom Powered
              </Typography>
              <Typography
                component='span'
                variant='h1'
                sx={{ color: "common.black", textAlign: "center", fontWeight: 400 }}
              >
                by membership
              </Typography>
            </Stack>
          </m.div>
          <Stack justifyContent='center' alignItems='center' spacing={2} direction='row'>
            <Button size='large' sx={primaryButtonStyles}>
              join a fandom
            </Button>
            <a href="https://www.dev.artist.soundctrl.xyz">
              <Button size='large' variant='outlined' sx={outlineButtonStyles}>
                Become a creator
              </Button>
            </a>
          </Stack>
          <Box
            sx={{
              bgcolor: "rgba(34, 34, 34, 1)",
              borderRadius: 5,
              position: "relative",
              padding: 4,
              width: "100%",
              marginTop: "7rem !important",
              marginBottom: "3rem",
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant='h2' sx={{ color: "common.white" }}>
                  3K+
                </Typography>
                <Typography variant='h5' sx={{ color: "common.white" }}>
                  Artists
                </Typography>
              </Box>
              <Box>
                <Typography variant='h2' sx={{ color: "common.white" }}>
                  200hr+
                </Typography>
                <Typography variant='h5' sx={{ color: "common.white" }}>
                  Exclusive content
                </Typography>
              </Box>
              <Box>
                <Typography variant='h2' sx={{ color: "common.white" }}>
                  250k+
                </Typography>
                <Typography variant='h5' sx={{ color: "common.white" }}>
                  Active users
                </Typography>
              </Box>
              <Box>
                <Typography variant='subtitle2' sx={{ color: "common.white", width: "35ch" }}>
                  Join over 3,000 of the world’s largest music fandoms the fastest growing platform
                  for superfans. Get exclusive content, facetime with your favorite artist, and
                  access community chats.
                </Typography>
              </Box>
            </Stack>
            <Image
              src={CrowdImage}
              alt='crowd image'
              sx={{
                height: { sm: 450, lg: 550 },
                width: { sm: 450, lg: 550 },
                position: "absolute",
                top: -65,
                right: 35,
                display: { xs: "none", sm: "block" },
              }}
            />
          </Box>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Search for your favorite artist'
              inputProps={{ "aria-label": "Search for your favorite artist" }}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                bgcolor: "common.white",
                padding: "6px 10px",
              }}
            />

            <Button
              variant='contained'
              sx={{ position: "absolute", right: 0, ...primaryButtonStyles }}
              size='large'
            >
              search
            </Button>
          </Paper>
        </ContentStyle>
      </Container>
    </MotionContainer>
  );
}
