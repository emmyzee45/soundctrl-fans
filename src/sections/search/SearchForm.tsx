import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Typography, Paper, InputBase, Button } from "@mui/material";
import React, { useState } from "react";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(25, 10),
  backgroundColor: "rgba(248, 248, 248, 1)",
  margin: "auto",
  overflow: "hidden",
}));

interface SearchFormProps {
  onSearch: (query: string) => void; 
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery); 
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <RootStyle>
      <Typography
        variant='h3'
        sx={{
          color: "common.black",
          width: "16ch",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontFamily: "Dela Gothic One, cursive",
        }}
      >
        Search for your favorite artist
      </Typography>
      <Paper
        elevation={0}
        component='form'
        onSubmit={handleSubmit}
        sx={{
          p: "2px 6px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          marginTop: "20px",
        }}
      >
        <Icon icon='bi:search' color='#000' width='20' height='20' />
        <InputBase
          placeholder='Search'
          inputProps={{ "aria-label": "Search" }}
          sx={{
            bgcolor: "common.white",
            padding: "6px 15px",
            flex: 1,
          }}
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" sx={{ ml: 1 }}>Search</Button>
      </Paper>
    </RootStyle>
  );
};

export default SearchForm;
