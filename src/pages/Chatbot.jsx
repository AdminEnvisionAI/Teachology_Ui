import React, { useState, useEffect, useRef } from "react";
import "../assets/css/chatbot.css"; // Import the CSS file

const ChatSidebar = ({
  onNewChat,
  chatHistory,
  onSelectChat,
  selectedChatIndex,
  isMobileView,
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
      style={{ width: "260px" }}
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

      <div className="flex-grow-1 overflow-y-auto px-2" style={{ height: "0" }}>
        <div className="today-label">Today</div>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-item mb-1 rounded-1 p-3 d-flex align-items-center gap-3 ${
              index === selectedChatIndex ? "active-chat" : ""
            }`}
            onClick={() => {
              onSelectChat(index);
            }}
          >
            <i className="fas fa-message"></i>
            <span className="text-truncate">{chat.title}</span>
          </div>
        ))}
      </div>

      <div className="p-2 border-top">
        <button className="btn w-100 mb-2 d-flex align-items-center gap-3 p-3 rounded-1 upgrade-button">
          <i className="fas fa-star"></i>
          <span>Upgrade to Plus</span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-light w-100 d-flex align-items-center gap-3 p-3 rounded-1 user-button"
            data-bs-toggle="dropdown"
          >
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
              alt="User"
              className="rounded-circle"
              width="24"
              height="24"
            />
            <span className="text-start">John Doe</span>
            <i className="fas fa-ellipsis"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <a className="dropdown-item" href="#">
                <i className="fas fa-user me-2"></i>
                Custom Instructions
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cog me-2"></i>
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="fas fa-sign-out-alt me-2"></i>
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

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

const ChatDisplay = ({ messages }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex-grow-1 overflow-y-auto px-2 py-4 chat-display"
      ref={chatContainerRef}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-3 rounded-3 message ${
            message.sender === "user" ? "user-message" : "bot-message"
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload logic here
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
      <div className="mx-auto position-relative input-container">
        <div className="d-flex align-items-center rounded-3 overflow-hidden input-area px-3">
          <button className="btn file-button" onClick={handleFileClick}>
            <i className="fas fa-plus"></i>
            <input
              type="file"
              style={{ display: "none" }}
              accept="*"
              onChange={handleFileChange}
              ref={fileInputRef}
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
          />
          <button
            className="btn rounded-circle send-button"
            onClick={handleSendMessage}
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

const ChatApp = () => {
  const [chatHistory, setChatHistory] = useState([]); // Empty chat history
  const [selectedChatIndex, setSelectedChatIndex] = useState(null); // No chat selected initially
  const [messages, setMessages] = useState([]); // Empty messages

  const [isMobileView, setIsMobileView] = useState(false);

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

  const handleNewChat = () => {
    const newChat = { title: "New Chat", messages: [] };
    setChatHistory([...chatHistory, newChat]);
    setSelectedChatIndex(chatHistory.length);
    setMessages([]);
  };

  const handleSelectChat = (index) => {
    setSelectedChatIndex(index);
    setMessages(chatHistory[index].messages || []);
  };

  const handleSendMessage = (messageText) => {
    if (selectedChatIndex !== null) {
      const newMessage = { text: messageText, sender: "user" };
      const updatedMessages = [...messages, newMessage];

      setMessages(updatedMessages);

      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[selectedChatIndex] = {
        ...updatedChatHistory[selectedChatIndex],
        messages: updatedMessages,
      };
      setChatHistory(updatedChatHistory);

      setTimeout(() => {
        const botResponse = {
          text: `(Dummy Response) You said: ${messageText}.  Here is a slightly longer response to test the UI and make sure everything wraps correctly and scrolls as expected. This is all just placeholder text.`,
          sender: "bot",
        };
        //COMMENT OUT OR REMOVE THIS ENTIRE setTimeout BLOCK ONCE YOU HAVE REAL API CALLS
        //AND REPLACE WITH YOUR ACTUAL API CALL AND RESPONSE HANDLER

        const finalMessages = [...updatedMessages, botResponse];

        setMessages(finalMessages);

        const finalChatHistory = [...chatHistory];
        finalChatHistory[selectedChatIndex] = {
          ...finalChatHistory[selectedChatIndex],
          messages: finalMessages,
        };
        setChatHistory(finalChatHistory);
      }, 500);
    }
  };

  return (
    <div className="d-flex min-vh-100 chat-app">
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
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
        selectedChatIndex={selectedChatIndex}
        isMobileView={isMobileView}
      />
      <main className="flex-grow-1 d-flex flex-column position-relative main-content">
        {selectedChatIndex === null ? (
          <div
            className="flex-grow-1 overflow-y-auto px-2 py-4"
            style={{ borderLeft: "solid 0.1px #cfd2d9" }}
          >
            <h1 className="text-center mb-5 fw-semibold chatgpt-title">
              ChatGPT
            </h1>
            <ChatIntro />
          </div>
        ) : (
          <>
            <ChatDisplay messages={messages} />
          </>
        )}
        <InputBox onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
};

function Chatbot() {
  return (
    <div className="chatbot-container">
      <ChatApp />
    </div>
  );
}

export default Chatbot;
