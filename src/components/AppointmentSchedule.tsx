import { Paper, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeSelector from "./TimeSelector";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";


type selectedBookingId = {
  selectedBookingId: string,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.95),
}));

const AppointmentScheduler = ({ selectedBookingId }: selectedBookingId) => {

  const bookings = useAppSelector((state) => state.booking.bookings)
  const booking = bookings.filter((booking) => booking._id === selectedBookingId)[0];

  return (
    <StyledPaper>
      <h2>
        Appointment Scheduler
      </h2>
      <Grid container spacing={14}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={dayjs(booking?.date.split(" ")[0])} disabled />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={6} sm={7}>
            <TimeSelector
              selectedTime={selectedBookingId && booking.time}
              timeInterval={selectedBookingId ? parseInt(booking.interval) : 30}
            />
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default AppointmentScheduler;
