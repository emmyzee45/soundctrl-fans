import React, { useEffect, useState } from "react";
import { Paper, Grid, Button } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TimeSelector from "./TimeSelector";
import TimeIntervalSelector from "./TimeIntervalSelector";
import axios from "axios";
// import { gapi } from "gapi-script";
// import { useGoogleLogin } from "react-google-login";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateBookingFailure, updateBookingStart, updateBookingSuccess } from "../redux/redux-slices/BookingSlice";
import Notification from "./Notification";

const scope = "https://www.googleapis.com/auth/calendar";
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

type selectedBooking = {
  selectedBooking: string,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.95),
}));

const AppointmentScheduler = ({ selectedBooking }: selectedBooking) => {
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeInterval, setTimeInterval] = useState<number>(15);
  const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const bookings = useAppSelector((state) => state.booking.bookings)
  const booking = bookings.filter((booking) => booking._id === selectedBooking)[0];
  const user = useAppSelector((state) => state.user.currentUser);

  // useEffect(() => {
  //   const start = () => {
  //     gapi.client.init({
  //       clientId,
  //       scope,
  //     })
  //   }

  //   gapi.load("client:auth2", start);
  // }, [clientId])

  const handleDateChange = (date: Date | Date[] | null) => {
    if (Array.isArray(date)) {
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleIntervalChange = (interval: number) => {
    setTimeInterval(interval);
  };

  // const onSuccess = (e: any) => {
  //   // var authCode = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().code;
  //   // console.log(gapi.auth2.getAuthInstance().getAuthResponse())
  //   // console.log('Authorization Code:', authCode);
  //   handleSaveSchedule(e.profileObj.email)

  // }

  // const onFailure = (e: any) => {
  //   console.log(e)
  // }

  // const { signIn } = useGoogleLogin({
  //   // responseType: "code",
  //   // accessType: "offline",
  //   prompt: "consent",
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   scope,
  // })
  
  const handleSaveSchedule = async() => {
    // Logic to save the schedule <Emmy>
    dispatch(updateBookingStart())
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/bookings/event/${selectedBooking}`, 
        {artistId: booking.artistId, meetingId: booking.meetingId, email: user?.email}
      );
      setShow(true);
      setMessage("Meeting successfully booked!");
      dispatch(updateBookingSuccess(res.data));
      setScheduleSaved(true);
    }catch(err: any) {
      if(!err.response) {
        setMessage("No server response!");
      } else if(err.response.status === 403 || err.response.status === 401) {
        setMessage("Unauthorized")
      } else {
        setMessage("Interval server error!")
      }
      setShow(true)
      dispatch(updateBookingFailure())
    }
  };

  const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString() : "";
  const formattedTime = selectedTime ? selectedTime : "";

  return (
    <StyledPaper>
      <h2>
        Appointment Scheduler
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar<Date> value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TimeIntervalSelector onIntervalChange={handleIntervalChange} />
          <Grid item xs={12}>
            <TimeSelector
              selectedTime={selectedTime}
              onTimeChange={handleTimeChange}
              timeInterval={timeInterval}
            />
          </Grid>
          {selectedDate && selectedTime && (
            <div>
              <h5>
                {formattedDate} {formattedTime}
              </h5>
            </div>
          )}

          <Grid>
            <a href='#' style={{ textDecoration: "none", marginTop: "20px" }}>
              <Button
                variant='contained'
                size='large'
                sx={{
                  bgcolor: scheduleSaved ? "common.white" : "common.black",
                  color: scheduleSaved ? "common.black" : "common.white",
                  width: "fit-content",
                  boxShadow: "none",
                  marginTop: "10px",
                  textTransform: "uppercase",
                  border: scheduleSaved ? "1px solid black" : "none",
                  ":hover": {
                    bgcolor: scheduleSaved ? "common.white" : "common.black",
                    color: "rgba(253, 147, 76, 1)",
                  },
                }}
                disabled={!selectedBooking}
                onClick={handleSaveSchedule}
              >
                {scheduleSaved ? "CHANGE MY SCHEDULE" : "SAVE THIS SCHEDULE"}
              </Button>
            </a>
          </Grid>
        </Grid>
        <Notification 
          show={show}
          setShow={setShow}
          message={message}
        />
      </Grid>
    </StyledPaper>
  );
};

export default AppointmentScheduler;
