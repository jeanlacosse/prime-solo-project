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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 80,
  },
}));

function Nav() {
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
              sx={{ flexGrow: 1, alignSelf: 'flex-end', marginLeft: '25px' }}

            >
              <Link to="/wine-journal"><h2 className="nav-title">Sip Central</h2></Link>

            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <Popup
                trigger={<MenuIcon />}
                modal>
                <div>
                  {/* If no user is logged in, show these links */}
                  {!user.id && (
                    // If there's no user, show login/registration links
                    <Link className="navLink" to="/login">
                      Login / Register
                    </Link>
                  )}

                  {/* If a user is logged in, show these links */}
                  {user.id && (
                    <>
                      <div>
                        <Link className="navLink" to="/wine-journal">
                          Home
                        </Link>
                      </div>
                      <div>
                        <Link className="navLink" to="/new-tasting">
                          Start a New Tasting
                        </Link>
                      </div>
                      <div>
                        <Link className="navLink" to="/tasting-tips">
                          Wine Tasting Tips
                        </Link>
                      </div>
                      <div>
                      <LogOutButton className="navLink" />
                      </div>
                    </>
                  )}
                  <div>
                    <Link className="navLink" to="/about">
                      About
                    </Link>
                  </div>
                </div>
              </Popup>
            </IconButton>

          </StyledToolbar>
        </AppBar>
      </Box>
    </>
    // <div className="nav">
    //   <Link to="/wine-journal">
    //     <h2 className="nav-title">Sip Central</h2>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */}
    //     {!user.id && (
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     )}

    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>

    //         <Link className="navLink" to="/wine-journal">
    //           Home
    //         </Link>

    //         <Link className="navLink" to="/new-tasting">
    //           Start a New Tasting
    //         </Link>

    //         <Link className="navLink" to="/tasting-tips">
    //           Wine Tasting Tips
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div>
  );
}

export default Nav;
