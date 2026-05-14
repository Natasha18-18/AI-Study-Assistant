import { useEffect, useState } from "react";
import {
  BookOpen,
  Trash2,
  Search,
  Plus,
  Pencil,
  X,
  Sparkles,
  CalendarDays,
} from "lucide-react";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingNoteId, setEditingNoteId] =
    useState(null);

  // ✅ NEW
  const [selectedNote, setSelectedNote] =
    useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH NOTES
  // =========================
  const fetchNotes = async () => {
    try {

      const res = await fetch(
        "http://localhost:5000/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setNotes(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // =========================
  // SAVE NOTE
  // =========================
  const handleSaveNote = async () => {

    if (!title || !content)
      return alert("Fill all fields");

    try {

      const url = editingNoteId
        ? `http://localhost:5000/api/notes/${editingNoteId}`
        : "http://localhost:5000/api/notes";

      const method = editingNoteId
        ? "PUT"
        : "POST";

      await fetch(url, {
        method,

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          content,
          type: "manual",
        }),
      });

      setTitle("");
      setContent("");

      setEditingNoteId(null);

      setShowModal(false);

      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT NOTE
  // =========================
  const editNote = (note) => {

    setTitle(note.title);

    setContent(note.content);

    setEditingNoteId(note._id);

    setShowModal(true);
  };

  // =========================
  // DELETE NOTE
  // =========================
  const deleteNote = async (id) => {

    await fetch(
      `http://localhost:5000/api/notes/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchNotes();
  };

  // =========================
  // FILTER
  // =========================
  const filteredNotes = notes.filter(
    (n) =>
      n.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      n.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b16] via-[#0f172a] to-black text-white px-4 md:px-8 py-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.4)]">

          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-2xl">
                <BookOpen size={30} />
              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  My Notes
                </h1>

                <p className="text-white/60 mt-1">
                  Organize your thoughts,
                  AI notes & study
                  materials ✨
                </p>

              </div>

            </div>

            <button
              onClick={() => {

                setShowModal(true);

                setEditingNoteId(null);

                setTitle("");

                setContent("");

              }}
              className="group bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 shadow-xl"
            >

              <Plus size={18} />

              <span className="font-semibold">
                Create Note
              </span>

            </button>

          </div>

        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
            size={20}
          />

          <input
            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* ================= NOTES GRID ================= */}
        {filteredNotes.length > 0 ? (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredNotes.map((note) => (

              <div
                key={note._id}

                // ✅ CLICK NOTE
                onClick={() =>
                  setSelectedNote(note)
                }

                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/10 cursor-pointer"
              >

                {/* Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 blur-3xl rounded-full"></div>

                {/* TOP */}
                <div className="relative z-10 flex items-start justify-between gap-3">

                  <div className="flex items-start gap-3">

                    <div className="mt-1 w-11 h-11 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">

                      <Sparkles size={18} />

                    </div>

                    <div>

                      <h2 className="text-lg font-semibold line-clamp-1">
                        {note.title}
                      </h2>

                      <div className="flex items-center gap-2 text-white/40 text-xs mt-1">

                        <CalendarDays size={12} />

                        <span>
                          {new Date(
                            note.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

                    {/* EDIT */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        editNote(note);

                      }}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-yellow-500/20 flex items-center justify-center hover:text-yellow-400 transition"
                    >

                      <Pencil size={16} />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation();

                        deleteNote(note._id);

                      }}
                      className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-500/20 flex items-center justify-center hover:text-red-400 transition"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-5">

                  <p className="text-white/65 leading-relaxed text-sm line-clamp-6">
                    {note.content}
                  </p>

                </div>

                {/* BOTTOM */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">

                  <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    {note.type || "manual"}
                  </span>

                  <span className="text-xs text-white/40">
                    Note #{note._id.slice(-4)}
                  </span>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="flex flex-col items-center justify-center py-28 text-center">

            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">

              <BookOpen
                size={40}
                className="text-white/40"
              />

            </div>

            <h2 className="text-2xl font-bold">
              No Notes Found
            </h2>

            <p className="text-white/50 mt-2">
              Start creating your first
              smart note 🚀
            </p>

          </div>

        )}

      </div>

      {/* ================= CREATE / EDIT MODAL ================= */}
      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">

          <div className="relative w-full max-w-xl rounded-[32px] border border-white/10 bg-[#111827]/90 backdrop-blur-2xl p-7 shadow-[0_0_60px_rgba(0,0,0,0.5)]">

            {/* CLOSE */}
            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
            >

              <X size={18} />

            </button>

            <div className="flex items-center gap-4 mb-6">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">

                <BookOpen size={24} />

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  {editingNoteId
                    ? "Edit Note"
                    : "Create Note"}

                </h2>

                <p className="text-white/50 text-sm">
                  Write and save your
                  thoughts
                </p>

              </div>

            </div>

            {/* TITLE */}
            <div className="space-y-2 mb-5">

              <label className="text-sm text-white/60">
                Note Title
              </label>

              <input
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                placeholder="Enter title..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            {/* CONTENT */}
            <div className="space-y-2 mb-6">

              <label className="text-sm text-white/60">
                Note Content
              </label>

              <textarea
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 h-44 resize-none outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                placeholder="Write your note..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                onClick={handleSaveNote}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all shadow-xl"
              >

                {editingNoteId
                  ? "Update Note"
                  : "Save Note"}

              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= FULL NOTE VIEW ================= */}
      {selectedNote && (

        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-center justify-center px-4">

          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)]">

            {/* CLOSE */}
            <button
              onClick={() =>
                setSelectedNote(null)
              }
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
            >

              <X size={18} />

            </button>

            {/* HEADER */}
            <div className="p-7 border-b border-white/10">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shrink-0">

                  <BookOpen size={24} />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {selectedNote.title}
                  </h2>

                  <div className="flex items-center gap-2 text-white/40 text-sm mt-2">

                    <CalendarDays size={14} />

                    {new Date(
                      selectedNote.createdAt
                    ).toLocaleDateString()}

                  </div>

                </div>

              </div>

            </div>

            {/* CONTENT */}
            <div className="overflow-y-auto max-h-[60vh] p-7">

              <p className="text-white/75 leading-8 whitespace-pre-wrap">
                {selectedNote.content}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Notes;