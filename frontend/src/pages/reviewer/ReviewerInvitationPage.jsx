import React, { useEffect, useState } from 'react';
import '../../styles/SharedStyles.css';

const ReviewerInvitationPage = () => {
  const [invitation, setInvitation] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/reviewer/invitation')
      .then(res => res.json())
      .then(data => setInvitation(data))
      .catch(err => console.error('Error fetching invitation:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/reviewer/invitation/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invitationId: invitation.id, response }),
    });
    const data = await res.json();
    alert(data.message);
  };

  if (!invitation) return <p>Loading invitation</p>;

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => (window.location.href = '/')}>Home</button>
      </div>

      <h2 className="center-text">Reviewer Invitation</h2>
      <div className="card">
        <h3>{invitation.proposalTitle}</h3>
        <p><strong>Proposer:</strong> {invitation.proposer}</p>
        <p><strong>Summary:</strong> {invitation.summary}</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>Response:<textarea value={response} onChange={(e) => setResponse(e.target.value)} required /></label>
        <button type="submit">Submit Response</button>
      </form>
    </div>
  );
};

export default ReviewerInvitationPage;
