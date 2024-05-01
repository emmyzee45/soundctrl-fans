// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Stack,
  Paper,
  InputBase,
  Button,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { User } from "assets";
import { Icon } from "@iconify/react";
import { FileProps, UserProps } from "@types";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateFailure, updateStart, updateSuccess } from "../../redux/redux-slices/UserSlice";
import axios from "axios";
import Notification from "components/Notification";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 0),
}));

export default function ProfileSettings(user: UserProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(user.country);
  const [tiktok, setTiktok] = useState(user.tiktok);
  const [apple, setApple] = useState(user.apple);
  const [spotify, setSpotify] = useState(user.spotify);
  const [twitter, setTwitter] = useState(user.twitter);
  const [instagram, setInstagram] = useState(user.instagram);
  const [phone, setPhone] = useState(user.phone);
  const [birthday, setBirthday] = useState(user.birthday);
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const [bannerImg, setBannerImg] = useState<File | null>(null);
  const [file, setFile] = useState<FileProps>();
  const [avatarUrl, setAvatarUrl] = useState<String | null>(null);
  const [bannerUrl, setBannerUrl] = useState<String | null>(null);
  const [desc, setDesc] = useState(user.desc);
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if(selectedFile) {
      setAvatarImg(selectedFile);
    }
  }

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if(selected) {
      setBannerImg(selected)
    }
  }

   const uploadFile = (file: File, img: string) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // setImg(downloadURL)
              // const product: FileProps = {[img]: downloadURL };
              setFile((prev) => ({...prev, [img]: downloadURL}))
            //   addProduct(product, dispatch);
            });
          }
        );
      };

  useEffect(() => {
    if(avatarImg) uploadFile(avatarImg, "avatarImg")
  }, [avatarImg])

  useEffect(() => {
    if(bannerImg) uploadFile(bannerImg, "bannerImg")
  }, [bannerImg])

  useEffect(() => {
    if(avatarImg) {
      setAvatarUrl(URL.createObjectURL(avatarImg))
    }
  },[avatarImg]);

  useEffect(() => {
    if(bannerImg) {
      setBannerUrl(URL.createObjectURL(bannerImg));
    }
  }, [bannerImg]);

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const input = {...file, username, email, twitter, tiktok, instagram, spotify, country, phone, apple, birthday, desc}
    dispatch(updateStart())
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${currentUser?._id}`, input);
      setShow(true);
      setMessage("Record successfully updated!");
      dispatch(updateSuccess(res.data));
    }catch(err: any) {
      if(!err.response) {
        setMessage("No server response!")
      } else if (err.response.status === 401 || err.response.status === 403) {
        setMessage("Session expired! Login");
        setShow(true);
        setTimeout(() => {
          navigate("/login", 
          {state: {from: "/fans-settings"}, replace: true }
          )
        }, 1000)
      } else {
        setMessage("Internal server error!")
      }
      setShow(true)
      dispatch(updateFailure())
    }
  }

  return ( 
    <ContentStyle>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
        <Stack spacing={3} sx={{ width: "50%" }}>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Nickname'
              onChange={(e)=>setUsername(e.target.value)}
              value={username}
              inputProps={{ "aria-label": "Nickname" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",
                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Bio'
              onChange={(e)=>setDesc(e.target.value)}
              value={desc}
              inputProps={{ "aria-label": "Bio" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",
                width: "100%",
                height: 200,
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              // placeholder='Birthday'
              onChange={(e)=>setBirthday(e.target.value)}
              value={birthday}
              inputProps={{ "aria-label": "Birthday" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Find location'
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              inputProps={{ "aria-label": "Find location" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Phone Number'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              inputProps={{ "aria-label": "Phone Number" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",
                width: "100%",
              }}
            />
          </Paper>
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              size='large'
              sx={{
                color: "common.white",
                bgcolor: "common.black",
                borderRadius: 1,
                boxShadow: "none",
              }}
            >
              Go to profile
            </Button>
            <Button
              variant='contained'
              size='large'
              onClick={handleSubmit}
              sx={{
                color: "common.white",
                bgcolor: "common.black",
                borderRadius: 1,
                boxShadow: "none",
              }}
            >
              Save changes
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Stack direction='row' spacing={2}>
            <label htmlFor="avatar">
              {avatarUrl ? (
                <Avatar  src={avatarUrl.toString()} alt='user avatar' sx={{ borderRadius: 1, width: 65, height: 65 }} />
              ):(
                <Avatar  src={user.avatarImg} alt='user avatar' sx={{ borderRadius: 1, width: 65, height: 65 }} />
              )}
            </label>
              <input
                hidden
                type="file"
                name="avatarImg"
                id="avatar"
                onChange={handleFileChange}
                // accept="image/png, image/jpeg image/jpg"
              />
            <Stack spacing={1}>
              <Typography variant='subtitle2'>Avatar</Typography>
              <Typography variant='subtitle2' sx={{ width: "35ch" }}>
                Sound supports.jpg, .png, and . gif files up to 10MB. Recommended size is 600 x
                600px
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2}>
            <label htmlFor="banner">
              {bannerUrl ? (
                <Avatar src={bannerUrl.toString()} alt='banner image' sx={{ borderRadius: 1, width: 65, height: 65 }} />
              ) : user.bannerImg ? (
                <Avatar src={user.bannerImg} alt='banner image' sx={{ borderRadius: 1, width: 65, height: 65 }} />
              ) : (
                <IconButton
                  sx={{
                    bgcolor: "rgba(34, 34, 34, 1)",
                    borderRadius: 2,
                    padding: 2,
                    width: 65,
                    height: 65,
                  }}
                  >
                  <Icon icon='ic:round-plus' color='white' />
                </IconButton>
              )}
            </label>
            <input
                hidden
                type="file"
                name="bannerImg"
                id="banner"
                onChange={handleBannerChange}
                // accept="image/png, image/jpeg image/jpg"
              />
            <Stack spacing={1}>
              <Typography variant='subtitle2'>Banner</Typography>
              <Typography variant='subtitle2' sx={{ width: "35ch" }}>
                Sound supports.jpg, .png, and . gif files up to 10MB. Recommended size is 600 x
                600px
              </Typography>
            </Stack>
          </Stack>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Instagram'
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
              inputProps={{ "aria-label": "Instagram" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Twitter'
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
              inputProps={{ "aria-label": "Twitter" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Spotify'
              onChange={(e) => setSpotify(e.target.value)}
              value={spotify}
              inputProps={{ "aria-label": "Spotify" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Apple music'
              value={apple}
              onChange={(e) => setApple(e.target.value)}
              inputProps={{ "aria-label": "Apple music" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <InputBase
              placeholder='Tiktok'
              onChange={(e) => setTiktok(e.target.value)}
              value={tiktok}
              inputProps={{ "aria-label": "Tiktok" }}
              sx={{
                bgcolor: "rgba(243, 243, 243, 1)",
                padding: "8px 10px",

                width: "100%",
              }}
            />
          </Paper>
        </Stack>
        <Notification 
          show={show}
          setShow={setShow}
          message={message}
        />
      </Stack>
    </ContentStyle>
  );
}
