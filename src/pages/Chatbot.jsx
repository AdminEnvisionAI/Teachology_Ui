import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import FaTrash
import "../assets/css/chatbot.css"; // Use Chatbot1's styles
import { useDispatch, useSelector } from "react-redux";
import {
  addChat,
  setCurrentChat,
  addMessage,
  selectChats,
  selectCurrentChat,
  selectCurrentChatId,
  deleteChat,
  updateLastBotMessage,
  setTokenInfo,
  selectTokenInfo,
  reorderChatNumbers,
  initializeChat,
  clearChat, // Import the new clearChat action
} from "../redux/chatSlice";
import { selectUserId } from "../redux/authSlice";
import axios from "axios";
import { askAssistant as askAssistantEndpoint } from "../../src/config/config";
import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper Components (from Chatbot1)
const ChatIntro = () => {
  return (
    <div id="chatbot" className="container mt-4">
      <p>
        Welcome! I'm your AI assistant. I can help you with a wide range of
        tasks. Here are just a few examples:
      </p>
    </div>
  );
};

const ChatSidebar = ({
  onNewChat,
  chatHistory,
  onSelectChat,
  selectedChatIndex,
  isMobileView,
  handleDeleteChat,
  handleClearChat,
}) => {
  const sidebarClasses = `d-flex flex-column flex-shrink-0 ${
    isMobileView ? "offcanvas offcanvas-start" : ""
  }`;

  return (
    <nav
      className={sidebarClasses}
      tabIndex="-1"
      id="offcanvasSidebar"
      aria-labelledby="offcanvasSidebarLabel"
    >
      <div className="offcanvas-header d-md-none">
        <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
          Chat History
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="p-2">
        <button
          className="btn btn-outline-primary w-100 d-flex align-items-center gap-3 p-3 new-chat-button"
          onClick={onNewChat}
        >
          <i className="fas fa-plus"></i>
          <span>New chat</span>
        </button>
      </div>

      <div
        className="flex-grow-1 overflow-y-auto px-2"
        style={{ height: "0" }}
      >
        <div className="today-label">Today</div>
        {chatHistory.map((chat, index) => (
          <div
            key={chat.id} // Use chat.id here
            className={`chat-item mb-1 rounded-1 p-3 d-flex align-items-center justify-content-between gap-3 ${
              chat.id === selectedChatIndex ? "active-chat" : ""
            }`}
            onClick={() => {
              onSelectChat(chat.id);
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <i className="fas fa-message"></i>
              <span className="text-truncate">{chat.name}</span>
            </div>
            {chat.name === "Chat 1" ? (
              <Button
                variant="warning"
                className="clear-chat-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearChat(chat.id);
                }}
              >
                <FaTrash /> {/* Trash Icon */}
              </Button>
            ) : (
              chat.name !== "Chat 1" && (
                <Button
                  variant="danger"
                  className="delete-chat-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                >
                  Delete
                </Button>
              )
            )}
          </div>
        ))}
      </div>

      <div className="p-2 border-top">
        <button className="btn w-100 mb-2 d-flex align-items-center gap-3 p-3 rounded-1 upgrade-button">
          <i className="fas fa-star"></i>
          <span>Upgrade to Plus</span>
        </button>
      </div>
    </nav>
  );
};

const ChatDisplay = ({ messages, tokenInfo }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (message, type) => {
    const sanitizedMessage = DOMPurify.sanitize(message);

    return (
      <div className="message-container">
        <div className="message-content">
          <ReactMarkdown
            children={sanitizedMessage}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = (className || "").match(/language-(\w+)/);
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
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
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-grow-1 overflow-y-auto px-2 chat-display"
      ref={chatContainerRef}
    >
      <div className="token-info">
        <strong className="token-info-text">
          Tokens Left: {tokenInfo?.tokens_left || 0} /{" "}
          {tokenInfo?.total_tokens || 1000}
        </strong>
      </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-3 rounded-3 message ${
            message.type === "user" ? "user-message" : "bot-message"
          }`}
        >
          {formatMessage(message.text, message.type)}
        </div>
      ))}
    </div>
  );
};

const InputBox = ({
  onSendMessage,
  isLoading,
  tokenLimitReached,
  fileError,
  handleFileChange,
  selectedFile,
  handleFileClick,
  fileInputRef,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector(".form-control");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return (
    <div className="p-4 input-box">
      {fileError && <div className="error-message">{fileError}</div>}
      {tokenLimitReached && (
        <div className="token-limit-message">
          No tokens used. Sign up or login to use tokens.
        </div>
      )}
      <div className="mx-auto position-relative input-container">
        <div className="d-flex align-items-center rounded-3 overflow-hidden input-area px-3">
          <button
            className="btn file-button"
            onClick={handleFileClick}
            disabled={tokenLimitReached}
          >
            <i className="fas fa-plus"></i>
            <input
              type="file"
              style={{ display: "none" }}
              accept="*"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={tokenLimitReached}
            />
          </button>
          <button className="btn search-button">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="form-control flex-grow-1 bg-transparent border-0 py-3 input-field"
            placeholder="Ask anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={tokenLimitReached}
          />
          <button
            className="btn rounded-circle send-button"
            onClick={handleSendMessage}
            disabled={isLoading || tokenLimitReached}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <div className="text-center mt-2 disclaimer">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

function ChatBot() {
  // --- Hooks and Selectors ---
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  const currentChat = useSelector(selectCurrentChat);
  const currentChatId = useSelector(selectCurrentChatId);
  const userId = useSelector(selectUserId);
  const tokenInfo = useSelector(selectTokenInfo);

  // --- State Variables ---
  const chatBodyRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenLimitReached, setTokenLimitReached] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const fileInputRef = useRef(null); // ref for file input

  const MAX_TEXTAREA_HEIGHT = 150;

  // --- Effects ---

  // Scroll to bottom of chat on message update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  // Initialize Chat on Mount
  useEffect(() => {
    dispatch(initializeChat());

    // Clear Chat 1 on initial load/refresh
    const chat1 = chats.find((chat) => chat.name === "Chat 1"); // Find Chat 1
    if (chat1) {
      dispatch(clearChat(chat1.id)); // Clear it using its ID
    }
  }, [dispatch]);

  // Fetch Initial Token Info on Mount
  useEffect(() => {
    if (userId) {
      fetchInitialTokenInfo();
    }
  }, [userId]);

  // Update Token Limit Reached State
  useEffect(() => {
    if (tokenInfo && tokenInfo.tokens_left === 0) {
      setTokenLimitReached(true);
    } else {
      setTokenLimitReached(false);
    }
  }, [tokenInfo]);

  useEffect(() => {
    const checkIsMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkIsMobileView();
    window.addEventListener("resize", checkIsMobileView);

    return () => {
      window.removeEventListener("resize", checkIsMobileView);
    };
  }, []);

  // --- Handlers ---

  // Handle Textarea Height Adjustment
  const handleTextareaChange = (event) => {
    const element = event.target;
    element.style.height = "auto";
    let newHeight = element.scrollHeight;

    if (newHeight > MAX_TEXTAREA_HEIGHT) {
      newHeight = MAX_TEXTAREA_HEIGHT;
    }

    element.style.height = newHeight + "px";
    setTextareaHeight(element.style.height);
  };

  // Handle New Chat Creation
  const handleNewChat = () => {
    dispatch(addChat());
  };

  // Handle Chat Selection
  const handleChatSelect = (chatId) => {
    dispatch(setCurrentChat(chatId));
  };

  // Handle Chat Deletion (except Chat 1)
  const handleDeleteChat = (chatId) => {
    if (chats.length > 1 && chats[0].id !== chatId) {
      dispatch(deleteChat(chatId));
      dispatch(reorderChatNumbers()); // Dispatch the reorder action
    }
  };

  // Handle Chat Clearing (Chat 1)
  const handleClearChat = (chatId) => {
    dispatch(clearChat(chatId));
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // --- API Calls ---

  // Fetch Initial Token Information
  const fetchInitialTokenInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      const response = await axios.post(
        `${apiUrl}/api/get_initial_token_info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setTokenInfo(response.data));
    } catch (error) {
      console.error("Error fetching initial token info:", error);
    }
  };

  // Fetch Token Information after message sent
  const fetchTokenInfo = async (query) => {
    try {
      const formData = new FormData();
      formData.append("query", query);
      formData.append("user_id", userId);

      const response = await axios.post(
        `${apiUrl}/api/get_token_info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(setTokenInfo(response.data));
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  // --- Form Submission ---
  const onSubmit = async (userMessage) => {
    if (!selectedFile) {
      setFileError("Please upload a document before sending.");
      return;
    }

    setFileError("");

    const formData = new FormData();
    formData.append("request", userMessage);
    if (selectedFile) {
      formData.append("uploadedFiles", selectedFile);
    }
    formData.append("user_id", userId);

    const sanitizedUserMessage = DOMPurify.sanitize(userMessage);

    // Add user message to the chat
    dispatch(
      addMessage({
        chatId: currentChatId,
        message: sanitizedUserMessage,
        type: "user",
      })
    );

    // Add an empty bot message for the response
    dispatch(
      addMessage({
        chatId: currentChatId,
        message: "",
        type: "bot",
      })
    );

    setIsLoading(true);
    let fullResponse = "";

    try {
      const response = await fetch(`${apiUrl}${askAssistantEndpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      async function readStream() {
        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const chunk = decoder.decode(value);
            const parsedChunk = JSON.parse(chunk);

            if (parsedChunk.type === "text") {
              fullResponse += parsedChunk.response;
              dispatch(
                updateLastBotMessage({
                  chatId: currentChatId,
                  newMessage: fullResponse,
                })
              );
            } else if (parsedChunk.type === "error") {
              console.error("Error from stream:", parsedChunk.error);
              toast.error("Error getting response.");
              dispatch(
                updateLastBotMessage({
                  chatId: currentChatId,
                  newMessage: "Error getting response.",
                })
              );
              break;
            }
          }
        } catch (e) {
          console.error("Stream processing error:", e);
          toast.error("Stream processing error.");
          dispatch(
            updateLastBotMessage({
              chatId: currentChatId,
              newMessage: "Error processing stream.",
            })
          );
        } finally {
          setIsLoading(false);
          fetchTokenInfo(userMessage);
        }
      }

      await readStream();
    } catch (error) {
      console.error("API error:", error);
      toast.error("API error.");
      dispatch(
        updateLastBotMessage({
          chatId: currentChatId,
          newMessage: "Error getting response.",
        })
      );
      setIsLoading(false);
      fetchTokenInfo(userMessage);
    } finally {
      reset();
      setSelectedFile(null);
      setPreview(null);
      setTextareaHeight("auto");
    }
  };

  const handleSendMessage = (messageText) => {
    onSubmit(messageText);
  };

  const chatsLimited = chats.length < 7;

  return (
    <div className="d-flex chat-app">
       <ToastContainer />
      {/* Button to toggle the offcanvas sidebar (only in mobile view) */}
      {isMobileView && (
        <button
          className="btn btn-dark d-md-none mobile-sidebar-toggle"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
      )}

      <ChatSidebar
        onNewChat={handleNewChat}
        chatHistory={chats}
        onSelectChat={handleChatSelect}
        selectedChatIndex={currentChatId}
        isMobileView={isMobileView}
        handleDeleteChat={handleDeleteChat}
        handleClearChat={handleClearChat}
      />
      <main className="flex-grow-1 d-flex flex-column position-relative main-content">
        {currentChatId === null ? (
          <div
            className="flex-grow-1 overflow-y-auto px-2 py-4"
            style={{ borderLeft: "solid 0.1px #cfd2d9" }}
          >
            <ChatIntro />
          </div>
        ) : (
          <>
            <ChatDisplay
              messages={currentChat?.messages || []}
              tokenInfo={tokenInfo} // Pass tokenInfo here
            />
          </>
        )}
        <InputBox
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          tokenLimitReached={tokenLimitReached}
          fileError={fileError}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          handleFileClick={handleFileClick}
          fileInputRef={fileInputRef}
        />
      </main>
    </div>
  );
}

export default ChatBot;