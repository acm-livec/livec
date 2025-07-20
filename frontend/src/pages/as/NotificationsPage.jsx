import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/StandardPage.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/as/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error('Error fetching notifications:', err));
  }, []);

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/as/approved-curricula')}>Approved Curricula</button>
      </div>
      <h2>Curriculum Change Notifications</h2>
      <ul className="list">
        {notifications.map((note, index) => (
          <li key={index}><strong>{note.date}</strong>: {note.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
