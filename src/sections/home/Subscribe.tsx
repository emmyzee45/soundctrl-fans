// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Container, Typography, Paper, InputBase } from "@mui/material";
import { useState } from "react";
import { makeRequest } from "utils/axios";
// components

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(2, 0),
  backgroundColor: "rgba(248, 248, 248, 1)",
}));

// ----------------------------------------------------------------------

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = async() => {
    try {
      const res = await makeRequest.post("/users/news", {email});
      res.status === 200 && console.log(res.data)
    }catch(err) {

    }
  }
  return (
    <Container>
      <ContentStyle>
        <Box sx={{ p: 10 }}>
          <Typography variant='h3' sx={{ fontWeight: "400" }}>
            Join our newsletter to hear first about new artist, merch, and exclusive content.
          </Typography>
          <Paper
            elevation={0}
            component='form'
            sx={{
              p: "2px 6px",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", md: "65%" },
              position: "relative",
            }}
          >
            <InputBase
              placeholder=''
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ "aria-label": "Subscribe" }}
              sx={{
                bgcolor: "common.white",
                padding: "6px 10px",
              }}
            />

            <Button
              variant='contained'
              sx={{
                bgcolor: "common.black",
                color: "common.white",
                borderRadius: 1,
                width: { xs: "unset", md: "20%" },
                position: "absolute",
                right: 0,
                textTransform: "uppercase",
                boxShadow: "none",
                ":hover": {
                  bgcolor: "common.black",
                  color: "rgba(253, 147, 76, 1)",
                },
              }}
              onClick={handleSubmit}
              size='large'
            >
              Subscribe
            </Button>
          </Paper>
        </Box>
      </ContentStyle>
    </Container>
  );
}
