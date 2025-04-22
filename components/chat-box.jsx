"use client";

import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { MessageCircle, X } from "lucide-react";
import { createMessage, getMessagesByOrgId } from "@/actions/messages";

function ChatBox({ organizationId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const { user } = useUser();
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  const toggleChat = () => {
    setIsOpen((prev) => {
      if (!prev) setHasNewMessage(false); // new message signal off
      return !prev;
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await createMessage({ message: input });
      setInput("");
      await loadMessages();
    } catch (err) {
      console.error("❌ Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async () => {
    try {
      const data = await getMessagesByOrgId(organizationId);

      if (data?.length > messages.length && !isOpen) {
        const latest = data[data.length - 1];
        if (latest.clerkUserId !== user.id) {
          setHasNewMessage(true);
        }
      }

      setMessages(data);
    } catch (err) {
      console.error("❌ Failed to load messages:", err);
    }
  };

  // 🔁 Poll every 3 seconds
  useEffect(() => {
    loadMessages(); // initial load
    const interval = setInterval(() => {
      loadMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, [organizationId]);

  // ⬇ Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ❌ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Floating Icon */}
      <div
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-700 z-50"
      >
        <MessageCircle size={24} />
        {!isOpen && hasNewMessage && (
          <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-green-500 animate-ping z-50" />
        )}
      </div>

      {/* Chat Box */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-20 right-5 w-80 h-[450px] bg-white shadow-xl rounded-2xl p-4 border border-gray-300 z-50 flex flex-col"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Chat</h2>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          {/* Messages with scroll only on hover */}
          <div className="flex-1 overflow-y-hidden hover:overflow-y-auto space-y-2 mb-2 pr-1 transition-all duration-300 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.clerkUserId === user.id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[70%] ${
                    msg.clerkUserId === user.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.user?.name && (
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.user.name}
                    </div>
                  )}
                  <div>{msg.message}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Field */}
          <div className="flex mt-2">
            <input
              type="text"
              className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm hover:bg-blue-700"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
