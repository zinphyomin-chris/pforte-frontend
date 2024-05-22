// import Link from 'next/link';

// export default function Nav() {
//   return (
//     <ul className="mt-3">
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/">Home</Link></li>
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/products">Products</Link></li>
//       <li className="my-1"><Link className="hover:bg-gray-500" href="/products/create">Create product</Link></li>
//     </ul>
//   );
// }
"use client";

import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import AuthStatus from './authStatus-bk';

async function keycloakSessionLogOut() {
  try {
    const response = await fetch(`/api/auth/logout`, { method: "POST" });
    if (!response.ok) {
      throw new Error(`Logout API failed with status: ${response.status}`);
    }
    console.log("Successfully logged out from Keycloak"); // Optional logging
    signOut({ callbackUrl: "/" });
  } catch (err) {
    console.error("Error during logout:", err);
  }
}

const pages = ['page'];
const settings = ['Profile', 'About Us', 'Logout'];

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (key) => {
    setAnchorElUser(null);
    const functionMap = {
      // 'Profile': function1,
      // 'About Us': function2,
      'Logout': keycloakSessionLogOut,
    };

    const functionToCall = functionMap[key];
    if (functionToCall) {
      functionToCall();
    } else {
      console.warn(`Function not found for key: ${key}`); // Handle potentially missing functions
    }
  };

  function AuthStatus() {
    const { data: session, status } = useSession();

    useEffect(() => {

      if (
        status != "loading" &&
        session &&
        session?.error === "RefreshAccessTokenError"
      ) {
        signOut({ callbackUrl: "/" });
      }
    }, [session, status]);


    if (status == "loading") {
      return <div className="my-3">Loading...</div>;
    } else if (session) {
      return (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <div onClick={handleOpenUserMenu} style={{ padding: '8px', cursor: 'pointer', borderRadius: '4px', backgroundColor: '', display: 'inline-block', alignItems: 'center' }}>
              <Typography variant="h6" className="text-blue-50">
                {session.user.name}
              </Typography>
              {session.roles.filter(role => ['admin', 'teacher', 'student'].includes(role)).map(role => (
                <Typography key={role} variant="body2" className="text-blue-50" align="right">
                  {role}
                </Typography>
              ))}
            </div>
          </Tooltip>
          <Menu
            sx={{ mt: '45px', position: 'fixed' }}
            id="menu-appbar"
            // anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

      );
    }

    return (
      <div className="my-3">
        Not logged in.{" "}
        <button
          className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50"
          onClick={() => signIn("keycloak")}>
          Log in
        </button>
      </div>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pforte`
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Pforte`
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <AuthStatus />

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;