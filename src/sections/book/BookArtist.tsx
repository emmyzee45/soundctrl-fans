// @mui
import { Button, Typography, Stack, Link } from "@mui/material";
import SectionContainer from "layouts/main/SectionContainer";
import { useParams } from "react-router-dom";

export default function BookArtist() {
  const { id } = useParams();

  return (
    <SectionContainer>
      <Stack direction={{ xs: "column", md: "row" }} justifyContent='space-between'>
        <Stack spacing={2}>
          <Typography variant='h2' sx={{ color: "common.black" }}>
            Book Time
          </Typography>
          <Link href={`/book-time/${id}`}>
            <Stack spacing={2}>
              <Button variant='outlined' sx={{ color: "common.black", borderColor: "common.black" }}>
                Enter
              </Button>
            </Stack>
          </Link>
        </Stack>
        <Typography variant='h3' sx={{ color: "common.black", width: "35ch", fontWeight: 400 }}>
          Experience a private one on one video conversation with your favorite artist.
        </Typography>
      </Stack>
    </SectionContainer>
  );
}
