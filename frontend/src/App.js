import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import './App.css';

import PrivateRoute from './components/routing/private-route.container';
import PublicRoute from './components/routing/public-route.container';

import HomePage from './pages/public/home.page';
import UserPage from './pages/private/user.page';
import BookPage from './pages/private/book.page';
import BooksInProgressPage from './pages/private/books-in-progress.page';
import BooksAddedPage from './pages/private/books-added.page';
import BooksFinishedPage from './pages/private/books-finished.page';

import Header from './components/navigation/header.component';


function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const storeUser = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await fetch('/api/v1/users',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email })
          });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    storeUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <PrivateRoute path='/books/reading' component={BooksInProgressPage} />
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
