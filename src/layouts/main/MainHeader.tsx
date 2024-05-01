import { useLocation, useNavigate } from "react-router-dom";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, AppBar, Toolbar, Container, Link } from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
import useResponsive from "../../hooks/useResponsive";
// utils
import cssStyles from "../../utils/cssStyles";
// config
import { HEADER } from "../../config";
// components
import { Logo } from "../../assets/";
import Image from "../../components/Image";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/redux-slices/UserSlice";
import axios from "axios";

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: "`calc(100% - 48px)`",
  // boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "md");

  const isHome = pathname === "/";

  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
      localStorage.removeItem("access_token");
      dispatch(logOut());
      navigate("/login");
    } catch (err) {}
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if(token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [])

  const linkStyles = {
    layout: {
      width: "70px",
      height: "19px",
      top: "40px",
      left: "1019px",
      gap: "0px",
      opacity: "0px",
    },
    typography: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#000000",
      lineHeight: "18.78px",
      textAlign: "left" as const,
    },
    color: {
      color: "#000000",
    },
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link 
            underline="none"
            href='/' style={{ textDecoration: "none" }}>
            <Image src={Logo} alt='logo' />
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          {/* {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />} */}

          {isAuthenticated ? (
            <>
              {isAuthenticated ? (
                <>
                  <Link
                    underline="none"
                    href='/'
                    style={{
                      textDecoration: "none",
                      ...linkStyles.layout,
                      ...linkStyles.typography,
                      ...linkStyles.color,
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    underline="none"
                    href='/trending'
                    style={{
                      textDecoration: "none",
                      ...linkStyles.layout,
                      ...linkStyles.typography,
                      ...linkStyles.color,
                    }}
                  >
                    Explore
                  </Link>
                  {/* <Link underline="none"
                  href='/chat' style={{ textDecoration: "none", ...linkStyles.layout, ...linkStyles.typography, ...linkStyles.color }}>Superfan Chat</Link> */}
                  <Link
                    underline="none"
                    href='/fan-profile'
                    style={{
                      textDecoration: "none",
                      ...linkStyles.layout,
                      ...linkStyles.typography,
                      ...linkStyles.color,
                    }}
                  >
                    Profile
                  </Link>
                  {/* <Link underline="none"
                  href="" onClick={handleLogOut} style={{ ...linkStyles.layout, ...linkStyles.typography, ...linkStyles.color }}>LOG OUT</Link> */}
                  <Link underline="none"
                  href=''>
                    <Button variant='text' sx={{ color: "grey.700" }} onClick={handleLogOut}>
                      LOG OUT
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link underline="none"
                  href='/login' style={{ marginRight: "10px" }}>
                    LOG IN
                  </Link>
                  {/* <Link href='/register'>SIGN UP</Link> */}
                </>
              )}
            </>
          ) : (
            <>
              <Link underline="none"
              href='/login'>LOG IN</Link>
              {/* <Link href='/register'>SIGN UP</Link> */}
            </>
          )}

          {/* {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />} */}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
