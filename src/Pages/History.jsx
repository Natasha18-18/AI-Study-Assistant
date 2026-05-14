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
} from "lucide-react";

function History() {
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  // 📥 LOAD HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/chat/history",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setHistory(data?.conversations || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  // 🧭 SAFE NAVIGATE FUNCTION (FIX)
  const openChat = (id) => {
    if (!id) return;
    navigate(`/dashboard/askai/${id}`);
  };

  // 🗑️ DELETE
  const deleteHistory = async (e, id) => {
    e.stopPropagation();

    try {
      await fetch(`http://localhost:5000/api/chat/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🧹 CLEAR ALL (FAST FIX)
  const clearAllHistory = async () => {
    try {
      await Promise.all(
        history.map((item) =>
          fetch(`http://localhost:5000/api/chat/${item._id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        )
      );

      setHistory([]);
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ UPDATE TITLE
  const updateTitle = async (e, id) => {
    e.stopPropagation();

    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title: editedTitle }),
        }
      );

      const data = await res.json();

      setHistory((prev) =>
        prev.map((item) =>
          item._id === id ? data.conversation : item
        )
      );

      setEditingId(null);
      setEditedTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 SAFE FILTER
  const filteredHistory = history.filter((item) => {
    const assistantMessage =
      item?.messages?.find((msg) => msg?.role === "assistant")?.content || "";

    return (
      item?.title?.toLowerCase?.().includes(search.toLowerCase()) ||
      assistantMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-black p-4 md:p-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-2xl text-white">
                <HistoryIcon size={26} />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  AI History 🕒
                </h1>
                <p className="text-white/60">
                  Your conversations, all in one place
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              <input
                type="text"
                placeholder="Search history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
              />
            </div>

          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center text-white/80">
          <div className="flex items-center gap-2">
            <Clock3 size={18} />
            <span>
              Total: <b>{filteredHistory.length}</b>
            </span>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="bg-red-500 px-4 py-2 rounded-xl text-white"
            >
              Clear All
            </button>
          )}
        </div>

        {/* LIST */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-5">

            {filteredHistory.map((item) => {

              const assistantMessage =
                item?.messages?.find((msg) => msg?.role === "assistant")?.content || "";

              const shortMessage =
                assistantMessage.length > 150
                  ? assistantMessage.slice(0, 150) + "..."
                  : assistantMessage;

              return (
                <div
                  key={item._id}
                  onClick={() => openChat(item._id)}   // ✅ FIXED HERE
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition cursor-pointer"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start gap-4">

                    <div className="flex gap-3 flex-1">

                      <div className="bg-purple-600 p-3 rounded-xl text-white">
                        <MessageSquare size={20} />
                      </div>

                      <div className="flex-1">

                        {editingId === item._id ? (
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <input
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                              className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white w-full"
                            />
                            <button onClick={(e) => updateTitle(e, item._id)}>
                              <Check className="text-green-400" />
                            </button>
                            <button onClick={() => setEditingId(null)}>
                              <X className="text-red-400" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-white">
                              {item.title}
                            </h2>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(item._id);
                                setEditedTitle(item.title);
                              }}
                            >
                              <Pencil size={16} />
                            </button>
                          </div>
                        )}

                      </div>
                    </div>

                    <button
                      onClick={(e) => deleteHistory(e, item._id)}
                      className="text-red-400"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>

                  {/* MESSAGE */}
                  <div className="mt-4 text-white/70 text-sm">
                    {shortMessage}
                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          <div className="text-center mt-20 text-white/60">
            <HistoryIcon size={60} />
            <h2 className="text-2xl font-bold mt-4 text-white">
              No History Yet
            </h2>
          </div>
        )}

      </div>
    </div>
  );
}

export default History;