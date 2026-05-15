import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  History as HistoryIcon,
  Trash2,
  Search,
  MessageSquare,
  Clock3,
  Pencil,
  Check,
  X,
  Sparkles,
  ChevronRight,
  BrainCircuit,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function History() {

  const navigate = useNavigate();

  const [editingId, setEditingId] =
    useState(null);

  const [editedTitle, setEditedTitle] =
    useState("");

  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // =========================
  // LOAD HISTORY
  // =========================
  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/chat/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );

        const data = await res.json();

        setHistory(
          data?.conversations || []
        );

      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();

  }, []);

  // =========================
  // OPEN CHAT
  // =========================
  const openChat = (id) => {

    if (!id) return;

    navigate(`/dashboard/askai/${id}`);
  };

  // =========================
  // DELETE
  // =========================
  const deleteHistory = async (
    e,
    id
  ) => {

    e.stopPropagation();

    try {

      await fetch(
        `http://localhost:5000/api/chat/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setHistory((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // CLEAR ALL
  // =========================
  const clearAllHistory =
    async () => {

      try {

        await Promise.all(
          history.map((item) =>
            fetch(
              `http://localhost:5000/api/chat/${item._id}`,
              {
                method: "DELETE",

                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "token"
                  )}`,
                },
              }
            )
          )
        );

        setHistory([]);

      } catch (error) {
        console.error(error);
      }
    };

  // =========================
  // UPDATE TITLE
  // =========================
  const updateTitle = async (
    e,
    id
  ) => {

    e.stopPropagation();

    try {

      const res = await fetch(
        `http://localhost:5000/api/chat/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },

          body: JSON.stringify({
            title: editedTitle,
          }),
        }
      );

      const data = await res.json();

      setHistory((prev) =>
        prev.map((item) =>
          item._id === id
            ? data.conversation
            : item
        )
      );

      setEditingId(null);

      setEditedTitle("");

    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredHistory =
    history.filter((item) => {

      const assistantMessage =
        item?.messages?.find(
          (msg) =>
            msg?.role === "assistant"
        )?.content || "";

      return (
        item?.title
          ?.toLowerCase?.()
          .includes(
            search.toLowerCase()
          ) ||

        assistantMessage
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

  return (
    <div
      className="
      min-h-screen
      relative overflow-hidden
      bg-[#050816]
      text-white
      px-4 md:px-8 py-6
    "
    >

      {/* BACKGROUND GRID */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "
      ></div>

      {/* GLOW EFFECTS */}
      <div
        className="
        absolute top-[-120px] left-[-120px]
        w-[400px] h-[400px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      "
      ></div>

      <div
        className="
        absolute bottom-[-120px] right-[-120px]
        w-[400px] h-[400px]
        bg-blue-600/20
        blur-[120px]
        rounded-full
      "
      ></div>

      <div
        className="
        relative z-10
        max-w-7xl mx-auto
        space-y-8
      "
      >

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-cyan-400/10
            bg-white/[0.05]
            backdrop-blur-3xl
            p-6 md:p-8
            shadow-[0_0_60px_rgba(0,0,0,0.45)]
          "
        >

          <div
            className="
            absolute top-0 right-0
            w-80 h-80
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "
          ></div>

          <div
            className="
            relative z-10
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
          >

            {/* LEFT */}
            <div
              className="
              flex items-center gap-5
            "
            >

              <div
                className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center justify-center
                shadow-[0_0_35px_rgba(59,130,246,0.35)]
              "
              >

                <HistoryIcon size={30} />

              </div>

              <div>

                <h1
                  className="
                  text-4xl md:text-5xl
                  font-black
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-white
                  text-transparent
                  bg-clip-text
                "
                >
                  AI History
                </h1>

                <p
                  className="
                  text-white/55
                  mt-2
                "
                >
                  Your premium AI conversations ✨
                </p>

              </div>

            </div>

            {/* SEARCH */}
            <div
              className="
              relative
              w-full lg:w-[420px]
            "
            >

              <Search
                className="
                  absolute left-5 top-1/2
                  -translate-y-1/2
                  text-white/40
                "
                size={20}
              />

              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  w-full
                  pl-14 pr-5 py-4
                  rounded-2xl
                  bg-white/[0.05]
                  border border-white/10
                  backdrop-blur-2xl
                  text-white
                  outline-none
                  focus:border-cyan-400/40
                  focus:ring-2
                  focus:ring-cyan-400/20
                  transition-all
                "
              />

            </div>

          </div>

        </motion.div>

        {/* ================= ACTION BAR ================= */}
        <div
          className="
          flex flex-col sm:flex-row
          justify-between
          gap-4
          items-center
        "
        >

          <div
            className="
            flex items-center gap-3
            text-white/70
            bg-white/5
            border border-white/10
            px-5 py-3
            rounded-2xl
            backdrop-blur-xl
          "
          >

            <Clock3 size={18} />

            <span>
              Total Conversations :
            </span>

            <span
              className="
              text-cyan-300
              font-bold
            "
            >
              {filteredHistory.length}
            </span>

          </div>

          {history.length > 0 && (
            <button
              onClick={
                clearAllHistory
              }
              className="
                px-5 py-3
                rounded-2xl
                bg-red-500/20
                border border-red-500/20
                text-red-300
                hover:bg-red-500/30
                transition-all
                font-semibold
              "
            >
              Clear All
            </button>
          )}

        </div>

        {/* ================= HISTORY LIST ================= */}
        {filteredHistory.length >
        0 ? (

          <div
            className="
            grid
            lg:grid-cols-2
            gap-6
          "
          >

            {filteredHistory.map(
              (item, index) => {

                const assistantMessage =
                  item?.messages?.find(
                    (msg) =>
                      msg?.role ===
                      "assistant"
                  )?.content || "";

                const shortMessage =
                  assistantMessage.length >
                  180
                    ? assistantMessage.slice(
                        0,
                        180
                      ) + "..."
                    : assistantMessage;

                return (

                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.05,
                    }}
                    onClick={() =>
                      openChat(item._id)
                    }
                    className="
                      group relative overflow-hidden
                      rounded-[32px]
                      border border-cyan-400/10
                      bg-gradient-to-br
                      from-white/[0.08]
                      via-white/[0.04]
                      to-transparent
                      backdrop-blur-3xl
                      p-6
                      hover:-translate-y-2
                      hover:border-cyan-400/30
                      hover:shadow-[0_0_50px_rgba(59,130,246,0.18)]
                      transition-all duration-500
                      cursor-pointer
                    "
                  >

                    {/* GLOW */}
                    <div
                      className="
                      absolute -top-20 -right-20
                      w-56 h-56
                      bg-cyan-500/20
                      blur-[100px]
                      rounded-full
                      opacity-0
                      group-hover:opacity-100
                      transition-all duration-700
                    "
                    ></div>

                    {/* TOP */}
                    <div
                      className="
                      relative z-10
                      flex justify-between
                      items-start gap-4
                    "
                    >

                      <div
                        className="
                        flex gap-4 flex-1
                      "
                      >

                        {/* ICON */}
                        <div
                          className="
                          w-14 h-14
                          rounded-3xl
                          bg-gradient-to-br
                          from-cyan-500
                          to-blue-600
                          flex items-center justify-center
                          shadow-[0_0_30px_rgba(59,130,246,0.35)]
                          shrink-0
                        "
                        >

                          <BrainCircuit
                            size={22}
                          />

                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">

                          <div
                            className="
                            flex items-center gap-2
                            mb-3
                          "
                          >

                            <span
                              className="
                              text-[10px]
                              uppercase
                              tracking-[2px]
                              px-2 py-1
                              rounded-full
                              bg-cyan-500/10
                              text-cyan-300
                              border border-cyan-500/20
                            "
                            >
                              AI CHAT
                            </span>

                          </div>

                          {editingId ===
                          item._id ? (

                            <div
                              className="
                              flex gap-2
                            "
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >

                              <input
                                value={
                                  editedTitle
                                }
                                onChange={(e) =>
                                  setEditedTitle(
                                    e.target
                                      .value
                                  )
                                }
                                className="
                                  flex-1
                                  bg-white/5
                                  border border-white/10
                                  rounded-xl
                                  px-4 py-3
                                  text-white
                                  outline-none
                                  focus:border-cyan-400/40
                                "
                              />

                              <button
                                onClick={(e) =>
                                  updateTitle(
                                    e,
                                    item._id
                                  )
                                }
                                className="
                                  w-11 h-11
                                  rounded-xl
                                  bg-green-500/20
                                  flex items-center justify-center
                                  text-green-400
                                "
                              >

                                <Check
                                  size={18}
                                />

                              </button>

                              <button
                                onClick={(
                                  e
                                ) => {

                                  e.stopPropagation();

                                  setEditingId(
                                    null
                                  );

                                }}
                                className="
                                  w-11 h-11
                                  rounded-xl
                                  bg-red-500/20
                                  flex items-center justify-center
                                  text-red-400
                                "
                              >

                                <X
                                  size={18}
                                />

                              </button>

                            </div>

                          ) : (

                            <div>

                              <div
                                className="
                                flex items-center gap-3
                              "
                              >

                                <h2
                                  className="
                                  text-xl
                                  font-bold
                                  text-white
                                  line-clamp-1
                                "
                                >
                                  {item.title}
                                </h2>

                                <button
                                  onClick={(
                                    e
                                  ) => {

                                    e.stopPropagation();

                                    setEditingId(
                                      item._id
                                    );

                                    setEditedTitle(
                                      item.title
                                    );

                                  }}
                                  className="
                                    w-8 h-8
                                    rounded-lg
                                    bg-white/5
                                    border border-white/10
                                    flex items-center justify-center
                                    hover:bg-cyan-500/20
                                    hover:text-cyan-300
                                    transition
                                  "
                                >

                                  <Pencil
                                    size={14}
                                  />

                                </button>

                              </div>

                              <p
                                className="
                                mt-4
                                text-white/65
                                leading-7
                                text-sm
                                line-clamp-4
                              "
                              >
                                {
                                  shortMessage
                                }
                              </p>

                            </div>

                          )}

                        </div>

                      </div>

                      {/* DELETE */}
                      <button
                        onClick={(e) =>
                          deleteHistory(
                            e,
                            item._id
                          )
                        }
                        className="
                          w-11 h-11
                          rounded-2xl
                          bg-white/5
                          border border-white/10
                          flex items-center justify-center
                          hover:bg-red-500/20
                          hover:text-red-400
                          transition
                          shrink-0
                        "
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                    {/* FOOTER */}
                    <div
                      className="
                      relative z-10
                      mt-6 pt-5
                      border-t border-white/10
                      flex items-center justify-between
                    "
                    >

                      <div
                        className="
                        flex items-center gap-2
                      "
                      >

                        <div
                          className="
                          w-2 h-2
                          rounded-full
                          bg-green-400
                          animate-pulse
                        "
                        ></div>

                        <span
                          className="
                          text-xs text-white/50
                        "
                        >
                          Saved Conversation
                        </span>

                      </div>

                      <div
                        className="
                        flex items-center gap-2
                        text-cyan-300
                        text-sm
                        font-medium
                      "
                      >

                        Open Chat

                        <ChevronRight
                          size={16}
                        />

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        ) : (

          <div
            className="
            flex flex-col
            items-center justify-center
            py-32 text-center
          "
          >

            <div
              className="
              w-28 h-28
              rounded-full
              bg-white/5
              border border-white/10
              flex items-center justify-center
              mb-8
              backdrop-blur-2xl
            "
            >

              <HistoryIcon
                size={42}
                className="text-white/40"
              />

            </div>

            <h2
              className="
              text-3xl font-bold
            "
            >
              No History Found
            </h2>

            <p
              className="
              text-white/50
              mt-3
            "
            >
              Your AI conversations will appear here 🚀
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default History;