// ToolDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toolDetails from "../assets/data/toolDetails.json";

const ToolDetail = () => {
  const { toolTitle } = useParams();
  const [tool, setTool] = useState(null);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    // Find the tool in the JSON data based on the title
    const foundTool = toolDetails.recommendedTools.find(
      (t) => t.title === toolTitle
    );

    if (foundTool) {
      setTool(foundTool);
      setFormFields(toolDetails.formFields[toolTitle] || []);
    } else {
      // Handle the case where the tool is not found (e.g., redirect, display an error message)
      console.error(`Tool not found: ${toolTitle}`);
      // Optionally: Redirect to a 404 page or display an error message (using Navigate)
    }
  }, [toolTitle]);

  if (!tool) {
    return <div>Loading... or Tool not found.</div>; // Or a redirect
  }

  return (
    <div className="container mt-5">
      <h2>{tool.title}</h2>
      <p>{tool.content}</p>

      {formFields.length > 0 ? (
        <form>
          {formFields.map((field, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="form-control"
                  id={field.name}
                  placeholder={field.placeholder}
                />
              ) : field.type === "select" ? (
                <select className="form-select" id={field.name}>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className="form-control"
                  id={field.name}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <p>No form fields found for this tool.</p>
      )}
    </div>
  );
};

export default ToolDetail;
