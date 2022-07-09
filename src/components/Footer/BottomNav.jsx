import React from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
// material UI imports
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WineBarIcon from '@mui/icons-material/WineBar';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import '../App/App.css';

function BottomNavBar() {

    const [value, setValue] = React.useState(0);
    return (
        <>
            <BottomNavigation
                sx={{ width: '100%', position: 'absolute', bottom: 0}}
                className='bottom-nav'
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                
            >
                <BottomNavigationAction 
                label="New Tasting"
                component={Link}
                to='/new-tasting'
                icon={<WineBarIcon />} />
                <BottomNavigationAction 
                label="Favorites"
                component={Link}
                to='/favorites'
                icon={<FavoriteIcon />} />
                <BottomNavigationAction 
                label="Wine Journal"
                component={Link}
                to='/wine-journal'
                icon={<BookmarksIcon />} />
            </BottomNavigation>
        </>
    )
}
export default BottomNavBar;