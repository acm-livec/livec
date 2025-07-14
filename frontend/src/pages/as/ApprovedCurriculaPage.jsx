import React, { useEffect, useState } from 'react';
import '../../styles/ApprovedCurriculaPage.css';

const ApprovedCurriculaPage = () => {
  const [curricula, setCurricula] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/as/approved-curricula')
      .then(res => res.json())
      .then(data => {
        setCurricula(data);
        setLoading(false);
      })
      .catch(() => {
        setCurricula([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="approved-curricula-page">
      <h1>Approved Curriculum Versions</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        curricula.map((curriculum, index) => (
          <div key={index} className="curriculum-card">
            <h2>{curriculum.versionId}</h2>
            <p><strong>Discipline:</strong> {curriculum.discipline}</p>
            <p><strong>Approved Date:</strong> {curriculum.approvedDate}</p>
            <p><strong>Summary:</strong> {curriculum.summary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovedCurriculaPage;
