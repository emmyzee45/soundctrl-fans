// @mui
import { styled } from "@mui/material/styles";

// sections
import { BookArtist, BookingHero, ExploreChat } from "../sections/book";
import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ---------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
}));

// ----------------------------------------------------------------------

export default function Book() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate("/login", { state: {from: `/book/${id}` }, replace: true })
    }
  },[])
  return (
    <RootStyle>
      <BookingHero />
      <ContentStyle>
        <BookArtist />
        <ExploreChat />
      </ContentStyle>
    </RootStyle>
  );
}
