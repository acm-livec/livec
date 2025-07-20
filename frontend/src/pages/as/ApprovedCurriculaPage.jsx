import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/StandardPage.css';

const ApprovedCurriculaPage = () => {
  const [curricula, setCurricula] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/as/approved/curricula/')
      .then((res) => res.json())
      .then((data) => setCurricula(data))
      .catch((err) => console.error('Error fetching approved curricula:', err));
  },[]);


  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/curricula')}>Curricula</button>
      </div>
      <h2>Approved Curricula Versions</h2>
      <ul className="list">
        {curricula.map((item, idx) => (
          <li key={idx}><strong>{item.version}</strong> — {item.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovedCurriculaPage;
