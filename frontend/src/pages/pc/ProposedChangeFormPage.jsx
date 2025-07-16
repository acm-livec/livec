import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProposedChangeFormPage.css';

const ProposedChangeFormPage = () => {
  const [form, setForm] = useState({ title: '', description: '', submittedBy: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/proposed-changes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    alert(result.message || result.error);
  };

  return (
    <div className="proposed-change-page">
      <h2>Submit a Proposed Change</h2>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
      </div>

      <form className="proposed-change-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>

        <label>
          Submitted By (CMID or Email):
          <input type="text" name="submittedBy" value={form.submittedBy} onChange={handleChange} required />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProposedChangeFormPage;
