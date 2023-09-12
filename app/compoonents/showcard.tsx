import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ShowData } from "../types";
import Masonry from "react-masonry-css";

function ShowCard({ showsData }: { showsData?: ShowData[] }) {
  function removeHtmlTags(str: string): string {
    if (str) {
      return str.replace(/<[^>]+>/g, "");
    }

    return str;
  }

  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      }}
      className="flex gap-4"
    >
      {showsData && showsData.length > 0 ? (
        showsData.map((show: ShowData, idx: number) => (
          <Card key={idx} className="cursor-pointer h-fit my-4">
            <CardMedia component="img" src={show.poster} alt="Poster" />
            <CardContent>
              <Typography variant="h5" component="div">
                {show.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-2 line-clamp-4"
              >
                {removeHtmlTags(show.summary)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Type:</strong> {show.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Language:</strong> {show.language}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong> {show.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Schedule:</strong> Time: {show.schedule.time} Day:{" "}
                {show.schedule.days.join(" ")}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No Shows Available! Search for other shows...</p>
      )}
    </Masonry>
  );
}

export default ShowCard;
