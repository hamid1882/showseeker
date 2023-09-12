"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ShowCard from "../compoonents/showcard";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ShowData } from "../types";

function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showsData, setShowsData] = useState([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const inputValue = event.target.elements.title.value;

    if (!inputValue) {
      setError("Please enter a search query");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    await fetchShows(inputValue);
    setLoading(false);
  };

  const fetchShows = async (inputValue: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/search?title=${inputValue}&timestamp=${Date.now()}`,
        {
          headers: {
            "jwt-token": token,
            "Cache-Control": "no-cache", // Disable cache
          },
        }
      );

      if (response.data.length <= 0) {
        setError("No shows found");
        setOpenSnackbar(true);
      }

      // Handle the response data here
      const parsedData: ShowData[] = dataParser(response.data);
      // @ts-ignore
      setShowsData(parsedData);
    } catch (error: any) {
      const { message }: { message: string } = error.response.data;
      setError(message);
      setOpenSnackbar(true);
    }
  };

  const dataParser = (data: any) => {
    return data.map(({ show }: { show: ShowData }) => ({
      poster: show.image
        ? show.image.medium
        : "https://variety.com/wp-content/uploads/2020/12/Streaming-Movies-TV-Placeholder.jpg?w=1000",
      name: show.name,
      summary: show.summary,
      type: show.type,
      language: show.language,
      genres: show.genres,
      status: show.status,
      schedule: show.schedule,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="container mx-auto my-8">
      <form onSubmit={onSubmit} className="flex gap-2">
        <TextField
          autoFocus
          color="success"
          label="Search..."
          fullWidth
          name="title"
        />
        <Button variant="contained" color="inherit" type="submit">
          Search
        </Button>
      </form>
      <ShowCard showsData={showsData} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        color="primary"
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      {loading && <CircularProgress />}
    </div>
  );
}

export default Search;
