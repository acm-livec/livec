import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LogicalModelPage.css';
import EntityCard from '../../components/EntityCard';

const LogicalModelPage = () => {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/datamodel/entities')
      .then(res => res.json())
      .then(data => setEntities(data))
      .catch(err => console.error('Failed to fetch data model:', err));
  }, []);

  return (
    <div className="logical-model-page">
      <h1>Logical Data Model</h1>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/as/approved')}>Approved Curricula</button>
        <button onClick={() => navigate('/as/notify-change')}>Notify Change</button>
        <button onClick={() => navigate('/data-model/dictionary')}>Data Dictionary</button>
      </div>

      <div className="entity-grid">
        {entities.map((entity) => (
          <EntityCard key={entity.name} entity={entity} />
        ))}
      </div>
    </div>
  );
};

export default LogicalModelPage;
