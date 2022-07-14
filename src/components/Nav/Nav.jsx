import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// material ui
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 80,
  },
}));



const ITEM_HEIGHT = 48;

function Nav() {
  // Mui functionality
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((store) => store.user);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <StyledToolbar>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-end', marginLeft: '25px', fontSize: '60px' }}

            >
              <Link to="/wine-journal">
              <h1 className="nav-title" key="journallink">
              Tasting Room</h1>
              </Link>

            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {!user.id && (
                // If there's no user, show login/registration links
                <MenuItem onClick={handleClose} key='login'>
                  <Link className="navLink" to="/login">
                    Login / Register
                  </Link>
                </MenuItem>
              )}
              {/* If a user is logged in, show these links */}
              {user.id && (
                <div>
                  <MenuItem onClick={handleClose} key='journal'>
                    <Link className="navLink" to="/wine-journal">
                      Home
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} key='tasting'>
                    <Link className="navLink" to="/new-tasting">
                      New Tasting
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} key='tips'>
                    <Link className="navLink" to="/tasting-tips">
                      Wine Tasting Tips
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} key='logout'>
                    <LogOutButton className="navLink" />
                  </MenuItem>
                </div>
              )}
              <MenuItem onClick={handleClose} key='about'>
                <Link className="navLink" to="/about">
                  About
                </Link>
              </MenuItem>

            </Menu>


          </StyledToolbar>
        </AppBar>
      </Box>
    </>

  );
}

export default Nav;
