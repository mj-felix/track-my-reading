import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import PrivateRoute from './components/routing/private-route.container';
import PublicRoute from './components/routing/public-route.container';

import HomePage from './pages/public/home.page';
import UserPage from './pages/private/user.page';
import BookPage from './pages/private/book.page';
import BooksReadingPage from './pages/private/books-reading.page';
import BooksAddedPage from './pages/private/books-added.page';
import BooksFinishedPage from './pages/private/books-finished.page';

import Header from './components/navigation/header.component';

import { storeToken, upsertUser } from './redux/actions/auth.actions';


function App() {
  const dispatch = useDispatch();
  const performLogout = useSelector(state => state.auth.performLogout);
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();

  const storeUser = async () => {
    const token = await getAccessTokenSilently();
    dispatch(storeToken(token));
    await dispatch(upsertUser(user.email));
  };

  useEffect(() => {
    if (isAuthenticated) {
      storeUser();
    }
    if (performLogout) {
      logout({
        returnTo: window.location.origin,
      });
    }
    // eslint-disable-next-line
  }, [isAuthenticated, performLogout]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth='md'>
        <main>
          <Switch>
            <PrivateRoute path='/books/reading' component={BooksReadingPage} />
            <PrivateRoute path='/books/added' component={BooksAddedPage} />
            <PrivateRoute path='/books/finished' component={BooksFinishedPage} />
            <PrivateRoute path='/books/:id' component={BookPage} />
            <PrivateRoute path='/user' component={UserPage} />
            <PublicRoute path='/' component={HomePage} />
          </Switch>
        </main>
      </Container>
    </>
  );
}

export default App;
