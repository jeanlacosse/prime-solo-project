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
import Ratings from '../Ratings/Ratings';
import SuccessPage from '../Ratings/SuccessPage';
import HomePage from '../HomePage/HomePage';
import NewTastingForm from '../NewTasting/NewTastingForm';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

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
            path="/home"
          >
            <HomePage />
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
              // redirect to the /user page
              <Redirect to="/home" />
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
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the Landing page
              <RegisterPage />
            }
          </Route>

{/* Do i need to make a conditional for every one of my routes or can I just add in a rejectUnauthenticated right from the start of the page?? */}

          {/* <Route
          exact
          path="/appearance-rating"
          >
            <AppearanceRating />
          </Route>

          <Route
          exact
          path="/nose-rating"
          >
            <NoseRating />
          </Route>

          <Route
          exact
          path="/palate-rating"
          >
            <PalateRating />
          </Route>

          <Route
          exact
          path="/overall-rating"
          >
            <OverallRating />
          </Route>

          <Route
          exact
          path="/success-page"
          >
            <SuccessPage />
          </Route> */}

          <Route
          exact
          path="/new-tasting"
          >
            <NewTastingForm />
          </Route>

          {/* <Route
          exact
          path="/wine-journal"
          >
            <WineJournalList />
          </Route>


          <Route
          exact
          path="/tasting-tips"
          >
            <TastingTipsList />
          </Route> */}

            {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404 PAge Not Found</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
