// @mui
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getBookingFailure, getBookingStart, getBookingSuccess } from "../redux/redux-slices/BookingSlice";
import { BookTicket, BookTimeDetails, BookTimeHero } from "sections/book-time";
// sections

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

export default function BookTime() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate("/login", {state: {from: `/book-time/${id}`}, replace: true});
    }
  },[])
  
  useEffect(() => {
    const getBookings = async() => {
      dispatch(getBookingStart())
      try{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/bookings/`);
        dispatch(getBookingSuccess(res.data));
      }catch(err) {
        dispatch(getBookingFailure())
      }
    }
    getBookings();
  }, [])

  return (
    <RootStyle>
      <BookTimeHero />
      <BookTimeDetails />
      <BookTicket />
    </RootStyle>
  );
}
