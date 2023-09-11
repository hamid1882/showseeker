import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='transparent' position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">
              Home
          </Link>
            </Typography>
          <Link href="/login">
            <Button color="inherit" className="hover:bg-black/20 px-5 text-lg">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
