import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/OutputScreen.css";

const OutputScreen = () => {
  const location = useLocation();
  const { result } = location.state || {};

  const [questions, setQuestions] = useState(null);
  const [output, setOutput] = useState(null);
  const [isStructured, setIsStructured] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Please fill all answers.");

  useEffect(() => {
    if (result) {
      if (Array.isArray(result)) {
        setQuestions(result);
        setIsStructured(true);
      } else {
        setOutput(result);
        setIsStructured(false);
      }
    }
  }, [result]);

  const checkAllFilled = () => {
    if (!questions) return false;
    return questions.every((_, index) => selectedAnswers[index] !== undefined && selectedAnswers[index] !== "");
  };

  useEffect(() => {
    if (checkAllFilled()) {
      setErrorMessage(""); // Remove error when all fields are filled
    } else {
      setErrorMessage("Please fill all answers.");
    }
  }, [selectedAnswers, questions]);

  const handleInputChange = (questionIndex, value) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const isChecked = (questionIndex, optionIndex) => {
    return selectedAnswers[questionIndex] === optionIndex;
  };

  const handleSubmit = () => {
    if (!checkAllFilled()) {
      setErrorMessage("Please fill all answers.");
      return;
    }
    setShowFeedback(true);
  };

  return (
    <div className="output-screen-container">
      <div className="output-screen">
        <div className="output-container">
          <h6 className="results-heading">Form Submission Result</h6>

          {isStructured ? (
            <>
              {questions.map((item, index) => (
                <div key={index} className="question-card">
                  <h3 className="question-number">Question {index + 1}</h3>
                  <p className="question-text">{item.question}</p>

                  {item.type === "multiple choice" && (
                    <div className="options-container">
                      {item.options.map((option, optionIndex) => (
                        <label key={optionIndex} className={`option ${isChecked(index, optionIndex) ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={isChecked(index, optionIndex)}
                            onChange={() => handleOptionChange(index, optionIndex)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}

                  {item.type === "short answer" && (
                    <textarea
                      maxLength={300}
                      value={selectedAnswers[index] || ""}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="Your answer"
                      className="short-answer-textarea"
                    />
                  )}

                  {item.type === "true/false" && (
                    <div className="options-container">
                      {["true", "false"].map((value) => (
                        <label key={value} className={`option ${isChecked(index, value) ? "selected" : ""}`}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={value}
                            checked={isChecked(index, value)}
                            onChange={() => handleInputChange(index, value)}
                          />
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </label>
                      ))}
                    </div>
                  )}

                  {showFeedback && (
                    <div className="answer-section">
                      <p className={selectedAnswers[index] === item.answer ? "correct" : "incorrect"}>
                        {selectedAnswers[index] === item.answer
                          ? "Correct! 🎉"
                          : `The correct answer is '${item.answer}'`}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Show error message if fields are empty */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button onClick={handleSubmit} className="submit-button" disabled={!checkAllFilled()}>
                Check Answers
              </button>
            </>
          ) : (
            <div className="summary-container">
              <h2 className="results-heading">Summary</h2>
              <div className="text-output">{output}</div>
            </div>
          )}

          {!result && <div>No result available.</div>}
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;
