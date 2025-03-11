// Tools.jsx
import React, { useState, useEffect } from "react";
import "../assets/css/tools.css";
import toolDetails from "../assets/data/toolDetails.json";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTools(toolDetails.recommendedTools);
  }, []);

  const handleCardClick = (tool) => {
    // Pass the entire tool object
    navigate(`/tool/${tool.title}`, { state: { tool } }); // Send the tool as state
  };

  return (
    <div className="container" id="tools">
      <h5 className="mb-4">Recommended Tools</h5>
      <div className="row">
        {tools.map((tool, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="card tool-card h-100">
              <div className="card-img-container">
                <img
                  src={tool.image}
                  className="card-img-top tool-image rounded-circle"
                  alt={tool.title}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{tool.title}</h5>
                <p className="card-text">{tool.content}</p>
                <button
                  className="btn btn-primary tool-button"
                  onClick={() => handleCardClick(tool)} // Pass the entire tool
                >
                  Use Tool
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;