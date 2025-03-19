import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import toolDetails from "../assets/data/toolDetails.json";
import "../assets/css/tooldetail.css";
import CreatableSelect from "react-select/creatable";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  selectCurrentToolFormData,
  setCurrentTool,
} from "../redux/toolSlice";
import { selectUserId } from "../redux/authSlice";
import Switch from "@mui/material/Switch";
import { askQuestionaire as askQuestionaireEndpoint } from "../../src/config/config";

const ToolDetail = () => {
  const { toolTitle } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tool, setTool] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [websearch, setWebsearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Redux integration
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const formData = useSelector(selectCurrentToolFormData);

  // useForm configuration with validation rules
  const {
    register,
    handleSubmit,
    reset,
    setValue, // Add setValue
    getValues, // Add getValues
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // Validate on submit
    defaultValues: {}, // Initialize with empty object
  });

  useEffect(() => {
    const toolFromState = location.state?.tool;

    const initializeToolAndForm = (foundTool) => {
      setTool(foundTool);
      dispatch(setCurrentTool(foundTool.title));
      const fields = toolDetails.formFields[toolTitle] || [];
      setFormFields(fields);

      // Set default values and register fields for validation
      const initialValues = {};
      fields.forEach((field) => {
        if (formData[field.name]) {
          initialValues[field.name] = formData[field.name];
        } else {
          initialValues[field.name] = ""; // Provide a default empty string
        }
      });
      reset(initialValues);
    };

    if (toolFromState) {
      initializeToolAndForm(toolFromState);
    } else {
      const foundTool = toolDetails.recommendedTools.find(
        (t) => t.title === toolTitle
      );

      if (foundTool) {
        initializeToolAndForm(foundTool);
      } else {
        console.error(`Tool not found: ${toolTitle}`);
      }
    }
  }, [toolTitle, location.state, dispatch, reset, formData]);

  const fetchQuestionnaire = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${apiUrl}${askQuestionaireEndpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        setSuccessMessage("Questionnaire generated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);

        navigate("/output", {
          state: {
            result: response.data.response,
            url: response.data.youtubeURL,
          },
        });

        setUploadedFiles([]);
      } else {
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  const handleSwitchChange = (event) => {
    setWebsearch(event.target.checked);
  };

  const onSubmit = async (data) => {
    if (
      toolTitle === "Text Dependent Questions" &&
      websearch &&
      uploadedFiles.length === 0
    ) {
      alert("Please upload a document if 'Include Documents' is checked.");
      return;
    }

    const finalData = {
      ...data,
      title: toolTitle,
      askType: tool.content,
      youtubeURL: data.youtubeURL,
    };

    const request = new FormData();
    request.append("request", JSON.stringify(finalData));
    request.append("user_id", userId);

    if (toolTitle === "Text Dependent Questions") {
      request.append("websearch", websearch.toString());
      uploadedFiles.forEach((file) => {
        request.append("uploadedFiles", file);
      });
    }

    try {
      fetchQuestionnaire(request);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (newValue, fieldName) => {
    setValue(fieldName, newValue ? newValue.value : "");
    dispatch(
      updateFormData({
        name: fieldName,
        value: newValue ? newValue.value : "",
      })
    );
  };

  // Function to handle manual input change and update Redux store
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    dispatch(updateFormData({ name: name, value: value }));
  };

  // Define base styles
  const baseSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "#495057",
      fontSize: "0.9rem",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      minHeight: "38px",
      display: "flex",
      alignItems: "center",
      transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      ":hover": {
        borderColor: "#2962ff",
      },
      ":focus": {
        borderColor: "#2962ff",
        boxShadow: "0 0 0 0.2rem rgba(41, 98, 255, 0.25)",
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#6c757d",
      fontSize: "0.9rem",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#495057",
      fontSize: "0.9rem",
    }),
    indicatorSeparator: (styles) => ({
      display: "none",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#6c757d",
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "white",
      color: "#495057",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      fontSize: "0.9rem",
      zIndex: 2,
    }),
    menuList: (styles) => ({
      ...styles,
      padding: 0,
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused
        ? "#f8f9fa"
        : isSelected
        ? "#2962ff"
        : "white",
      color: isFocused
        ? "#495057"
        : isSelected
        ? "white"
        : "#495057",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#f8f9fa",
        color: "#495057",
      },
    }),
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
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field, index) => {
                let rules = {};
                if (field.required) {
                  rules = {
                    required: {
                      value: true,
                      message: `${field.label} is required`,
                    },
                  };

                  if (field.type === "email") {
                    rules.pattern = {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    };
                  }
                }

                return (
                  <div className="form-group" key={index}>
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        className="form-control form-control-sm"
                        {...register(field.name, rules)}
                        onChange={handleInputChange}
                      />
                    ) : field.type === "select" ? (
                      <CreatableSelect
                        className="selectbox"
                        id={field.name}
                        options={field.options?.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        onChange={(newValue) =>
                          handleSelectChange(newValue, field.name)
                        }
                        placeholder={field.placeholder || "Select or create..."}
                        isClearable
                        isValidNewOption={() => false}
                        value={
                          field.options
                            ?.map((option) => ({
                              value: option,
                              label: option,
                            }))
                            .find((opt) => opt.value === formData[field.name]) ||
                          null
                        }
                        styles={baseSelectStyles} // Apply the styles here
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        className="form-control form-control-sm"
                        placeholder={field.placeholder}
                        {...register(field.name, rules)}
                        onChange={handleInputChange}
                      />
                    )}
                    {errors[field.name] && (
                      <p className="error-message">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                );
              })}

              {toolTitle === "Text Dependent Questions" && (
                <div className="file-upload-container">
                  <div className="file-upload-header">
                    <label
                      htmlFor="uploadDocuments"
                      className="file-upload-label"
                    >
                      Upload Documents
                    </label>
                    <input
                      id="uploadDocuments"
                      type="file"
                      onChange={handleFileUpload}
                      className="file-upload-input"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls,.docx"
                    />
                  </div>
                  <div className="checkbox-container">
                    <Switch
                      checked={websearch}
                      onChange={handleSwitchChange}
                      inputProps={{ "aria-label": "web search switch" }}
                    />
                    <label htmlFor="websearch">Web Search</label>
                  </div>
                </div>
              )}

              {toolTitle === "Text Dependent Questions" &&
                uploadedFiles.length > 0 && (
                  <ul className="uploaded-files-list">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="file-item">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}

              <button
                type="submit"
                className={`btn btn-primary submit-button ${
                  loading ? "disabled" : ""
                }`}
                disabled={loading}
                style={{ backgroundColor: loading && "gray" }}
              >
                {loading ? "Thinking..." : `Generate ${toolTitle}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolDetail;