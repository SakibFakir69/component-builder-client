'use client';

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Message {
  _id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  conversationId: string;
  messages: Message[];
  userId: string;
}

export default function ChatLayoutDemo() {
  const [history, setHistory] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);





  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  // Fetch conversation history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/prompt/chat-history",
          { withCredentials: true }
        );
        const conversations = Array.isArray(res.data) ? res.data : res.data.data || [];
        setHistory(conversations);
        if (conversations.length > 0) setActiveConversation(conversations[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  // Send new message
  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversation) return;

    // Add user message locally
    const newMessage: Message = {
      _id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
    };

    setActiveConversation(updatedConversation);
    setHistory((prev) =>
      prev.map((conv) =>
        conv.conversationId === activeConversation.conversationId
          ? updatedConversation
          : conv
      )
    );

    // Send to backend and get AI response
    await createPrompt(input, activeConversation.conversationId);

    setInput("");
  };

  // Call backend to create prompt and add AI response
  const createPrompt = async (promptText: string, conversationId: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/prompt/create-prompt",
        { prompt: promptText, sessionId: conversationId },
        { withCredentials: true }
      );

      if (res.data.status && activeConversation) {
        const aiMessage: Message = {
          _id: Date.now().toString() + "-ai",
          role: "assistant",
          content: res.data.ai,
          timestamp: new Date().toISOString(),
        };

        const updatedConversation = {
          ...activeConversation,
          messages: [...activeConversation.messages, aiMessage],
        };

        setActiveConversation(updatedConversation);
        setHistory((prev) =>
          prev.map((conv) =>
            conv.conversationId === activeConversation.conversationId
              ? updatedConversation
              : conv
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div
        className={`absolute inset-y-0 left-0 z-20
          md:relative md:w-72 md:flex md:flex-col
          w-72 bg-gray-50 border-r border-gray-200 p-4
          transition-transform duration-300 ease-in-out
          ${isHistoryVisible ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg text-gray-800">Chats</h2>
          <button
            onClick={() => setIsHistoryVisible(false)}
            className="md:hidden text-gray-500 hover:bg-gray-200 p-1 rounded"
          >
            ✖
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {history.map((conv) => (
            <div
              key={conv.conversationId}
              onClick={() => setActiveConversation(conv)}
              className={`p-3 rounded-xl cursor-pointer transition-colors ${
                activeConversation?.conversationId === conv.conversationId
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <p className="font-medium truncate">
                {conv.messages[0]?.content.substring(0, 30) || "New Conversation"}
              </p>
              <p className="text-sm opacity-75 truncate">
                {conv.messages[conv.messages.length - 1]?.content.substring(0, 30) || ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT PANEL */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
          <button
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            ☰
          </button>
          <h2 className="font-semibold text-gray-800 text-lg">
            {activeConversation
              ? `Conversation ${activeConversation.conversationId}`
              : "Select a chat"}
          </h2>
          <div className="w-8"></div>
        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {activeConversation?.messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xl px-4 py-2 rounded-2xl text-sm break-words ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black/40 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition shadow"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
