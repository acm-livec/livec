import React, { useState } from 'react';
import '../../styles/EditorRegisterPage.css';
import { useNavigate } from 'react-router-dom';

const EditorRegisterPage = () => {
  const [form, setForm] = useState({
    EID: '',
    EFirstName: '',
    ELastName: '',
    EEmail: '',
    ERole: 'AE',
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/editors/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data._id ? 'Editor Registered' : data.error);
  };

  return (
    <div className="editor-register-page">
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/cm/register')}>Register Community Member</button>
      </div>

      <h2>Register Editor</h2>
      <form className="editor-form" onSubmit={handleSubmit}>
        <label>EID:
          <input type="text" name="EID" required onChange={handleChange} />
        </label>
        <label>First Name:
          <input type="text" name="EFirstName" required onChange={handleChange} />
        </label>
        <label>Last Name:
          <input type="text" name="ELastName" required onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="EEmail" required onChange={handleChange} />
        </label>
        <label>Role:
          <select name="ERole" onChange={handleChange}>
            <option value="AE">Associate Editor (AE)</option>
            <option value="EIC">Editor-in-Chief (EIC)</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default EditorRegisterPage;
