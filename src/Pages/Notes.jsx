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

import { motion, AnimatePresence } from "framer-motion";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingNoteId, setEditingNoteId] =
    useState(null);

  const [selectedNote, setSelectedNote] =
    useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // BODY SCROLL LOCK
  // =========================
  useEffect(() => {

    if (showModal || selectedNote) {
      document.body.style.overflow = "hidden";
    }

    else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [showModal, selectedNote]);

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

    }

    catch (err) {
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

    if (!title || !content) {
      return alert("Fill all fields");
    }

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
          "Content-Type": "application/json",
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

    }

    catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT NOTE
  // =========================
  const editNote = (note) => {

    setSelectedNote(null);

    setTitle(note.title || "");

    setContent(note.content || "");

    setEditingNoteId(note._id);

    setTimeout(() => {
      setShowModal(true);
    }, 50);
  };

  // =========================
  // DELETE NOTE
  // =========================
  const deleteNote = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/notes/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (selectedNote?._id === id) {
        setSelectedNote(null);
      }

      fetchNotes();

    }

    catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FILTER NOTES
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

    <div className="
      min-h-screen
      relative overflow-hidden
      bg-[#050816]
      text-white
      px-4 md:px-8 py-6
    ">

      {/* GRID */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "></div>

      {/* GLOW */}
      <div className="
        absolute top-[-100px] left-[-100px]
        w-[350px] h-[350px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      "></div>

      <div className="
        absolute bottom-[-100px] right-[-100px]
        w-[350px] h-[350px]
        bg-blue-500/20
        blur-[120px]
        rounded-full
      "></div>

      <div className="
        relative z-10
        max-w-7xl mx-auto
        space-y-8
      ">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-cyan-400/10
            bg-white/[0.04]
            backdrop-blur-3xl
            p-6 md:p-8
            shadow-[0_0_60px_rgba(0,0,0,0.45)]
          "
        >

          <div className="
            absolute top-0 right-0
            w-80 h-80
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "></div>

          <div className="
            relative z-10
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-6
          ">

            <div className="flex items-center gap-5">

              <div className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center justify-center
                shadow-[0_0_35px_rgba(59,130,246,0.35)]
              ">

                <BookOpen size={30} />

              </div>

              <div>

                <h1 className="
                  text-4xl md:text-5xl
                  font-black
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-400
                  to-white
                  text-transparent
                  bg-clip-text
                ">
                  My Notes
                </h1>

                <p className="
                  text-white/55
                  mt-2
                ">
                  Smart AI notes with premium experience ✨
                </p>

              </div>

            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={() => {

                setSelectedNote(null);

                setEditingNoteId(null);

                setTitle("");

                setContent("");

                setShowModal(true);

              }}
              className="
                group
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6 py-4
                rounded-2xl
                flex items-center justify-center gap-2
                hover:scale-105
                transition-all duration-300
                shadow-[0_0_35px_rgba(59,130,246,0.35)]
              "
            >

              <Plus size={18} />

              <span className="font-semibold">
                Create Note
              </span>

            </button>

          </div>

        </motion.div>

        {/* SEARCH */}
        <div className="relative">

          <Search
            className="
              absolute left-5 top-1/2
              -translate-y-1/2
              text-white/40
            "
            size={20}
          />

          <input
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
            "
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* NOTES */}
        <div className="
          grid sm:grid-cols-2 xl:grid-cols-3
          gap-7
        ">

          {filteredNotes.map((note, index) => (

            <motion.div
              key={note._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              onClick={() =>
                setSelectedNote(note)
              }
              className="
                group relative overflow-hidden
                rounded-[34px]
                border border-cyan-400/10
                bg-white/[0.04]
                backdrop-blur-3xl
                p-6
                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:shadow-[0_0_50px_rgba(59,130,246,0.18)]
                transition-all duration-500
                cursor-pointer
              "
            >

              <div className="
                absolute -top-20 -right-20
                w-56 h-56
                bg-cyan-500/20
                blur-[100px]
                rounded-full
              "></div>

              <div className="
                relative z-10
                flex items-start justify-between
              ">

                <div className="
                  flex items-start gap-4
                ">

                  <div className="
                    w-14 h-14
                    rounded-3xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    flex items-center justify-center
                  ">

                    <Sparkles size={20} />

                  </div>

                  <div>

                    <h2 className="
                      text-xl font-bold
                      line-clamp-1
                    ">
                      {note.title}
                    </h2>

                    <div className="
                      flex items-center gap-2
                      text-white/40
                      text-xs mt-3
                    ">

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
                <div className="
                  flex flex-col gap-2
                  relative z-20
                ">

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={(e) => {

                      e.preventDefault();
                      e.stopPropagation();

                      editNote(note);

                    }}
                    className="
                      w-10 h-10
                      rounded-2xl
                      bg-white/5
                      border border-white/10
                      flex items-center justify-center
                      hover:bg-yellow-500/20
                      hover:text-yellow-400
                      transition
                    "
                  >

                    <Pencil size={16} />

                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={(e) => {

                      e.preventDefault();
                      e.stopPropagation();

                      deleteNote(note._id);

                    }}
                    className="
                      w-10 h-10
                      rounded-2xl
                      bg-white/5
                      border border-white/10
                      flex items-center justify-center
                      hover:bg-red-500/20
                      hover:text-red-400
                      transition
                    "
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </div>

              <p className="
                relative z-10
                mt-6
                text-white/65
                leading-7
                text-sm
                line-clamp-5
              ">
                {note.content}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

      {/* VIEW NOTE MODAL */}
      <AnimatePresence>

        {selectedNote && !showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-50
              bg-black/70
              backdrop-blur-md
              flex items-center justify-center
              p-4
            "
            onClick={() =>
              setSelectedNote(null)
            }
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full max-w-3xl
                rounded-[36px]
                border border-cyan-400/10
                bg-[#0b1120]/95
                backdrop-blur-3xl
                p-8
                shadow-[0_0_70px_rgba(0,0,0,0.6)]
              "
            >

              <button
                onClick={() =>
                  setSelectedNote(null)
                }
                className="
                  absolute top-5 right-5
                  w-10 h-10
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  flex items-center justify-center
                "
              >

                <X size={18} />

              </button>

              <h2 className="
                text-3xl font-bold mb-6
                break-words
              ">
                {selectedNote.title}
              </h2>

              <div className="
                text-white/75
                leading-8
                whitespace-pre-wrap
                max-h-[65vh]
                overflow-y-auto
                pr-2
              ">
                {selectedNote.content}
              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[60]
              overflow-y-auto
              bg-black/70
              backdrop-blur-md
              flex items-center justify-center
              p-4
            "
          >

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="
                relative
                w-full max-w-2xl
                my-10
                rounded-[36px]
                border border-cyan-400/10
                bg-[#0b1120]/95
                backdrop-blur-3xl
                p-8
                shadow-[0_0_70px_rgba(0,0,0,0.6)]
              "
            >

              {/* CLOSE */}
              <button
                onClick={() => {

                  setShowModal(false);

                  setEditingNoteId(null);

                  setTitle("");

                  setContent("");

                }}
                className="
                  absolute top-5 right-5
                  w-10 h-10
                  rounded-xl
                  bg-white/5
                  hover:bg-white/10
                  flex items-center justify-center
                "
              >

                <X size={18} />

              </button>

              <h2 className="
                text-3xl font-bold mb-8
              ">

                {editingNoteId
                  ? "Edit Note"
                  : "Create Note"}

              </h2>

              <input
                className="
                  w-full p-4 mb-5
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  outline-none
                "
                placeholder="Enter title..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <textarea
                className="
                  w-full p-4
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  h-52 resize-none
                  outline-none
                "
                placeholder="Write your note..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
              />

              <button
                onClick={handleSaveNote}
                className="
                  w-full mt-6
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  py-4
                  rounded-2xl
                  font-semibold
                "
              >

                {editingNoteId
                  ? "Update Note"
                  : "Save Note"}

              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

export default Notes;