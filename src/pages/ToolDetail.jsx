// ToolDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import toolDetails from "../assets/data/toolDetails.json";
import "../assets/css/tooldetail.css";
import CreatableSelect from "react-select/creatable";

const ToolDetail = () => {
  const { toolTitle } = useParams();
  const location = useLocation();
  const [tool, setTool] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [selectValues, setSelectValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const toolFromState = location.state?.tool;

    if (toolFromState) {
      setTool(toolFromState);
      const fields = toolDetails.formFields[toolTitle] || [];
      setFormFields(fields);

      const initialSelectValues = {};
      fields.forEach((field) => {
        if (field.type === "select" && field.isCreatable) {
          initialSelectValues[field.name] = null;
        }
      });
      setSelectValues(initialSelectValues);
    } else {
      const foundTool = toolDetails.recommendedTools.find(
        (t) => t.title === toolTitle
      );

      if (foundTool) {
        setTool(foundTool);
        const fields = toolDetails.formFields[toolTitle] || [];
        setFormFields(fields);

        const initialSelectValues = {};
        fields.forEach((field) => {
          if (field.type === "select" && field.isCreatable) {
            initialSelectValues[field.name] = null;
          }
        });
        setSelectValues(initialSelectValues);
      } else {
        console.error(`Tool not found: ${toolTitle}`);
      }
    }
  }, [toolTitle, location.state]);

  const handleSelectChange = (newValue, fieldName) => {
    setSelectValues((prevValues) => ({
      ...prevValues,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(""); // Clear any previous messages

    // Simulate an API call (replace with your actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate 1.5 seconds loading

      // Handle form data (e.g., send to an API)
      console.log("Form Data:", selectValues); // Replace with your API call

      setSubmitMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tool) {
    return <div className="loading-message">Loading... or Tool not found.</div>;
  }

  return (
    <section className="tool-detail-section">
      <div className="tool-detail-container">
        <div className="card tool-detail-card">
          <div className="card-body">
            <div className="tool-image-container">
              <img
                src={tool.image}
                alt={tool.title}
                className="tool-detail-image"
              />
            </div>
            <h2 className="tool-detail-title">{tool.title}</h2>
            <p className="tool-detail-content">{tool.content}</p>

            <form onSubmit={handleSubmit}>
              {formFields.map((field, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="form-control form-control-sm"
                      id={field.name}
                      placeholder={field.placeholder}
                    ></textarea>
                  ) : field.type === "select" ? (
                    <CreatableSelect
                      id={field.name}
                      options={field.options?.map((option) => ({
                        value: option,
                        label: option,
                      }))}
                      onChange={(newValue) =>
                        handleSelectChange(newValue, field.name)
                      }
                      value={selectValues[field.name]}
                      placeholder={field.placeholder || "Select or create..."}
                      isClearable
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      className="form-control form-control-sm"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className={`btn btn-primary submit-button ${
                  isSubmitting ? "disabled" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {"  "}Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              {submitMessage && (
                <div
                  className={`submit-message ${
                    submitMessage.includes("error") ? "error" : "success"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolDetail;
