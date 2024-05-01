// @mui
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../redux/hooks";
import {
  FanProfileHero,
  Fandoms,
  Favorites,
  Hated,
  ProfileSummary,
  TimeTickets,
} from "sections/fan-profile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// sections

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

export default function FanProfile() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate("/login", { state: { from: "/fan-profile" }, replace: true })
    }
  },[])
  return (
    <RootStyle>
      <FanProfileHero/>
      <ProfileSummary
        username={user?.username}
        desc={user?.desc}
        points={user?.points}
        avatarImg={user?.avatarImg}
        _id=""
      />
      <Fandoms />
      <TimeTickets />
      <Favorites />
      <Hated />
    </RootStyle>
  );
}
