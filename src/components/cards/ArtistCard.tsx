import { Box, Stack, Typography, Button, Link } from "@mui/material";
import { ArtistCardType, UserProps } from "@types";
// import { Link } from "react-router-dom";
import Avatar from "components/Avatar";
import Image from "components/Image";
import { primaryButtonStyles } from "utils/cssStyles";

const ArtistCard = ({ bannerImg, avatarImg, username, _id }: UserProps) => {
  return (
    <Link href={`/book/${_id}`} underline="none">
    <Box sx={{ bgcolor: "rgba(237, 237, 237, 1)", borderRadius: 2, cursor: "pointer" }}>
      <Stack direction='row' spacing={3}>
        <Image src={bannerImg} alt='artist' sx={{ borderRadius: 2 }} />
        <Stack sx={{ padding: 2 }}>
          <Box>
            <Typography variant='h5' sx={{ color: "common.black", textTransform: "uppercase" }}>
              $3/mon
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ color: "common.black", textTransform: "uppercase" }}
            >
              price
            </Typography>
          </Box>
          <Box>
            <Typography variant='h5' sx={{ color: "common.black", textTransform: "uppercase" }}>
              12,888
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ color: "common.black", textTransform: "uppercase" }}
            >
              fan base
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Box
        sx={{
          padding: 1,
          bgcolor: "common.white",
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction='row' spacing={1}>
          <Avatar src={avatarImg} alt='artist avatar' />
          <Box>
            <Typography variant='subtitle1' sx={{ color: "common.black" }}>
              {username}
            </Typography>
            <Typography variant='subtitle2' sx={{ color: "grey.800" }}>
              @{username}
            </Typography>
          </Box>
        </Stack>
          <Button variant='contained' sx={primaryButtonStyles}>
            subscribe
          </Button>
      </Box>
    </Box>
    </Link>
  );
};

export default ArtistCard;
