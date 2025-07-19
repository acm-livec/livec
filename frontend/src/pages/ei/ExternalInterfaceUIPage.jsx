import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/StandardPage.css";

const ExternalInterfaceUIPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
    </div>

      <h2>User Interface Requirements</h2>

      <div className="content-block">
        <p><strong>Standard Elements:</strong></p>
        <ul>
          <li>Consistent navigation bar at the top</li>
          <li>All screens use Roboto font, light backgrounds, and rounded elements</li>
          <li>Standard buttons: Home, Help, Submit, Cancel</li>
          <li>Form validation with red inline error messages</li>
        </ul>

        <p><strong>Example UI:</strong></p>
        <img src="/ui-sample.png" alt="UI Sample" style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
      </div>
    </div>
  );
};

export default ExternalInterfaceUIPage;
