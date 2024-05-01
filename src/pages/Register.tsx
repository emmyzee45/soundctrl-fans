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
  Snackbar,
  IconButton,
} from "@mui/material";
import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionContainer from "layouts/main/SectionContainer";
import { RegisterType } from "../@types/auth";
import { registerSchema } from "utils/validationSchema";
import { secondaryButtonStyles } from "utils/cssStyles";
import { AuthContext } from "contexts/JWTContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  const onSubmit: SubmitHandler<RegisterType> = async ({ username, email, password }) => {
    try {
      // const response = await authContext?.register(username, email, password);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, {username, email, password})
      setOpenSnackbar(true);
      setSnackbarMessage(true);
      navigate("/login");

    } catch (error) {
      console.error("registeration failed:", error);
      setSnackbarMessage(false);
    }
  };

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
        Hello! Register to get started
      </Typography>

      <Link underline='always' href='/login' color='rgba(253, 147, 76, 1)'>
        <Typography variant='subtitle1' sx={{ color: "orange" }}>
          log in now
        </Typography>
      </Link>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        message={
          snackbarMessage ? "Successfully register, Please Login" : "Error registering account"
        }
      />

      <Stack justifyContent='center' marginInline='auto' width={{ md: "30%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder='Username'
                type='text'
                // onChange={handleChange}
                {...register("username")}
                inputProps={{ "aria-label": "Username" }}
                sx={{
                  bgcolor: "rgba(243, 243, 243, 1)",
                  padding: "8px 10px",
                  width: "100%",
                  border: "1px solid #E8ECF4",
                  borderRadius: 1,
                }}
              />
            </Paper>
            {errors.username && (
              <span style={{ color: "red", textAlign: "left", fontSize: "5px" }}>
                {errors.username.message}
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
                placeholder='Enter your email'
                type='email'
                // onChange={handleChange}
                {...register("email")}
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
                type={showPassword ? "text" : "password"}
                // name="password"
                // onChange={handleChange}
                {...register("password")}
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
                placeholder='Confirm Password'
                type={showPassword ? "text" : "password"}
                // name="confirmPassword"
                {...register("confirmPassword")}
                inputProps={{ "aria-label": "Confirm Password" }}
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
            <Button type='submit' variant='contained' size='large' sx={secondaryButtonStyles}>
              Register
            </Button>
          </Stack>
        </form>
        <Divider>Or Register with</Divider>
        <Stack direction='row' spacing={2} justifyContent='center' marginTop={5}>
          <Button size='large' sx={{ bgcolor: "#1877f2", paddingBlock: 2, paddingInline: 4 }}>
            <Icon icon='logos:facebook' />
          </Button>
          <Button
            size='large'
            sx={{ bgcolor: "common.white", border: "1px solid #E8ECF4", paddingInline: 4 }}
          >
            <Icon icon='flat-color-icons:google' />
          </Button>
          <Button size='large' sx={{ bgcolor: "common.black", paddingInline: 4 }}>
            <Icon icon='ri:apple-fill' color='white' />
          </Button>
        </Stack>
      </Stack>
    </SectionContainer>
  );
}
