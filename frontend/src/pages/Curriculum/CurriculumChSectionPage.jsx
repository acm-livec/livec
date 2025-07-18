import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CurriculumPage.css';

const CurriculumChSectionPage = () => {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({ title: '', chapterId: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/curriculum/sections')
      .then((res) => res.json())
      .then((data) => setSections(data))
      .catch((err) => console.error('Error fetching sections:', err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/curriculum/sections/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data._id) {
      setSections([...sections, data]);
      setForm({ title: '', chapterId: '', content: '' });
    }
  };

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/curricula')}>Curricula</button>
        <button onClick={() => navigate('/curriculum/chapters')}>Chapters</button>
      </div>

      <h2>Curriculum Chapter Sections</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Chapter ID:
          <input name="chapterId" value={form.chapterId} onChange={handleChange} required />
        </label>
        <label>
          Content:
          <textarea name="content" value={form.content} onChange={handleChange} />
        </label>
        <button type="submit">Create Section</button>
      </form>

      <ul className="list">
        {sections.map((sec) => (
          <li key={sec._id}>
            <strong>{sec.title}</strong> — {sec.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurriculumChSectionPage;
