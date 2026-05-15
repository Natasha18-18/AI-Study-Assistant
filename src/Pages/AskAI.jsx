import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FiSend } from "react-icons/fi";

import {
  Sparkles,
  Bot,
  User,
  Plus,
  Paperclip,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function AskAi() {
  const { id } = useParams();

  const defaultMessage = {
    type: "ai",
    question: "Welcome",
    answer:
      "Hello 👋 I am your AI Study Assistant. Ask me anything.",
  };

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const inputRef = useRef();
  const fileInputRef = useRef();

  // =========================
  // LOAD CHAT
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

        const formatted = data.conversation.messages.map(
          (msg, i, arr) => {
            if (msg.role === "user") {
              return {
                type: "user",
                text: msg.content,
              };
            }

            const prev = arr[i - 1]?.content || "User";

            return {
              type: "ai",
              question: prev,
              answer: msg.content,
            };
          }
        );

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
  // SEND QUESTION
  // =========================
  const sendQuestion = async () => {
    const question = inputRef.current?.value.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: question,
      },
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
    <div className="relative h-screen overflow-hidden bg-[#050816] text-white">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative h-full p-4 md:p-6">

        {/* MAIN CONTAINER */}
        <div className="
          h-full
          flex flex-col
          rounded-[38px]
          overflow-hidden
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-3xl
          shadow-[0_0_80px_rgba(0,0,0,0.55)]
        ">

          {/* TOP BAR */}
          <div className="
            flex items-center justify-between
            px-6 md:px-8 py-5
            border-b border-white/10
            bg-black/20 backdrop-blur-2xl
          ">

            <div className="flex items-center gap-4">

              <div className="
                p-3 rounded-2xl
                bg-gradient-to-r from-cyan-500 to-blue-600
                shadow-[0_0_25px_rgba(34,211,238,0.4)]
              ">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  AI Study Assistant
                </h1>

                <p className="text-white/50 text-sm">
                  Smart conversations powered by AI ⚡
                </p>
              </div>

            </div>

            {/* STATUS */}
            <div className="
              hidden md:flex
              items-center gap-2
              bg-white/5 border border-white/10
              px-4 py-2 rounded-full
            ">

              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>

              <span className="text-sm text-white/70">
                AI Online
              </span>

            </div>

          </div>

          {/* CHAT AREA */}
          <div
            id="chatBox"
            className="
              flex-1
              overflow-y-auto
              px-4 md:px-8 py-8
              space-y-7
              scrollbar-thin scrollbar-thumb-cyan-500/20
            "
          >

            <AnimatePresence>

              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`flex ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                      relative
                      flex gap-4
                      max-w-[92%] md:max-w-3xl
                      px-5 py-4
                      rounded-[28px]
                      transition-all duration-300

                      ${
                        msg.type === "user"
                          ? `
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-600
                            shadow-[0_0_30px_rgba(34,211,238,0.25)]
                          `
                          : `
                            bg-white/5
                            border border-white/10
                            backdrop-blur-2xl
                            shadow-[0_0_30px_rgba(255,255,255,0.03)]
                          `
                      }
                    `}
                  >

                    {/* ICON */}
                    <div className="
                      w-9 h-9
                      rounded-xl
                      flex items-center justify-center
                      bg-black/20
                      border border-white/10
                      shrink-0
                    ">

                      {msg.type === "user" ? (
                        <User size={17} />
                      ) : (
                        <Bot size={17} />
                      )}

                    </div>

                    {/* TEXT */}
                    <div className="
                      whitespace-pre-wrap
                      text-sm md:text-[15px]
                      leading-relaxed
                      text-white/90
                      pr-6
                    ">
                      {msg.type === "ai"
                        ? msg.answer
                        : msg.text}
                    </div>

                    {/* SAVE */}
                    {msg.type === "ai" && (
                      <button
                        onClick={() =>
                          saveNote(
                            msg.question,
                            msg.answer,
                            index
                          )
                        }
                        className="
                          absolute top-3 right-3
                          hover:scale-110
                          transition
                        "
                      >

                        {savedMessages.includes(index) ? (
                          <AiFillStar className="text-yellow-400 text-lg" />
                        ) : (
                          <AiOutlineStar className="text-white/40 hover:text-yellow-400 text-lg" />
                        )}

                      </button>
                    )}

                  </div>

                </motion.div>
              ))}

            </AnimatePresence>

            {/* LOADING */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >

                <div className="
                  flex items-center gap-3
                  px-5 py-4
                  rounded-[24px]
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                ">

                  <div className="flex gap-1">

                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />

                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />

                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />

                  </div>

                  <span className="text-sm text-white/60">
                    AI is thinking...
                  </span>

                </div>

              </motion.div>
            )}

          </div>

          {/* INPUT AREA */}
          <div className="
            border-t border-white/10
            bg-black/20
            backdrop-blur-2xl
            px-4 md:px-8 py-5
          ">

            <div className="
              flex items-center gap-3
              bg-white/5
              border border-white/10
              rounded-[28px]
              px-3 py-3
              focus-within:border-cyan-400/40
              transition-all
              shadow-[0_0_30px_rgba(255,255,255,0.03)]
            ">

              {/* UPLOAD */}
              <button
                onClick={() =>
                  fileInputRef.current.click()
                }
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                  hover:bg-white/10
                  hover:scale-105
                  transition
                "
              >

                <Plus size={20} />

              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* INPUT */}
              <input
                ref={inputRef}
                type="text"
                disabled={loading}
                placeholder="Ask anything... AI will help you"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  sendQuestion()
                }
                className="
                  flex-1
                  bg-transparent
                  px-3
                  text-white
                  placeholder:text-white/40
                  outline-none
                  text-sm md:text-base
                "
              />

              {/* SEND BUTTON */}
              <button
                onClick={sendQuestion}
                disabled={loading}
                className={`
                  relative
                  w-14 h-14
                  rounded-2xl
                  flex items-center justify-center
                  transition-all duration-300
                  shrink-0

                  ${
                    loading
                      ? `
                        bg-white/10
                        cursor-not-allowed
                      `
                      : `
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        hover:scale-105
                        active:scale-95
                        shadow-[0_0_30px_rgba(34,211,238,0.35)]
                      `
                  }
                `}
              >

                <FiSend
                  size={19}
                  className={loading ? "opacity-50" : ""}
                />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AskAi;