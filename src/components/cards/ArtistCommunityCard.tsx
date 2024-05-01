import { Box, Stack, Typography } from "@mui/material";
import { ArtistCommunityCardType, UserProps } from "@types";

import Image from "components/Image";

export default function ArtistCommunityCard({ username, avatarImg }: UserProps) {
  return (
    <Box sx={{ cursor: "pointer", overflow: "hidden" }}>
      <Box sx={{ overflow: "hidden" }}>
        <Image
          src={avatarImg}
          alt='artist community image'
          sx={{
            height: 350,
            width: 350,

            ":hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>
      <Stack spacing={0} sx={{ padding: 2 }}>
        <Typography
          variant='h4'
          sx={{
            color: "common.black",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontFamily: "Dela Gothic One, cursive",
          }}
        >
          {username}
        </Typography>
        <Typography variant='subtitle2' sx={{ color: "grey.600", textTransform: "capitalize" }}>
          @{username?.toLowerCase()}
        </Typography>
      </Stack>
    </Box>
  );
}
