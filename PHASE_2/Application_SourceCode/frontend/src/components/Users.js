import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Resets Error and Users on start
        setError(null);
        setResults(null);
        // toggle loading true
        setLoading(true);
        const response = await axios.get(
          'https://asia-northeast1-seng3011-api.cloudfunctions.net/report?start_date=2018-01-01T00%3A00%3A00&end_date=2020-01-13T00%3A00%3A00'
        );
        setResults(response.data); // data in response.data
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>There was an error</div>;
  if (!results) return null;
  return (
    <ul>
      {results.map(result => (
        <li key={result.url}>
          {result.headline}=>({result.url})
        </li>
      ))}
    </ul>
  );
}

export default Users;