import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ShowData } from "../types";

function ShowCard({ showsData }: { showsData?: ShowData[] }) {
  function removeHtmlTags(str: string): string {
    if (str) {
      return str.replace(/<[^>]+>/g, "");
    }

    return str;
  }

  return (
    <div className="flex flex-wrap gap-2 my-5">
      {showsData && showsData.length > 0 ? (
        showsData.map((show: ShowData, idx: number) => (
          <Card key={idx} className="w-1/2 md:w-1/5 cursor-pointer h-full">
            <CardMedia
              component="img"
              src={show.poster}
              alt="Poster"
              className="h-1/3"
            />
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
    </div>
  );
}

export default ShowCard;
