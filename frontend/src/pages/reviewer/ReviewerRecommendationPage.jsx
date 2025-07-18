import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/FormPage.css';

const ReviewerRecommendationPage = () => {
  const [form, setForm] = useState({ proposalId: '', recommendation: '', justification: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/reviewer/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || 'Submitted');
    setForm({ proposalId: '', recommendation: '', justification: '' });
  };

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/reviewer/queue')}>Queue</button>
      </div>

      <h2>Submit Recommendation</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Proposal ID:
          <input name="proposalId" value={form.proposalId} onChange={handleChange} required />
        </label>

        <label>Recommendation:
          <input name="recommendation" value={form.recommendation} onChange={handleChange} required />
        </label>

        <label>Justification:
          <textarea name="justification" value={form.justification} onChange={handleChange} required />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewerRecommendationPage;
