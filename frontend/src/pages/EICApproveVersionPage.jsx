import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EICDecisionPage.css';

const EICApproveVersionPage = () => {
  const [collectionId, setCollectionId] = useState('');
  const [approvedBy, setApprovedBy] = useState('EIC ');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleApproval = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/eic/approve-curriculum-version', {
        collectionId,
        approvedBy,
        notes
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Failed to approve curriculum');
    }
  };

  return (
    <div className="eic-decision-page">
      <h1 className="eic-title">Approve Curriculum Version</h1>

      <div className="proposal-card">

        <div className="form-group">
          <label><strong>Collection ID:</strong></label>
          <input
            type="text"
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><strong>Approved By:</strong></label>
          <input
            type="text"
            value={approvedBy}
            onChange={(e) => setApprovedBy(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><strong>Approval Notes:</strong></label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="decision-button" onClick={handleApproval}>
          Approve Official Version
        </button>

        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>

  );
};

export default EICApproveVersionPage;
