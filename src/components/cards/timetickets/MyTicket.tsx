import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import { BookingProps } from "@types";
import { TicketOne } from "assets";
import Image from "components/Image";
import React, { SetStateAction } from "react";
import { useAppSelector } from "../../../redux/hooks";

interface extendBookingProps extends BookingProps {
  setSelectedBooking: React.Dispatch<SetStateAction<string>>
}

export default function MyTicket({
  artistId,
  _id,
  time,
  link,
  price,
  fanId,
  meetingId,
  status,
  username,
  setSelectedBooking
}: extendBookingProps) {

  const artists = useAppSelector((state) => state.artist.artists);
  const artist = artists.filter((artist) => artist._id === artistId)[0]
  
  const handleBooking = (e: React.MouseEvent<HTMLButtonElement>, meetingId: string) => {
    setSelectedBooking(meetingId)
  }

  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 2, mb: 2 }}>
      <Image src={TicketOne} alt='ticket image' />
      <Stack spacing={1} sx={{ padding: 2, bgcolor: "common.white", borderRadius: 5 }}>
        <Stack spacing={0}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            Tea time with @{artist.username}
          </Typography>
        </Stack>

        <Stack>
          <Grid container justifyContent='center' alignItems='center'>
            {" "}
            {status === "sold" && (
              <Button
                variant='contained'
                size='large'
                sx={{
                  bgcolor: "common.black",
                  color: "common.white",
                  width: "240px",
                  boxShadow: "none",
                  borderRadius: "15px",
                  marginTop: "10px",
                  textTransform: "uppercase",
                  ":hover": {
                    bgcolor: "common.black",
                    color: "rgba(253, 147, 76, 1)",
                  },
                }}
                onClick={(e) => handleBooking(e, _id)}
              >
                BOOK A TIME
              </Button>
            )}
          </Grid>
          { status === "book" && (<>
          <Stack spacing={1} direction='row'>
            <Typography variant='subtitle2' sx={{ fontWeight: 700, paddingTop: "2px" }}>
              Meeting link
            </Typography>
          </Stack>
            <Stack spacing={2}>
              <Button
                size='small'
                sx={{ color: "rgba(51, 153, 255, 1)", fontSize: 12, textTransform: "lowercase" }}
                >
                {link}
              </Button>
            </Stack>
          </>)}
        </Stack>
      </Stack>
    </Box>
  );
}
