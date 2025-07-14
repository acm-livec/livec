import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/NotifyCurriculumChangePage.css';

const NotifyCurriculumChangePage = () => {
  const [changeTitle, setChangeTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notifiedBy, setNotifiedBy] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/as/notify-change', {
        changeTitle,
        description,
        notifiedBy,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed to send notification');
    }
  };

  return (
    <div className="notify-page">
      <h2 className="page-title">Notify Curriculum Change</h2>

      <label>Change Title:</label>
      <input value={changeTitle} onChange={e => setChangeTitle(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Notified By:</label>
      <input value={notifiedBy} onChange={e => setNotifiedBy(e.target.value)} />

      <button onClick={handleSubmit}>Send Notification</button>

      {message && <p className="notification-msg">{message}</p>}
    </div>
  );
};

export default NotifyCurriculumChangePage;
