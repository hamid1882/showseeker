import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShowCard from '../compoonents/showcard';

function Search() {
  return (
    <div className="container mx-auto my-8">
      <form className="flex gap-2">
        <TextField autoFocus color="success" label="Search..." fullWidth />
        <Button variant="contained" color="inherit"  type="submit">
          Search
        </Button>
      </form>
      <ShowCard />
    </div>
  );
}

export default Search;

