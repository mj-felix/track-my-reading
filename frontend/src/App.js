import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import logo from './logo.svg';
import './App.css';

import AuthenticationButton from "./components/authentication-button.component";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const [apiResponse, setApiResponse] = useState(null);

  const testApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await fetch('/api/v1/books',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      setApiResponse(JSON.stringify(data));
    } catch (err) {
      setApiResponse(JSON.stringify(err));
    }
  };

  const storeUser = async () => {
    if (isAuthenticated) {
      await console.log('Making API call to store user if it does not exist');
    } else {
      console.log('Logged out');
    }
  };

  useEffect(() => {
    storeUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TrackMyReading by MJ Felix is coming ...
        </p>
        {isLoading ? 'Loading ...' :
          <p>
            <AuthenticationButton />
            <br />
            <button onClick={testApi}>Test API</button>
          </p>
        }
      </header>
      <main>
        {user &&
          <JSONPretty style={{ textAlign: 'left' }} data={user}></JSONPretty>
        }
        {apiResponse &&
          <JSONPretty style={{ textAlign: 'left' }} data={apiResponse}></JSONPretty>
        }
      </main>
    </div >
  );
}

export default App;
