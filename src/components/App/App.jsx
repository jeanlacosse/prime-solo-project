import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// imported components/links
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import BottomNavBar from '../Footer/BottomNav';
// new wine tasting form and ratings
import NewTastingForm from '../NewTasting/NewTastingForm';
import AppearanceRating from '../NewTasting/AppearanceRating';
import NoseRating from '../NewTasting/NoseRating';
import PalateRating from '../NewTasting/PalateRating';
import OverallRating from '../NewTasting/OverallRating';
// review and success pages
import ReveiwPage from '../ReviewPage/ReviewPage';
import SuccessPage from '../ReviewPage/SuccessPage';
// wine journal
import WineJournal from '../WineJournal/WineJournal';
// favorites page
import Favorites from '../WineJournal/Favorites';
// tips pages
import TastingTipsList from '../TastingTips/TastingTipsList';
import AppearanceTips from '../TastingTips/AppearanceTips';
import NoseTips from '../TastingTips/NoseTips';
import PalateTips from '../TastingTips/PalateTips';
import OverallTips from '../TastingTips/OverallTips';

// styling
// Wrap whole app in theme and will give entire app access to that theme
// override default theme props from MUI
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#a64141',
      },
      secondary: {
        main: '#41a6a6',
      },
    },
})

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const wineDetail = useSelector(store => store.wineInfoReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/wine-journal" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows HomePage else shows LoginPage
              exact
              path="/wine-journal"
            >
              <WineJournal />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /wine-journal page
                <Redirect to="/wine-journal" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /wine-journal page
                <Redirect to="/wine-journal" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/wine-journal"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /wine-journal page
                <Redirect to="/wine-journal" />
                :
                // Otherwise, show the Landing page
                <RegisterPage />
              }
            </Route>

            {/* Do i need to make a conditional for every one of my routes or can I just add in a rejectUnauthenticated right from the start of the page?? */}

            {/* this route will be for any numbers after the push to /appearance-rating b/c not exact */}
            {/* turn all into protected route */}
            <Route
              // exact
              path="/appearance-rating/:id"
            >
              <AppearanceRating />
            </Route>

            <Route
              exact
              path="/nose-rating/:id"
            >
              <NoseRating />
            </Route>

            <Route
              exact
              path="/palate-rating/:id"
            >
              <PalateRating />
            </Route>

            <Route
              exact
              path="/overall-rating/:id"
            >
              <OverallRating />
            </Route>

            <Route
              exact
              path="/review-page/:id"
            >
              <ReveiwPage />
            </Route>

            <Route
              exact
              path="/success-page/:id"
            >
              <SuccessPage />
            </Route>

            <ProtectedRoute
              exact
              path="/new-tasting"
            >
              <NewTastingForm />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/wine-journal"
            >
              <WineJournal />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/favorites"
            >
              <Favorites />
            </ProtectedRoute>


            <ProtectedRoute
              exact
              path="/tasting-tips"
            >
              <TastingTipsList />
            </ProtectedRoute>

            <Route
              exact
              path="/appearance-tips"
            >
              <AppearanceTips />
            </Route>

            <Route
              exact
              path="/nose-tips"
            >
              <NoseTips />
            </Route>

            <Route
              exact
              path="/palate-tips"
            >
              <PalateTips />
            </Route>

            <Route
              exact
              path="/overall-tips"
            >
              <OverallTips />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404 Page Not Found</h1>
            </Route>
          </Switch>
          <BottomNavBar />
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
