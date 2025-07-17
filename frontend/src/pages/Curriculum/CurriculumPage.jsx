import React, { useState, useEffect } from 'react';
import '../../styles/CurriculumPage.css';
import { useNavigate } from 'react-router-dom';

const CurriculumPage = () => {
  const [curriculumList, setCurriculumList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', year: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/curriculum/all')
      .then(res => res.json())
      .then(data => setCurriculumList(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/curriculum/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newCurriculum = await res.json();
    setCurriculumList([...curriculumList, newCurriculum]);
    setForm({ title: '', description: '', year: '' });
  };

  return (
    <div className="curriculum-page">
      <h2>Curriculum Management</h2>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
      </div>

      <form className="curriculum-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={form.year} onChange={handleChange} required />
        </label>
        <button type="submit">Add Curriculum</button>
      </form>

      <div className="curriculum-list">
        {curriculumList.map(c => (
          <div key={c.curriculumId} className="curriculum-card">
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p><strong>Year:</strong> {c.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumPage;
