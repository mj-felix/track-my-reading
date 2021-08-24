import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState(null);

  const fetchBooks = async () => {
    const response = await fetch('/api/v1/books');
    const data = await response.json();
    console.log(data);
    setApiResponse(JSON.stringify(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TrackMyReading by MJ Felix is coming ...
        </p>
      </header>
      <main>
        {apiResponse &&
          <JSONPretty style={{ textAlign: 'left' }} data={apiResponse}></JSONPretty>
        }
      </main>
    </div >
  );
}

export default App;
