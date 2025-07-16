import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/DataDictionaryPage.css';

const DataDictionaryPage = () => {
  const [dictionary, setDictionary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/datamodel/dictionary')
      .then((res) => res.json())
      .then((data) => setDictionary(data))
      .catch((err) => console.error('Failed to fetch data dictionary:', err));
  }, []);

  return (
    <div className="data-dictionary-page">
      <h1>Data Dictionary</h1>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
        <button onClick={() => navigate('/as/notify-change')}>Notify Change</button>
        <button onClick={() => navigate('/data-model')}>Logical Model</button>
      </div>

      <table className="dictionary-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Type</th>
            <th>Length</th>
            <th>Format</th>
            <th>Allowed Values</th>
          </tr>
        </thead>
        <tbody>
          {dictionary.map((entry) => (
            <tr key={entry.name}>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td>{entry.type}</td>
              <td>{entry.length}</td>
              <td>{entry.format}</td>
              <td>{entry.allowedValues?.join(', ') || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDictionaryPage;
