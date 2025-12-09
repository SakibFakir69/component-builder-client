"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import { v4 as uuidv4 } from 'uuid';
import { CopyButton } from "@/components/copy";


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

// 🔥 Function – detect & extract code blocks
const extractCode = (text: string) => {
  const regex = /```(\w+)?\n([\s\S]*?)```/;
  const match = text.match(regex);
  if (!match) return null;

  return {
    lang: match[1] || "javascript",
    code: match[2],
  };
};

export default function ChatLayoutDemo() {
  const [history, setHistory] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Scroll bottom when new messages load
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  // 🔥 Highlight Prism when new messages come
  useEffect(() => {
    Prism.highlightAll();
  }, [activeConversation]);



  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/prompt/chat-history",
          { withCredentials: true }
        );

        const conversations = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setHistory(conversations);
        if (conversations.length > 0) setActiveConversation(conversations[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  // handel copy 

  const handelCopy = (code)=>{

    return window.navigator.clipboard.writeText(code);

  }


  const x = ()=>{

    //// sesession id 
    /// prompt 
    alert("create new prompt")
    const sessionID =uuidv4();
    console.log(sessionID)

  }
  const handleSendMessage = async () => {
    if (!input.trim() || !activeConversation) return;

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
    setHistory(prev =>
      prev.map(conv =>
        conv.conversationId === activeConversation.conversationId
          ? updatedConversation
          : conv
      )
    );

    await createPrompt(input, activeConversation.conversationId);
    setInput("");
  };

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
        setHistory(prev =>
          prev.map(conv =>
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

  // 🔥 Render message with code or normal text
  const renderMessage = (msg: Message) => {
    const codeData = extractCode(msg.content);

    // If message contains code block
    if (codeData) {
  return (
    <div className="relative max-w-xl">
      {/* Render the copy button */}
      <CopyButton code={codeData.code} />

      <pre className="p-4 rounded-2xl bg-[#1e1e1e] text-[#cccccc] overflow-x-auto text-sm">
        <code className={`language-${codeData.lang}`}>
          {codeData.code}
        </code>
      </pre>
    </div>
  );
}

    // Otherwise render plain message
    return (
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
          msg.role === "user"
            ? "bg-black text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        {msg.content}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* LEFT SIDEBAR */}
      <div
        className={`absolute inset-y-0 left-0 z-20 
        md:relative md:w-72 md:flex md:flex-col
        w-72 bg-gray-50 border-r border-gray-200 p-4
        transition-transform duration-300 ease-in-out
        ${
          isHistoryVisible
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex justify-between w-full">
            <h2 className="font-semibold text-lg text-gray-800">Chats</h2>
            <button className="border">
              <PlusCircle onClick={x} color="black" />
            </button>
          </div>
          <button
            onClick={() => setIsHistoryVisible(false)}
            className="md:hidden text-gray-500 hover:bg-gray-200 p-1 rounded"
          >
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {history.map(conv => (
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
                {conv.messages[0]?.content.substring(0, 30) ||
                  "New Conversation"}
              </p>
              <p className="text-sm opacity-75 truncate">
                {conv.messages[conv.messages.length - 1]?.content.substring(
                  0,
                  30
                ) || ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col">
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
          {activeConversation?.messages.map(msg => (
            <div
              key={msg._id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {renderMessage(msg)}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black/40 outline-none"
              onKeyDown={e => e.key === "Enter" && handleSendMessage()}
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
