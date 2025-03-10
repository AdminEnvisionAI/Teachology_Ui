import React, { useState, useEffect, useRef } from "react";

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
      style={{ width: "260px", backgroundColor: "var(--background-color)" }}
    >
      <div
        className="offcanvas-header d-md-none"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <h5
          className="offcanvas-title"
          id="offcanvasSidebarLabel"
          style={{ color: "var(--heading-color)" }}
        >
          Chat History
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          style={{ backgroundColor: "var(--default-color)" }}
        ></button>
      </div>
      <div className="p-2">
        <button
          className="btn btn-outline-primary w-100 d-flex align-items-center gap-3 p-3"
          style={{
            borderRadius: "0.375rem",
            height: "44px",
            color: "var(--accent-color)",
            borderColor: "var(--accent-color)",
          }}
          onClick={onNewChat}
        >
          <i className="fas fa-plus"></i>
          <span style={{ fontSize: "14px" }}>New chat</span>
        </button>
      </div>

      <div className="flex-grow-1 overflow-y-auto px-2" style={{ height: "0" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--default-color)",
            padding: "8px 12px",
          }}
        >
          Today
        </div>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-item mb-1 rounded-1 p-3 d-flex align-items-center gap-3 ${
              index === selectedChatIndex ? "active-chat" : ""
            }`}
            style={{
              fontSize: "14px",
              color: "var(--default-color)",
              backgroundColor:
                index === selectedChatIndex
                  ? "rgba(41, 98, 255, 0.1)"
                  : "transparent",
              cursor: "pointer",
            }}
            onClick={() => {
              onSelectChat(index);
            }}
          >
            <i className="fas fa-message"></i>
            <span className="text-truncate">{chat.title}</span>
          </div>
        ))}
      </div>

      <div
        className="p-2 border-top"
        style={{ borderColor: "var(--default-color)" }}
      >
        <button
          className="btn w-100 mb-2 d-flex align-items-center gap-3 p-3 rounded-1"
          style={{
            background: "var(--accent-color)",
            color: "var(--contrast-color)",
            fontSize: "14px",
            height: "44px",
          }}
        >
          <i className="fas fa-star"></i>
          <span>Upgrade to Plus</span>
        </button>

        <div className="dropdown">
          <button
            className="btn btn-light w-100 d-flex align-items-center gap-3 p-3 rounded-1"
            style={{
              fontSize: "14px",
              height: "44px",
              color: "var(--default-color)",
            }}
            data-bs-toggle="dropdown"
          >
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
              alt="User"
              className="rounded-circle"
              width="24"
              height="24"
            />
            <span
              className="text-start"
              style={{ color: "var(--default-color)" }}
            >
              John Doe
            </span>
            <i
              className="fas fa-ellipsis"
              style={{ color: "var(--default-color)" }}
            ></i>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            style={{ backgroundColor: "var(--nav-dropdown-background-color)" }}
          >
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ color: "var(--nav-dropdown-color)" }}
              >
                <i className="fas fa-user me-2"></i>
                Custom Instructions
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ color: "var(--nav-dropdown-color)" }}
              >
                <i className="fas fa-cog me-2"></i>
                Settings
              </a>
            </li>
            <li>
              <hr
                className="dropdown-divider"
                style={{ borderColor: "var(--default-color)" }}
              />
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ color: "var(--nav-dropdown-color)" }}
              >
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
    <div
      className="container mt-4"
      style={{
        color: "var(--default-color)",
        backgroundColor: "var(--background-color)",
      }}
    >
      <p>
        Welcome! I'm your AI assistant. I can help you with a wide range of
        tasks. Here are just a few examples:
      </p>
      <ul>
        <li>
          Write creative content like poems, code, scripts, musical pieces,
          email, letters, etc.
        </li>
        <li>
          Answer your questions in an informative way, even if they are open
          ended, challenging, or strange.
        </li>
        <li>Summarize factual topics or create stories.</li>
        <li>Translate languages.</li>
        <li>And much more!</li>
      </ul>
      <p>Feel free to explore my capabilities. What can I do for you today?</p>
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
      className="flex-grow-1 overflow-y-auto px-5 py-4"
      ref={chatContainerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background-color)",
        color: "var(--default-color)",
      }}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-3 rounded-3 ${
            message.sender === "user"
              ? "bg-primary text-white align-self-end"
              : "bg-light align-self-start"
          }`}
          style={{
            maxWidth: "70%",
            color:
              message.sender === "user"
                ? "var(--contrast-color)"
                : "var(--default-color)",
            backgroundColor:
              message.sender === "user"
                ? "var(--accent-color)"
                : "var(--surface-color)",
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div
      className="p-4 position-relative"
      style={{
        background:
          "linear-gradient(180deg, rgba(53,55,64,0), var(--background-color) 58.85%)",
        color: "var(--default-color)",
      }}
    >
      <div className="mx-auto position-relative" style={{ maxWidth: "48rem" }}>
        <div
          className="d-flex align-items-center rounded-3 overflow-hidden"
          style={{ background: "var(--surface-color)" }}
        >
          <button
            className="btn"
            style={{ minWidth: "40px", color: "var(--default-color)" }}
          >
            <i className="fas fa-plus"></i>
          </button>
          <button
            className="btn"
            style={{ minWidth: "40px", color: "var(--default-color)" }}
          >
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="form-control flex-grow-1 bg-transparent border-0 py-3"
            placeholder="Ask anything"
            style={{ fontSize: "1rem", color: "var(--default-color)" }}
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
            className="btn rounded-circle"
            onClick={handleSendMessage}
            style={{ color: "var(--default-color)" }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <div
          className="text-center mt-2"
          style={{ fontSize: "0.75rem", color: "var(--default-color)" }}
        >
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

const ChatApp = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      title: "AI Poem Generator",
      messages: [
        { text: "Write a short poem about the ocean.", sender: "user" },
        {
          text: "Sure, here's a short poem:\nThe ocean vast, a sapphire dream,\nWith waves that crash and softly gleam.\nA world of wonder, deep and blue,\nA timeless dance, forever true.",
          sender: "bot",
        },
      ],
    },
    {
      title: "Summarize Quantum Physics",
      messages: [
        {
          text: "Can you summarize quantum physics in a few sentences?",
          sender: "user",
        },
        {
          text: "Quantum physics explores the bizarre behavior of matter and energy at the atomic and subatomic levels. It reveals that energy is quantized, meaning it exists in discrete packets, and that particles can exhibit wave-like properties and vice-versa (wave-particle duality).  Key concepts include superposition (existing in multiple states at once) and entanglement (instantaneous correlation between particles regardless of distance). Quantum physics is the foundation for many modern technologies, but its underlying principles remain a subject of ongoing research and philosophical debate.",
          sender: "bot",
        },
      ],
    },
    {
      title: "Translate to Spanish",
      messages: [
        { text: "Translate 'Hello, how are you?' to Spanish.", sender: "user" },
        { text: "'Hola, ¿cómo estás?'", sender: "bot" },
      ],
    },
  ]);

  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [messages, setMessages] = useState(chatHistory[0].messages);
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
    <div
      className="d-flex min-vh-100"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      {/* Button to toggle the offcanvas sidebar (only in mobile view) */}
      {isMobileView && (
        <button
          className="btn btn-dark d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
            backgroundColor: "var(--accent-color)",
            borderColor: "var(--accent-color)",
            color: "var(--contrast-color)",
          }}
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
      <main className="flex-grow-1 d-flex flex-column position-relative">
        {selectedChatIndex === null ? (
          <div className="flex-grow-1 overflow-y-auto px-2 py-4">
            <h1
              className="text-center mb-5 fw-semibold"
              style={{ fontSize: "2rem", color: "var(--heading-color)" }}
            >
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
    <div style={{ backgroundColor: "var(--background-color)" }}>
      <ChatApp />
    </div>
  );
}

export default Chatbot;
