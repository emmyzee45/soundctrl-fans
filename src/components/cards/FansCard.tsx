import { Box, Stack, Typography } from "@mui/material";
import { FansCardType, UserProps } from "@types";
import Avatar from "components/Avatar";

export default function FansCard({
  index,
  avatarImg,
  username,
  points,
  twitter,
  subscribers
}: UserProps & { index: number }) {
  return (
    <Stack spacing={3} direction='row' sx={{ cursor: "pointer" }}>
      <Typography variant='h3'>{index + 1}</Typography>
      <Avatar src={avatarImg} alt='fan avatars' sx={{ height: 80, width: 80 }} />
      <Box>
        <Typography variant='subtitle1' sx={{ color: "grey.800" }}>
          {username}
        </Typography>
        <Typography variant='subtitle2' sx={{ color: "grey.600" }}>
          {points}
        </Typography>
        <Typography variant='subtitle2' sx={{ color: "grey.600" }}>
          {/* {subscribers === undefined ? 0 : subscribers.length} */}
          @{username?.toLowerCase()}
        </Typography>
      </Box>
    </Stack>
  );
}
