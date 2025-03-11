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
    navigate(`/tool/${tool.title}`, { state: { tool } });
  };

  return (
    <div className="container" id="tools">
      <h5 className="mb-4">Recommended Tools</h5>
      <div className="row">
        {tools.map((tool, index) => (
          <div className="col-lg-4" key={index}>
            <div className="card card-margin tool-card-custom">
              <div className="card-body">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-primary">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="tool-image-custom"
                      />
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">{tool.title}</span>
                      {/* Removed <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span> */}
                    </div>
                  </div>

                  <div className="widget-49-meeting-action">
                    <button
                      className="btn btn-sm use-tool-button" // Removed btn-flash-border-primary
                      onClick={() => handleCardClick(tool)}
                    >
                      Use Tool
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
