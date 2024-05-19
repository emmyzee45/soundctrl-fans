import { Typography, Stack, Tabs, Tab, Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TicketCard } from "components/cards";
import AppointmentSchedule from "components/AppointmentSchedule";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateBookingFailure, updateBookingStart, updateBookingSuccess } from "../../redux/redux-slices/BookingSlice";
import MyTicket from "components/cards/timetickets/MyTicket";
import NewTicket from "components/cards/timetickets/NewTicket";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "components/Notification";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(5, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ paddingBlock: 15 }}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function BookTicket() {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<string>("");

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.currentUser);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const booking = bookings.filter((booking) => booking._id === selectedBooking)[0];

  const userBookings = [...bookings].filter((item) => item.status === "selling" && item.artistId === id)
  
  const soldBookings = [...bookings].filter((item) => {
    return (item.status === "sold" || item.status === "book") && item.artistId === id
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  return (
    <ContentStyle>
      <Typography variant='h2' sx={{ color: "common.black" }}>
        Time tickets
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box sx={{ width: "fit-content" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='time tickets tabs'
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgba(253, 147, 76, .8)",
                height: "1rem",
                marginBottom: ".5rem",
              },
            }}
          >
            <Tab label='New Ticket' {...a11yProps(0)} />
            <Tab label='My Ticket' {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {userBookings.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                  <NewTicket
                    _id={item._id}
                    artistId={item.artistId}
                    fanId={item.fanId}
                    time={item.time}
                    date={item.date}
                    link={item.link}
                    price={item.price}
                    status={item.status}
                    meetingId={item.meetingId}
                    username={item.username}
                    interval={item.interval}
                  />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2}>
              {soldBookings.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                  <MyTicket
                    _id={item._id}
                    artistId={item.artistId}
                    fanId={item.fanId}
                    time={item.time}
                    date={item.date}
                    link={item.link}
                    price={item.price}
                    status={item.status}
                    meetingId={item.meetingId}
                    username={item.username}
                    interval={item.interval}
                    setSelectedBooking={setSelectedBooking}
                  />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
        </Box>
        <Stack
          spacing={2}
          sx={{
            padding: 4,
            bgcolor: "common.white",
            borderRadius: 5,
            height: "fit-content",
            width: "70%",
          }}
        >
          <AppointmentSchedule 
            selectedBookingId={selectedBooking}
          />
          <Button
            variant='contained'
            size="large"
            disabled={!selectedBooking}
            onClick={handleSaveSchedule}
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
            {scheduleSaved ? "CHANGE MY SCHEDULE" : "SAVE THIS SCHEDULE"}
          </Button>
        </Stack>
      </Stack>
      <Notification 
          show={show}
          setShow={setShow}
          message={message}
        />
    </ContentStyle>
  );
}
