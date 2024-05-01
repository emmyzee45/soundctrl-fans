import { styled } from "@mui/material/styles";

type ContainerProps = {
  children: React.ReactNode;
  bgColor?: string;
};

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  overflow: "hidden",
  textAlign: "center",
  padding: theme.spacing(15, 10),
  [theme.breakpoints.down("md")]: {
    // responsive options
  },
  backgroundColor: "common.white",
}));

const SectionContainer = ({ children, bgColor }: ContainerProps) => {
  return (
    <RootStyle>
      <ContentStyle sx={{ bgcolor: `${bgColor}` }}>{children}</ContentStyle>;
    </RootStyle>
  );
};

export default SectionContainer;
