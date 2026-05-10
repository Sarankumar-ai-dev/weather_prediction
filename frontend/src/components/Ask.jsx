import React, { useState } from "react";
import "./askPage.css";

const Ask = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 Ask me about the weather!" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          place: "Chennai",
          date: new Date().toISOString().split("T")[0],
        }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "No response from chatbot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to backend" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ask-page">
      <h2 className="chat-title">Weather Assistant</h2>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="msg bot">
            Typing...
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Ask;