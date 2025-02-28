import React, { useState, useEffect } from 'react';
import './App.css';
import { getFactCheckResults } from './services/api';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'FACT_CHECK_RESULTS') {
        setResults(message.data);
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>FactCheck</h1>
      </header>
      <main>
        {loading ? (
          <p>Checking facts...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : results ? (
          <div className="results">
            <h2>Fact Check Results</h2>
            <p>Reliability Score: {results.score}%</p>
            <p>Source: {results.source}</p>
            {results.summary && <p>{results.summary}</p>}
          </div>
        ) : (
          <p>Select text on social media to fact check it.</p>
        )}
      </main>
    </div>
  );
}

export default App;
