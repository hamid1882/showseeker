"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

function TopBar() {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if(typeof window !== undefined) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='transparent' position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              Home
            </Link>
          </Typography>
          {token ? (
            <Button color="inherit" className="hover:bg-black/20 px-5 text-lg" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button color="inherit" className="hover:bg-black/20 px-5 text-lg">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
