import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import logo from './logo.svg';
import './App.css';

import AuthenticationButton from "./components/authentication-button.component";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { isLoading } = useAuth0();

  const [apiResponse, setApiResponse] = useState(null);

  const testApi = async () => {
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
  };

  useEffect(() => {

  }, []);

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
            {isAuthenticated &&
              <button onClick={testApi}>Test API</button>
            }
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
