// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Container, Typography, Tabs, Tab, Stack } from "@mui/material";
import { AcceptedTicketCard, FandomCard, TicketCard } from "components/cards";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { BookingProps } from "@types";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
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
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function TimeTickets() {
  const [value, setValue] = useState(0);
  // const [bookings, setBookings] = useState<BookingProps[]>([])

  const user = useAppSelector((state) => state.user.currentUser);
  const bookings = useAppSelector((state) => state.booking.bookings);
  const filteredBookings = bookings.filter((booking) => booking.fanId === user?._id);
  const usedBooking = filteredBookings.filter((item) => item.status === "book");
  const boughtBooking = filteredBookings.filter((item) => item.status === "sold");
  console.log(filteredBookings)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   const getBookings = async() => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/bookings/fan/${user?._id}`);
  //       setBookings(res.data)
  //     }catch(err) {
  //       console.log(err)
  //     }
  //   }
  //   getBookings()
  // },[])

  return (
    <ContentStyle>
      <Typography variant='h3' sx={{ color: "common.black", fontWeight: 700 }}>
        MY TIME TICKETS
      </Typography>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='ticket tabs'
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgba(253, 147, 76, .8)",
              height: "1rem",
              marginBottom: ".5rem",
            },
          }}
        >
          <Tab label='All' {...a11yProps(0)} />
          <Tab label='Hold' {...a11yProps(1)} />
          <Tab label='Used' {...a11yProps(2)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {filteredBookings.map((item) => (
              <AcceptedTicketCard 
               {...item}
              />
            ))}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {boughtBooking.map((item) => (
              <AcceptedTicketCard 
                {...item}
              />
            ))}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {usedBooking.map((item) => (
              <AcceptedTicketCard 
                {...item}
              />
            ))}
            </Stack>
        </CustomTabPanel>
      </Box>
    </ContentStyle>
  );
}
