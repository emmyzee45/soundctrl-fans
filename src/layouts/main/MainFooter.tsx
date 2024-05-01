import { styled } from "@mui/material/styles";
import { Grid, Link, Divider, Container, Typography, Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: "rgba(248, 248, 248, 1)",
  padding: theme.spacing(2, 6),
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Divider />
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          component='p'
          variant='body2'
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          ©2024 SOUNDCTRL TECH, INC. All rights reserved.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <Stack spacing={2} direction='row' alignItems='center'>
            <Icon icon='ri:instagram-fill' width={theme.breakpoints.values.xs < 600 ? 16 : 24} />
            <Typography variant='subtitle2'>Instagram</Typography>
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Icon icon='mdi:twitter' width={theme.breakpoints.values.xs < 600 ? 16 : 24} /> 
            <Typography variant='subtitle2'>Twitter</Typography>
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Icon icon='ic:baseline-discord' width={theme.breakpoints.values.xs < 600 ? 16 : 24} /> 
            <Typography variant='subtitle2'>Discord</Typography>
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
