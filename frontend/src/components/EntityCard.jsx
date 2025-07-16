import React from 'react';
import '../styles/EntityCard.css';

const EntityCard = ({ entity }) => (
  <div className="entity-card">
    <h3>{entity.name}</h3>
    <ul>
      {entity.attributes.map((attr, index) => (
        <li key={index}>{attr}</li>
      ))}
    </ul>
  </div>
);

export default EntityCard;
