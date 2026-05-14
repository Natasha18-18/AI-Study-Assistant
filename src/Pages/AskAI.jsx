import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

import { Sparkles, Bot, User, Plus, Paperclip,} from "lucide-react";

function AskAi() {
  const { id } = useParams();

  const defaultMessage = {
    type: "ai",
    question: "Welcome",
    answer: "Hello 👋 I am your AI Study Assistant. Ask me anything.",
  };

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const inputRef = useRef();
  const fileInputRef = useRef();

  // =========================
  // LOAD CHAT / DEFAULT
  // =========================
  useEffect(() => {
    const fetchConversation = async () => {
      if (!id) {
        setMessages([defaultMessage]);
        setConversationId(null);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (!data?.conversation?.messages) {
          setMessages([
            {
              type: "ai",
              question: "Error",
              answer: "No conversation found 😕",
            },
          ]);
          return;
        }

        const formatted = data.conversation.messages.map((msg, i, arr) => {
          if (msg.role === "user") {
            return { type: "user", text: msg.content };
          }

          const prev = arr[i - 1]?.content || "User";

          return {
            type: "ai",
            question: prev,
            answer: msg.content,
          };
        });

        setMessages(formatted);
        setConversationId(data.conversation._id);
      } catch (err) {
        console.log(err);

        setMessages([
          {
            type: "ai",
            question: "Error",
            answer: "Failed to load chat ❌",
          },
        ]);
      }
    };

    fetchConversation();
  }, [id]);

  // =========================
  // SAVE NOTE
  // =========================
  const saveNote = async (title, content, index) => {
    try {
      await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          content,
          type: "ai",
        }),
      });

      setSavedMessages((prev) => [...prev, index]);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const sendQuestion = async () => {
    const question = inputRef.current?.value.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: question },
    ]);

    inputRef.current.value = "";
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/chat/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            prompt: question,
            conversationId,
          }),
        }
      );

      const data = await res.json();

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          question,
          answer: data.answer || "No response",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          question: "Error",
          answer: "⚠️ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILE UPLOAD
  // =========================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    alert(`${file.name} selected successfully ✅`);
  };

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    const chatBox = document.getElementById("chatBox");

    if (!chatBox) return;

    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // =========================
  // UI
  // =========================
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-5">

      {/* MAIN CONTAINER */}
      <div className="h-[85vh] flex flex-col rounded-[30px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)]">

        {/* TOP BAR */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/10 bg-black/20 backdrop-blur-xl">

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-2xl shadow-lg text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              AI Study Assistant
            </h1>

            <p className="text-white/60 text-sm">
              Ask anything and learn faster 🚀
            </p>
          </div>

        </div>

        {/* CHAT AREA */}
        <div
          id="chatBox"
          className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6"
        >

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`relative flex gap-3 max-w-[90%] md:max-w-3xl px-5 py-4 rounded-[28px] shadow-lg ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/10 border border-white/10 backdrop-blur-xl text-white"
                }`}
              >

                {msg.type === "user" ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}

                <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base pr-8">
                  {msg.type === "ai"
                    ? msg.answer
                    : msg.text}
                </div>

                {msg.type === "ai" && (
                  <button
                    onClick={() =>
                      saveNote(
                        msg.question,
                        msg.answer,
                        index
                      )
                    }
                    className="absolute top-3 right-3"
                  >

                    {savedMessages.includes(index) ? (
                      <AiFillStar className="text-yellow-400 text-xl" />
                    ) : (
                      <AiOutlineStar className="text-gray-300 hover:text-yellow-400 text-xl" />
                    )}

                  </button>
                )}

              </div>

            </div>
          ))}

          {/* TYPING INDICATOR */}
          <div className="h-8 flex items-center gap-3 text-white/70 px-2">

            {loading ? (
              <>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>

                <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce delay-100"></div>

                <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-200"></div>

                <span className="text-sm ml-2">
                  AI is thinking...
                </span>
              </>
            ) : (
              <div className="opacity-0">.</div>
            )}

          </div>

        </div>

        {/* INPUT BAR */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl px-4 md:px-6 py-4">

          <div className="flex items-center gap-3">

            {/* UPLOAD BUTTON */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white"
            >
              <Plus size={20} />
            </button>

            {/* FILE INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* INPUT */}
            <div className="flex-1 flex items-center bg-white/10 border border-white/10 rounded-2xl px-4">

              <input
                ref={inputRef}
                type="text"
                disabled={loading}
                placeholder="Ask your study question..."
                onKeyDown={(e) =>
                  e.key === "Enter" && sendQuestion()
                }
                className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-white/40 outline-none"
              />

            </div>

            {/* SEND BUTTON */}
            <button
              onClick={sendQuestion}
              disabled={loading}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition"
            >
              <FiSend size={19} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AskAi;