import { Button, Stack, Typography, Link } from "@mui/material";
import SectionContainer from "layouts/main/SectionContainer";
import { useContext, useEffect, useState } from "react";
import { secondaryButtonStyles } from "utils/cssStyles";
import { useLocation, useNavigate } from "react-router-dom";

import successIcon from "assets/images/Successmark.png";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { updateBookingFailure, updateBookingStart, updateBookingSuccess } from "../redux/redux-slices/BookingSlice";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [buyerId, setBuyerId] = useState<string>("");

  const id = location.state?.id;
  const artist_id = location.state?.artist_id;
  const type = location.state?.type;
  const payment_intent = location.state?.payment_intent;

  const handleBackToLogin = () => {
    navigate( type === "subscription" ? `/book/${id}`: `/book-time/${artist_id}`);
  };

  useEffect(() => {
    const confirmPayment = async() => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/orders/confirm`, {payment_intent});
            setBuyerId(res.data.buyerId)
        }catch(err) {
            console.log(err)
        }
    }
    payment_intent  && confirmPayment();
},[payment_intent])

useEffect(() => {
  const updateBooking = async() => {
    dispatch(updateBookingStart());
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/bookings/${id}`, 
        {status: "sold", fanId: buyerId}
      );
      dispatch(updateBookingSuccess(res.data));
    }catch(err) {
      dispatch(updateBookingFailure())
    }
  }

  if(type === "booking" && buyerId.length){
    updateBooking();
  } 
}, [buyerId])

  return (
    <SectionContainer>
      <Stack
        direction='column'
        alignItems='center'
        spacing={2}
        style={{ position: "relative", textAlign: "center" }}
      >
        <img src={successIcon} alt='Success Icon' style={{ width: "100px", height: "100px" }} />
        <Typography variant='h2' sx={{ color: "common.black" }}>
          Payment Successful!
        </Typography>
      </Stack>

      <Typography variant='subtitle1' sx={{ color: "#96989D", textAlign: "center" }}>
        Your subscription is successful.
      </Typography>

      <Stack justifyContent='center' marginInline='auto' width={{ md: "15%" }}>
          <Link href={type === "subscription" ? `/book/${id}`: `/book-time/${artist_id}`} underline="none">
        <Stack spacing={2} marginBlock={5}>
            <Button
              variant='contained'
              size='medium'
              sx={secondaryButtonStyles}
              >
              Back
            </Button>
        </Stack>
          </Link>
      </Stack>
    </SectionContainer>
  );
}
