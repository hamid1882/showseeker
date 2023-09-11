import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ShowCard() {
  return (
    <div className="flex flex-wrap gap-2 my-5">
      <Card className="w-1/2 md:w-1/4 cursor-pointer">
        <CardMedia
          component="img"
          height="140"
          image="https://m.media-amazon.com/images/I/71NrBrNP+iL.jpg"
          alt="Poster"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: TV Show
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Language: English
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShowCard;

