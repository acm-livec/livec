import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StandardPage.css";

const ExternalInterfaceHardwarePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Home</button>
      </div>

      <h2>Hardware Interface Requirements</h2>
      <div className="standard-text">
        <p>
          This system is a web-based application and does not directly interact with any external hardware interfaces.
          However, it assumes compatibility with standard client hardware, including:
        </p>
        <ul>
          <li>Desktop and laptop computers (e.g., Windows)</li>
          <li>Modern browsers (e.g., Chrome)</li>
          <li>Touch-based interaction support for tablets</li>
        </ul>
        <p>
          Communication is performed over HTTP using RESTful API endpoints. There are no serial ports, device drivers,
          or low-level hardware interactions involved in this software product
        </p>
      </div>
    </div>
  );
};

export default ExternalInterfaceHardwarePage;
