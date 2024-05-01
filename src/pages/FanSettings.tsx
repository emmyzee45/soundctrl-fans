// @mui
import { Typography, Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { ProfileSettings, Subscriptions, Notifications } from "sections/fan-settings";
import { useNavigate } from "react-router-dom";

// sections

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(10, 10),
  backgroundColor: theme.palette.background.default,
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

export default function FanSettings() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.currentUser);
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);

  useEffect(() => {
    if(!isAuthenticated) {
      navigate("/login", { state: { from: "/fan-settings" }, replace: true });
    }
  },[])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <RootStyle>
      <Typography variant='h2' sx={{ textTransform: "uppercase", color: "common.black" }}>
        Settings
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='settings tab'
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgba(253, 147, 76, .8)",
              height: "1rem",
              marginBottom: ".5rem",
            },
          }}
        >
          <Tab label='Profile' {...a11yProps(0)} />
          <Tab label='Notifications' {...a11yProps(1)} />
          <Tab label='Subscription' {...a11yProps(2)} />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
          <ProfileSettings 
            desc={user?.desc}
            username={user?.username}
            points={user?.points} 
            avatarImg={user?.avatarImg}
            birthday={user?.birthday}
            twitter={user?.twitter}
            instagram={user?.instagram}
            spotify={user?.spotify}
            apple={user?.apple}
            tiktok={user?.tiktok}
            country={user?.country}
            bannerImg={user?.bannerImg}
            phone={user?.phone}

            _id=""
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Notifications />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Subscriptions />
        </CustomTabPanel>
      </Box>
    </RootStyle>
  );
}
