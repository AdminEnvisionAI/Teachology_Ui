import React, { useState, useEffect } from "react";
import "../assets/css/tools.css";
import toolDetails from "../assets/data/toolDetails.json";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/authSlice";
import axios from "axios";

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [recommendedToolsByUserHistory, setRecommendedToolsByUserHistory] =
    useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    setTools(toolDetails.recommendedTools);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/history?user_id=${userId}`
        );
        const historyData = response.data;

        const toolFrequency = {};
        historyData.forEach((item) => {
          const tool = item.tool;
          toolFrequency[tool] = (toolFrequency[tool] || 0) + 1;
        });

        const sortedTools = Object.entries(toolFrequency)
          .sort(([, frequencyA], [, frequencyB]) => frequencyB - frequencyA)
          .map(([tool]) => tool);

        const top3Tools = sortedTools.slice(0, 3);

        // Use toolDetails.recommendedTools instead of recommendedTools
        const top3ToolsDetails = top3Tools.map((toolName) => {
          return toolDetails.recommendedTools.find((tool) => tool.title === toolName);
        });

        setRecommendedToolsByUserHistory(top3ToolsDetails);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  const handleCardClick = (tool) => {
    navigate(`/tool/${tool.title}`, { state: { tool } });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const remainingFilteredTools = filteredTools?.filter(
    (tool) =>
      !recommendedToolsByUserHistory?.find(
        (historyTool) => historyTool?.title === tool?.title
      )
  );


  return (
    <div className="container" id="tools">

      {/* Search Bar */}
      <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ height: 'calc(1.5em + 0.75rem + 2px)' }}
        />
        <div className="input-group-append">
          <span className="input-group-text" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {recommendedToolsByUserHistory?.length > 0 && (
        <>
          <h5 className="mb-4">Recommended For You</h5>
          <div className="row">
            {recommendedToolsByUserHistory?.map((tool, index) => (
              <div className="col-lg-4" key={`recommended-${index}`}>
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
                        </div>
                      </div>

                      <div className="widget-49-meeting-action">
                        <button
                          className="btn btn-sm use-tool-button"
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
        </>
      )}


      {remainingFilteredTools.length > 0 && (
        <>
          <h5 className="mb-4">All Tools</h5>
          <div className="row">
            {remainingFilteredTools?.map((tool, index) => (
              <div className="col-lg-4" key={`remaining-${index}`}>
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
                        </div>
                      </div>

                      <div className="widget-49-meeting-action">
                        <button
                          className="btn btn-sm use-tool-button"
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
        </>
      )}


      {(remainingFilteredTools.length === 0 && recommendedToolsByUserHistory.length === 0) && (
        <div className="text-center">
          <h4>No tools found matching your search.</h4>
        </div>
      )}
    </div>
  );
};

export default Tools;