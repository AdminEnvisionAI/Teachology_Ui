// ToolDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import toolDetails from "../assets/data/toolDetails.json";

const ToolDetails = () => {
  const { toolTitle } = useParams(); // Get the toolTitle from the URL
  const formFields = toolDetails.formFields[toolTitle]; // Get the form fields for this tool

  if (!formFields) {
    return <div>Tool not found or no form fields defined.</div>; // Handle errors
  }

  return (
    <div className="container">
      <h2>{toolTitle}</h2>
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
    </div>
  );
};

export default ToolDetails;
