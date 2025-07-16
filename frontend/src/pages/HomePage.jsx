import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to LiveC</h1>
      <p>Select a page to get started:</p>
      
      <div className="home-buttons">
        <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
        <button onClick={() => navigate('/as/notify-change')}>Notify Curriculum Change</button>
        <button onClick={() => navigate('/data-model/dictionary')}>Data Dictionary</button>
        <button onClick={() => navigate('/data-model')}>Logical Data Model</button>
      </div>
    </div>
  );
};

export default HomePage;
