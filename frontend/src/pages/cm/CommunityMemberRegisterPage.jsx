import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CommunityMemberRegisterPage.css';

const CommunityMemberRegisterPage = () => {
  const [formData, setFormData] = useState({
    CMFirstName: '',
    CMLastName: '',
    CMEmail: '',
    CMCellPhone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/community-members/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.CMID ? 'Registered successfully' : result.error);
  };

  return (
    <div className="community-register-page">
      <div className="nav-buttons top">
        <button onClick={() => navigate('/')}>Home</button>
        {/* <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
        <button onClick={() => navigate('/data-model')}>Data Model</button>
        <button onClick={() => navigate('/data-model/dictionary')}>Data Dictionary</button> */}
      </div>

      <h2>Community Member Registration</h2>

      <form className="cm-register-form" onSubmit={handleSubmit}>
        <label>First Name:
          <input type="text" name="CMFirstName" onChange={handleChange} required />
        </label>
        <label>Last Name:
          <input type="text" name="CMLastName" onChange={handleChange} required />
        </label>
        <label>Email:
          <input type="email" name="CMEmail" onChange={handleChange} required />
        </label>
        <label>Cell Phone:
          <input type="tel" name="CMCellPhone" onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CommunityMemberRegisterPage;
