// @mui

import { styled } from "@mui/material/styles";

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  padding: theme.spacing(10, 10),
  backgroundColor: "black",
  height: "40vh",
}));

export default function FanProfileHero() {
  return <ContentStyle></ContentStyle>;
}
