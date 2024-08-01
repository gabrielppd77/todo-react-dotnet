import React from "react";

import useAuth from "@hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";

export default function MainLayout() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setToken("");
    navigate("/");
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo Project
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
