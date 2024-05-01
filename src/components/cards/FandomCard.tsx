import { Box, Button, Stack, Typography } from "@mui/material";
import { ArtistProps } from "@types";
import { UserAvatarTwo } from "assets";
import Avatar from "components/Avatar";

export default function FandomCard(artist: ArtistProps) {
  return (
    <Box sx={{ borderRadius: 2, bgcolor: "common.black", width: 350, mb: 6 }}>
      <Stack spacing={2} sx={{ paddingInline: 5, paddingBlock: 8 }}>
        <Typography variant='h5' sx={{ color: "common.white" }}>
          12/MONTHS
        </Typography>
        <Typography variant='subtitle2' sx={{ color: "common.white", textTransform: "uppercase" }}>
          fan TIME
        </Typography>
      </Stack>
      <Stack
        direction='row'
        sx={{ bgcolor: "common.white", padding: 2, borderRadius: 2 }}
        justifyContent='space-between'
      >
        <Stack direction='row' spacing={1}>
          <Avatar src={artist.avatarImg} alt='user avatar' />
          <Box>
            <Typography variant='h5'>{artist.username}</Typography>
            <Typography variant='subtitle2'>@{artist.twitter}</Typography>
          </Box>
        </Stack>
        <Button
          variant='contained'
          size='small'
          sx={{
            bgcolor: "common.black",
            color: "rgba(253, 147, 76, 1)",
            textTransform: "uppercase",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          subscribeD
        </Button>
      </Stack>
    </Box>
  );
}
