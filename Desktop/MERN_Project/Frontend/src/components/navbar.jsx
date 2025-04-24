import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ px: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lost & Found Portal
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button onClick={() => navigate('/home')} color="inherit">Home</Button>
          <Button onClick={() => navigate('/report')} color="inherit">Report Item</Button>
          <Button onClick={() => navigate('/user-reports')} color="inherit">My Reports</Button>
        </Box>

        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          color="inherit"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          <MenuItem onClick={handleMenuClose}>Report Item</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Reports</MenuItem>
        </Menu>

        <Avatar sx={{ ml: 2 }}>U</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
