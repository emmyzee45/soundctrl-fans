// @mui
import { Icon } from "@iconify/react";
import { Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserProps } from "@types";
import { User } from "assets";
import Avatar from "components/Avatar";
import { Link } from "react-router-dom";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",

  padding: theme.spacing(10, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

export default function ProfileSummary(user: UserProps) {
  return (
    <ContentStyle>
      <Stack direction='row' justifyContent='space-between'>
        <Stack spacing={2} sx={{ position: "relative" }}>
          <Avatar
            src={user.avatarImg}
            alt='user avatar'
            sx={{ position: "absolute", top: -120, height: 75, width: 75, borderRadius: 0 }}
          />
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h4' sx={{ fontWeight: 400 }}>
              @{user.username}
            </Typography>
            <Link to="/fan-settings">
              <Button
                variant='outlined'
                size='small'
                sx={{ borderColor: "common.black", color: "common.black" }}
                >
                Edit
              </Button>
            </Link>
          </Stack>
          <Typography variant='subtitle2' sx={{ width: "50ch" }}>
            {user.desc}
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1}>
            <Typography variant='h3' sx={{ fontWeight: 700 }}>
              {user.points}
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 400 }}>
              fan experience points
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1} justifyContent='flex-end'>
            <Icon icon='mdi:twitter' height={20} width={20} />
            <Icon icon='ri:instagram-fill' height={20} width={20} />
            <Icon icon='ic:baseline-discord' height={20} width={20} />
          </Stack>
        </Stack>
      </Stack>
    </ContentStyle>
  );
}
