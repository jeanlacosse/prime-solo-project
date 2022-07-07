import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HomePage() {
    return (

        <>
            {/* links to each part of the site from homepage */}
            <button>
                <Link to="/new-tasting">
                    Start a New Tasting
                </Link>
            </button>

            <button>
                <Link to="/wine-journal">
                    View My Wine Journal
                </Link>
            </button>

            <button>
                <Link to="/tasting-tips">
                    Wine Tasting Tips
                </Link>
            </button>

            <button>
                <Link to="/favorites">
                    Favorited Wines
                </Link>
            </button>
        </>
    );
};

export default HomePage;