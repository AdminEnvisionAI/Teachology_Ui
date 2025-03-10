// Tools.jsx
import React, { useState, useEffect } from "react";
import "../assets/css/tools.css"; // Import the CSS file
import toolDetails from "../assets/data/toolDetails.json"; // Import the JSON data
import { useNavigate } from "react-router-dom";
const Tools = () => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load tools from the JSON data on component mount
    setTools(toolDetails.recommendedTools);
  }, []);

  const handleCardClick = (toolTitle) => {
    // Navigate to a new route with the tool title as a parameter
    navigate(`/tool/${toolTitle}`);
  };

  const getColorForIndex = (index) => {
    const colors = [
      "primary",
      "warning",
      "success",
      "info",
      "danger",
      "light",
      "dark",
    ]; // Bootstrap color names
    return colors[index % colors.length]; // Cycle through colors
  };

  return (
    <div className="container mt-5">
      <h5>Recommended Tools</h5>
      <div className="row">
        {tools.map((tool, index) => {
          const color = getColorForIndex(index);

          return (
            <div className="col-lg-4" key={index}>
              <div className="card card-margin">
                <div className="card-header no-border">
                  <h5 className="card-title">{tool.title}</h5>
                </div>
                <div className="card-body pt-0">
                  <div className="widget-49">
                    <div className="widget-49-title-wrapper">
                      <div className={`widget-49-date-${color}`}>
                        <span className="widget-49-date-day">{index + 1}</span>
                        <span className="widget-49-date-month">Tool</span>
                      </div>
                      <div className="widget-49-meeting-info">
                        <span className="widget-49-pro-title">
                          {tool.title}
                        </span>
                        <span className="widget-49-meeting-time">
                          Click for Details
                        </span>
                      </div>
                    </div>
                    <ol className="widget-49-meeting-points">
                      <li className="widget-49-meeting-item">
                        <span>{tool.content}</span>
                      </li>
                    </ol>
                    <div className="widget-49-meeting-action">
                      <button
                        className={`btn btn-sm btn-flash-border-${color}`}
                        onClick={() => handleCardClick(tool.title)}
                      >
                        Use Tool
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tools;
