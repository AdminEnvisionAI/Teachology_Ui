import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Or any other theme
import "../assets/css/OutputScreen.css";

const OutputScreen = () => {
  const location = useLocation();
  const { result } = location.state || {};

  const [questions, setQuestions] = useState(null);
  const [output, setOutput] = useState(null);
  const [isStructured, setIsStructured] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [youtubeThumbnail, setYoutubeThumbnail] = useState(null);
  const [url, setUrl] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loadingThumbnail, setLoadingThumbnail] = useState(true);
  const [isYoutubeVideo, setIsYoutubeVideo] = useState(false); // New state

  console.log(result, "result");

  useEffect(() => {
    if (location.state?.url) {
      setUrl(location.state.url);
    }
  }, [location.state?.url]);

  const getVideoId = (url) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      console.error("Could not extract video ID.");
      return null;
    }
  };

  useEffect(() => {
    const fetchThumbnail = () => {
      if (url) {
        setLoadingThumbnail(true);
        const videoId = getVideoId(url);

        if (videoId) {
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          setYoutubeThumbnail(thumbnailUrl);
          setIsYoutubeVideo(true); // Set to true when it's a YouTube URL
        } else {
          setYoutubeThumbnail(null);
          setIsYoutubeVideo(false); // Set to false if not a YouTube URL
        }

        setLoadingThumbnail(false);
      } else {
        setLoadingThumbnail(false);
        setYoutubeThumbnail(null);
        setIsYoutubeVideo(false);
      }
    };

    fetchThumbnail();
  }, [url]);

  useEffect(() => {
    if (result) {
      if (Array.isArray(result)) {
        setQuestions(result);
        setIsStructured(true);
      } else if (typeof result === "string" || result instanceof String) {
        setOutput(result); // Set the raw markdown content
        setEditorContent(result); // Set the raw markdown content for editing
        setIsStructured(false);
      } else {
        console.warn("Unexpected data format:", result);
      }
    }
  }, [result]);

  const handleInputChange = (questionIndex, value) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: value });
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
  };

  const isChecked = (questionIndex, optionIndex) => {
    return selectedAnswers[questionIndex] === optionIndex;
  };

  const getInputValue = (questionIndex) => {
    return selectedAnswers[questionIndex] || "";
  };

  const getFeedback = (item, index) => {
    const selectedAnswer = selectedAnswers[index];
    if (selectedAnswer === undefined) return null;

    if (item.options) {
      const answerIndex = item.options.indexOf(item.answer);

      if (item.type === "multiple choice") {
        const isCorrect = selectedAnswer === answerIndex;
        return (
          <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect
              ? "Correct! 🎉"
              : `Incorrect. The correct answer is '${item.options[answerIndex]}'`}
          </p>
        );
      } else if (item.type === "true/false") {
        const isCorrect = selectedAnswer === item.answer;
        return (
          <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect
              ? "Correct! 🎉"
              : `Incorrect. The correct answer is '${item.answer}'`}
          </p>
        );
      }
    } else if (item.type === "short answer") {
      const isCorrect =
        selectedAnswer?.trim().toLowerCase() ===
        item.answer?.trim().toLowerCase();
      return (
        <p className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
          {isCorrect
            ? "Correct! 🎉"
            : `Incorrect. The correct answer is '${item.answer}'`}
        </p>
      );
    }
    return null;
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  return (
    <div className="output-screen-container">
      <div className="output-screen">
        <div className="output-container">
          <h6 className="results-heading">Form Submission Result</h6>

          {isStructured ? (
            <>
              {isStructured && questions && (
                <>
                  {questions.map((item, index) => (
                    <div key={index} className="question-card">
                      <h3 className="question-number">Question {index + 1}</h3>
                      <p className="question-text">{item.question}</p>
                      {item.type === "multiple choice" && (
                        <div className="options-container">
                          {item.options &&
                            item.options.map((option, optionIndex) => (
                              <label
                                key={optionIndex}
                                className={`option ${
                                  isChecked(index, optionIndex)
                                    ? "selected"
                                    : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  checked={isChecked(index, optionIndex)}
                                  onChange={() =>
                                    handleOptionChange(index, optionIndex)
                                  }
                                />
                                {option}
                              </label>
                            ))}
                        </div>
                      )}
                      {item.type === "short answer" && (
                        <textarea
                          maxLength={300}
                          value={getInputValue(index)}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          placeholder="Your answer"
                          className="short-answer-textarea"
                        />
                      )}
                      {item.type === "true/false" && (
                        <div className="options-container">
                          <label
                            className={`option ${
                              isChecked(index, "true") ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value="true"
                              checked={isChecked(index, "true")}
                              onChange={() => handleInputChange(index, "true")}
                            />
                            True
                          </label>
                          <label
                            className={`option ${
                              isChecked(index, "false") ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value="false"
                              checked={isChecked(index, "false")}
                              onChange={() => handleInputChange(index, "false")}
                            />
                            False
                          </label>
                        </div>
                      )}
                      <div className="answer-section">
                        <p className="correct-answer">
                          <b>Correct Answer:</b> {item.answer}
                        </p>
                        {showFeedback && getFeedback(item, index)}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleSubmit} className="submit-button">
                    Check Answers
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="results-heading">Summary</h2>
              <div className="summary-container">
                {/* Conditional Thumbnail Display */}
                {isYoutubeVideo && (
                  <div className="thumbnail-container">
                    {loadingThumbnail ? (
                      <div className="skeleton-thumbnail"></div>
                    ) : youtubeThumbnail ? (
                      <img
                        src={youtubeThumbnail}
                        alt="YouTube Video Thumbnail"
                        className="youtube-thumbnail"
                      />
                    ) : (
                      <div>Thumbnail not available.</div>
                    )}
                  </div>
                )}

                {/* Use ReactMarkdown to display the content */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    wrapper: ({ children }) => (
                      <div className="react-markdown">{children}</div>
                    ), // Apply class to the wrapper div
                    code({ node, inline, className, children, ...props }) {
                      const match = (className || "").match(/language-(\w+)/);
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          style={dracula} // Choose your theme
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {output}
                </ReactMarkdown>
              </div>
            </>
          )}

          {!result && <div>No result available.</div>}
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;
