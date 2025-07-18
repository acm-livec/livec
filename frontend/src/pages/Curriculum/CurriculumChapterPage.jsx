import React, { useEffect, useState } from 'react';
import '../../styles/CommonForm.css';
import { useNavigate } from 'react-router-dom';

const CurriculumChapterPage = () => {
  const [chapters, setChapters] = useState([]);
  const [form, setForm] = useState({
    chapterTitle: '',
    chapterDescription: '',
    chapterNumber: '',
    curriculumId: '',
  });

  const navigate = useNavigate();

  const fetchChapters = async () => {
    const res = await fetch('http://localhost:3001/api/curriculum-chapters');
    const data = await res.json();
    setChapters(data);
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/curriculum-chapters/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Chapter added');
      setForm({ chapterTitle: '', chapterDescription: '', chapterNumber: '', curriculumId: '' });
      fetchChapters();
    }
  };

  return (
    <div className="common-form-page">
      <h2>Curriculum Chapters</h2>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/curriculum')}>Curriculum</button>
      </div>

      <form className="common-form" onSubmit={handleSubmit}>
        <label>Title:
          <input name="chapterTitle" value={form.chapterTitle} onChange={handleChange} required />
        </label>
        <label>Description:
          <input name="chapterDescription" value={form.chapterDescription} onChange={handleChange} />
        </label>
        <label>Chapter Number:
          <input type="number" name="chapterNumber" value={form.chapterNumber} onChange={handleChange} required />
        </label>
        <label>Curriculum ID:
          <input name="curriculumId" value={form.curriculumId} onChange={handleChange} required />
        </label>
        <button type="submit">Add Chapter</button>
      </form>

      <ul>
        {chapters.map(chap => (
          <li key={chap._id}>
            <strong>{chap.chapterNumber}. {chap.chapterTitle}</strong>: {chap.chapterDescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurriculumChapterPage;

