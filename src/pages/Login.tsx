// @mui
import { Icon } from "@iconify/react";
import {
  Button,
  Divider,
  InputBase,
  Link,
  Paper,
  Stack,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import SectionContainer from "layouts/main/SectionContainer";
import { useState, useContext } from "react";
import { z } from "zod";
import { LoginType } from "../@types/auth";
import { loginSchema } from "utils/validationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { secondaryButtonStyles } from "utils/cssStyles";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { AuthContext } from "contexts/JWTContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/redux-slices/UserSlice";
import typography from "theme/typography";
import {auth, googleProvider, facebookProvider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import axios from "axios";
import Notification from "components/Notification";


type UserType = {
  email?: string,
  password?: string
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [input, setInput] = useState<UserType | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  const from = location.state?.from || "/";
  const user = useAppSelector((state) => state.user.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // console.log(input)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitForm = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, input);
      axios.defaults.headers.common.Authorization =`Bearer ${res.data.token}`;
      localStorage.setItem("access_token", res.data.token);
      dispatch(loginSuccess(res.data.userInfo));
      setMessage("Successfully logged In");
      setShow(true)
      // setOpenSnackbar(true);
      // setSnackbarMessage(true);
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 1000)
    }catch(err: any) {
      if (!err?.response) {
        setMessage('No Server Response');
      } else {
          setMessage('Login Failed');
      }
      setShow(true);

    }
  }

  const onSubmit: SubmitHandler<LoginType> = async ({ email, password }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {email, password});
      // setOpenSnackbar(true);
      // setSnackbarMessage(true);
      // setTimeout(() => {
      //   navigate("/trending");
      // }, 10000);

      // console.log(response);
    } catch (error) {
      console.error("login failed: ", error);
      setSnackbarMessage(false);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        axios
          .post("/auth/login/social", {
            username: result.user.displayName,
            email: result.user.email,
            avatarImg: result.user.photoURL,
            loginPlatform: "Google"
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate(from, { replace: true })
          });
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const signInWithFacebook = () => {
    // signInWithPopup(auth, facebookProvider)
    //   .then((result) => {
    //     console.log(result)
    //     // axios
    //     //   .post("/auth/login/social", {
    //     //     username: result.user.displayName,
    //     //     email: result.user.email,
    //     //     avatarImg: result.user.photoURL,
    //     //     loginPlatform: "Google"
    //     //   })
    //     //   .then((res) => {
    //     //     console.log(res)
    //     //     dispatch(loginSuccess(res.data));
    //     //     navigate(from, { replace: true })
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;

    setOpenSnackbar(false);
  };

  const action = (
    <>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <Icon icon='iconoir:cancel' />
      </IconButton>
    </>
  );

  return (
    <SectionContainer>
      <Typography variant='h2' sx={{ color: "common.black" }}>
        Hello! Log in to get started
      </Typography>

      <Link underline='always' href='/register' color='rgba(253, 147, 76, 1)'>
        <Typography variant='subtitle1' sx={{ color: "orange" }}>
          create your account
        </Typography>
      </Link>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        message={snackbarMessage ? "Successfully Logged in" : "Error logging in account"}
      />

      <Stack justifyContent='center' marginInline='auto' width={{ md: "30%" }}>
      {/* onSubmit={handleSubmit(onSubmit)} */}
        <form >
          <Stack spacing={2} marginBlock={5}>
            <Paper
              elevation={0}
              component='div'
              sx={{
                p: "2px 6px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              <InputBase
                placeholder='Enter your email'
                {...register("email")}
                type='email'
                onChange={handleChange}
                inputProps={{ "aria-label": "Enter your email" }}
                sx={{
                  bgcolor: "rgba(243, 243, 243, 1)",
                  padding: "8px 10px",
                  width: "100%",
                  border: "1px solid #E8ECF4",
                  borderRadius: 1,
                }}
              />
            </Paper>
            {errors.email && (
              <span style={{ color: "red", textAlign: "left", fontSize: "5px" }}>
                {errors.email.message}
              </span>
            )}
            <Paper
              elevation={0}
              component='div'
              sx={{
                p: "2px 6px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              <InputBase
                placeholder='Password'
                {...register("password")}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                name="password"
                inputProps={{ "aria-label": "Password" }}
                sx={{
                  bgcolor: "rgba(243, 243, 243, 1)",
                  padding: "8px 10px",
                  width: "100%",
                  border: "1px solid #E8ECF4",
                  borderRadius: 1,
                }}
              />
              <Icon
                icon='fluent:eye-28-filled'
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 10, cursor: "pointer" }}
              />
            </Paper>
            {errors.password && (
              <span style={{ color: "red", textAlign: "left", fontSize: "5px" }}>
                {errors.password.message}
              </span>
            )}
            <Link href='/forgot-password' sx={{ textAlign: "right", color: "#6A707C" }}>
              Forgot password?
            </Link>
            <Button variant='contained' size='large' sx={secondaryButtonStyles} type='submit' onClick={handleSubmitForm}>
              Login
            </Button>
          </Stack>
        </form>
        <Divider>Or Login with</Divider>
        <Stack direction='row' spacing={2} justifyContent='center' marginTop={5}>
          <Button size='large' onClick={signInWithFacebook} sx={{ bgcolor: "#1877f2", paddingBlock: 2, paddingInline: 4 }}>
            <Icon icon='logos:facebook' />
          </Button>
          <Button
            size='large'
            sx={{ bgcolor: "common.white", border: "1px solid #E8ECF4", paddingInline: 4 }}
            onClick={signInWithGoogle}
          >
            <Icon icon='flat-color-icons:google' />
          </Button>
          <Button size='large' sx={{ bgcolor: "common.black", paddingInline: 4 }}>
            <Icon icon='ri:apple-fill' color='white' />
          </Button>
        </Stack>
        <Notification 
          show={show}
          setShow={setShow}
          message={message}
        />
      </Stack>
    </SectionContainer>
  );
}
