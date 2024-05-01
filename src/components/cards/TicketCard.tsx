import { Box, Button, Stack, Typography } from "@mui/material";
import { BookingProps } from "@types";
import { TicketOne } from "assets";
import Image from "components/Image";
import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface selectedBooking extends BookingProps {
  setSelectedBooking: React.Dispatch<SetStateAction<string>>
}

export default function TicketCard({artistId, _id, time, link, price, fanId, meetingId, status, username }: BookingProps ) {
  const artists = useAppSelector((state) => state.artist.artists);
  const artist = artists.filter((artist) => artist._id === artistId)[0]

  // const handleBooking = (e: React.MouseEvent<HTMLButtonElement>, meetingId: string) => {
  //   setSelectedBooking(meetingId)
  // }
  
  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 2, marginBlock: 2 }}>
      <Image src={TicketOne} alt='ticket image' />
      <Stack spacing={1} sx={{ padding: 2, bgcolor: "common.white", borderRadius: 5 }}>
        <Typography variant='h5'>Tea time with @{artist?.username}</Typography>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='subtitle2'>${time}mins</Typography>
          <Typography variant='subtitle2'>0.04ETH ${price}</Typography>
        </Stack>
        <Link to={`/pay/${_id}?type=booking&price=${price}&artist_id=${artistId}`}>
          <Button
            variant='contained'
            sx={{
              bgcolor: "common.black",
              color: "common.white",
              boxShadow: "none",
              ":hover": {
                bgcolor: "common.black",
                color: "rgba(253, 147, 76, 1)",
              },
            }}
            >
            Buy
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
