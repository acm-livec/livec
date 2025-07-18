import React, { useEffect, useState } from 'react';
import '../../styles/Reviewer.css';
import { useNavigate } from 'react-router-dom';

const ReviewerQueuePage = () => {
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/reviewer/queue')
      .then(res => res.json())
      .then(data => setProposals(data))
      .catch(err => console.error('Error fetching proposals:', err));
  }, []);

  return (
    <div className="reviewer-page">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
      </div>

      <h2 className="center-title">Reviewer Proposal Queue</h2>

      <div className="proposal-list">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="proposal-card">
            <h4>{proposal.title}</h4>
            <p><strong>Summary:</strong> {proposal.summary}</p>
            <p><strong>History:</strong></p>
            <ul>
              {proposal.history.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewerQueuePage;
