import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

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
  const forceLogout = useSelector(state => state.auth.forceLogout);
  const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0();

  const storeUser = async () => {
    const token = await getAccessTokenSilently();
    dispatch(storeToken(token));
    dispatch(upsertUser(user.email));
  };

  useEffect(() => {
    if (isAuthenticated) {
      storeUser();
    }
    if (forceLogout) {
      logout({
        returnTo: window.location.origin,
      });
    }
    // eslint-disable-next-line
  }, [isAuthenticated, forceLogout]);

  return (
    <>
      <Header />
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
    </>
  );
}

export default App;
