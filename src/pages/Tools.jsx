import React from "react";
import "../assets/css/tools.css";
import toolDetails from "../assets/data/toolDetails.json";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUserId } from "../redux/authSlice";
import axios from "axios";

const Tools = () => {
  const [tools, setTools] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [recommendedToolsByUserHistory, setRecommendedToolsByUserHistory] =
    React.useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  React.useEffect(() => {
    setTools(toolDetails.recommendedTools);
  }, []);

  React.useEffect(() => {
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
          return toolDetails.recommendedTools.find(
            (tool) => tool.title === toolName
          );
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
    <section id="tools" className="services section tools">
      {/* Search Bar */}
      <div
        className="container"
        style={{ maxWidth: "400px", marginBottom: "20px" }}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ height: "calc(1.5em + 0.75rem + 2px)" }}
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {recommendedToolsByUserHistory?.length > 0 && (
          <>
            <h5 className="mb-4">Recommended For You</h5>
            <div className="row g-4">
              {recommendedToolsByUserHistory?.map((tool, index) => (
                <div
                  className="col-xl-3 col-md-4 col-sm-6"
                  key={`recommended-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={`${200 + index * 100}`}
                >
                  <div className="service-item tool-card" onClick={() => handleCardClick(tool)} style={{cursor: 'pointer'}}>
                    <img
                      width={50}
                      height={47}
                      src={tool.image}
                      alt={tool.title}
                      className="tool-image"
                    />
                    <h3>
                      {tool.title}
                      {/* Removed Link Component here, the entire div is clickable now */}
                    </h3>
                    <p className="mb-4">
                      We offer a variety of flexible AI learning options
                    </p>
                    {/* You can add a short description here if toolDetails has one */}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {remainingFilteredTools.length > 0 && (
          <>
            <h5 className="mb-4 mt-5">All Tools</h5>
            <div className="row g-4">
              {remainingFilteredTools?.map((tool, index) => (
                <div
                  className="col-xl-3 col-md-4 col-sm-6"
                  key={`remaining-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={`${200 + index * 100}`}
                >
                  <div className="service-item tool-card" onClick={() => handleCardClick(tool)} style={{cursor: 'pointer'}}>
                    <img
                      width={50}
                      height={47}
                      src={tool.image}
                      alt={tool.title}
                      className="tool-image"
                    />
                    <h3>
                      {tool.title}
                    </h3>
                    <p className="mb-4">
                      We offer a variety of flexible AI learning options
                    </p>
                    {/* You can add a short description here if toolDetails has one */}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {remainingFilteredTools.length === 0 &&
          recommendedToolsByUserHistory.length === 0 && (
            <div className="text-center">
              <h4>No tools found matching your search.</h4>
            </div>
          )}
      </div>
    </section>
  );
};

export default Tools;