import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { BookingProps } from "@types";
import { TicketOne } from "assets";
import Image from "components/Image";

export default function AcceptedTicketCard({username, time, link}: BookingProps) {
  return (
    <Box sx={{ bgcolor: "common.white", borderRadius: 2, mb: 2 }}>
      <Image src={TicketOne} alt='ticket image' />
      <Stack spacing={1} sx={{ padding: 2, bgcolor: "common.white", borderRadius: 5 }}>
        <Stack spacing={0}>
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            Tea time with @{username}
          </Typography>
          <Typography variant='subtitle2'>03:30 PM on SAP 02, 2023</Typography>
        </Stack>

        <Stack>
          <Stack spacing={1} direction='row'>
            <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
              Meeting link
            </Typography>
            <Typography variant='subtitle2'>copy</Typography>
          </Stack>
          <Button
            size='small'
            sx={{ color: "rgba(51, 153, 255, 1)", fontSize: 12, textTransform: "lowercase" }}
          >
            {link}
          </Button>
          <Link sx={{ fontSize: 12, color: "rgba(34, 34, 34, 1)" }}>
            A CONFIRMATION HAS BEEN SENT:)
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
