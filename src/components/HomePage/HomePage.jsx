import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function HomePage() {
    return (

        <>
        {/* links to each part of the site from homepage */}
       <Link to="/new-tasting">
       Start a New Tasting
       </Link>

       <Link to="/wine-journal">
       View My Wine Journal
       </Link>

       <Link to="/tasting-tips">
       Wine Tasting Tips
       </Link>
        </>
    );
};

export default HomePage;