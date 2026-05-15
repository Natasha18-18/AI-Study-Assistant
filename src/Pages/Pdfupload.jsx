// ==========================
// UploadPDF.jsx PREMIUM UI
// ==========================

import { useState, useEffect } from "react";

import {
  UploadCloud,
  FileText,
  Sparkles,
  Loader2,
  Save,
  FileUp,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  Stars,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function UploadPDF() {

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [summary, setSummary] =
    useState("");

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const token =
    localStorage.getItem("token");

  // =========================
  // LOAD SAVED SUMMARY
  // =========================
  useEffect(() => {

    const saved =
      localStorage.getItem(
        "pdfSummary"
      );

    if (saved) {
      setSummary(saved);
    }

  }, []);

  // =========================
  // FILE CHANGE
  // =========================
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (
      file?.type ===
      "application/pdf"
    ) {

      setSelectedFile(file);

    } else {

      alert("Only PDF allowed");
    }
  };

  // =========================
  // UPLOAD PDF
  // =========================
  const handleUpload = async () => {

    if (!selectedFile) return;

    setLoading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "pdf",
        selectedFile
      );

      const res = await fetch(
        "http://localhost:5000/api/pdf/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Upload failed"
        );
      }

      setSummary(
        data.summary || ""
      );

      setFileName(
        data.title ||
          selectedFile.name
      );

      localStorage.setItem(
        "pdfSummary",
        data.summary || ""
      );

    } catch (err) {

      console.log(err);

      alert(
        err.message ||
          "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // SAVE NOTE
  // =========================
  const handleSave = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/pdf/save",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title:
              fileName ||
              selectedFile?.name,

            content: summary,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Save failed"
        );
      }

      alert("Saved to Notes ✅");

    } catch (err) {

      console.log(err);

      alert(err.message);
    }
  };

  return (
    <div
      className="
      min-h-screen
      relative overflow-hidden
      bg-[#050816]
      text-white
      px-4 md:px-8 py-8
    "
    >

      {/* GRID */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "
      ></div>

      {/* GLOWS */}
      <div
        className="
        absolute top-[-120px] left-[-120px]
        w-[420px] h-[420px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      "
      ></div>

      <div
        className="
        absolute bottom-[-120px] right-[-120px]
        w-[420px] h-[420px]
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
            rounded-[38px]
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

                <BrainCircuit
                  size={30}
                />

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
                  AI PDF Analyzer
                </h1>

                <p
                  className="
                  text-white/55
                  mt-2
                "
                >
                  Upload PDFs & generate
                  intelligent AI summaries ✨
                </p>

              </div>

            </div>

            {/* RIGHT BADGES */}
            <div
              className="
              flex flex-wrap gap-3
            "
            >

              <div
                className="
                px-4 py-3
                rounded-2xl
                bg-white/5
                border border-white/10
                flex items-center gap-2
                text-sm text-white/70
              "
              >

                <ShieldCheck
                  size={16}
                  className="text-green-400"
                />

                Secure Upload

              </div>

              <div
                className="
                px-4 py-3
                rounded-2xl
                bg-white/5
                border border-white/10
                flex items-center gap-2
                text-sm text-white/70
              "
              >

                <Stars
                  size={16}
                  className="text-cyan-300"
                />

                AI Powered

              </div>

            </div>

          </div>

        </motion.div>

        {/* ================= UPLOAD CARD ================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative overflow-hidden
            rounded-[38px]
            border border-cyan-400/10
            bg-white/[0.05]
            backdrop-blur-3xl
            p-8
            shadow-[0_0_50px_rgba(0,0,0,0.35)]
          "
        >

          {/* GLOW */}
          <div
            className="
            absolute -top-20 -right-20
            w-72 h-72
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "
          ></div>

          <div
            className="
            relative z-10
          "
          >

            {/* DROP AREA */}
            <label
              className="
              block
              border-2 border-dashed
              border-cyan-400/10
              hover:border-cyan-400/40
              transition-all duration-300
              rounded-[32px]
              p-10 md:p-16
              text-center
              bg-black/10
              cursor-pointer
            "
            >

              <input
                type="file"
                accept="application/pdf"
                onChange={
                  handleFileChange
                }
                className="hidden"
              />

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  w-28 h-28
                  mx-auto
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  flex items-center justify-center
                  shadow-[0_0_40px_rgba(59,130,246,0.4)]
                "
              >

                <FileUp size={46} />

              </motion.div>

              <h2
                className="
                text-3xl font-bold
                mt-8
              "
              >
                Drag & Drop PDF
              </h2>

              <p
                className="
                text-white/50
                mt-3 text-lg
              "
              >
                Upload your notes,
                syllabus or study material
              </p>

              <div
                className="
                inline-flex
                items-center gap-3
                mt-8
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-7 py-4
                rounded-2xl
                font-semibold
                shadow-[0_0_35px_rgba(59,130,246,0.35)]
              "
              >

                <UploadCloud
                  size={20}
                />

                Choose PDF

              </div>

            </label>

            {/* FILE PREVIEW */}
            <AnimatePresence>

              {selectedFile && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mt-8
                    bg-black/20
                    border border-white/10
                    rounded-[28px]
                    p-5
                    flex items-center justify-between
                    gap-4
                  "
                >

                  <div
                    className="
                    flex items-center gap-4
                  "
                  >

                    <div
                      className="
                      w-16 h-16
                      rounded-3xl
                      bg-red-500/20
                      flex items-center justify-center
                    "
                    >

                      <FileText
                        className="text-red-400"
                        size={28}
                      />

                    </div>

                    <div>

                      <h3
                        className="
                        text-lg font-semibold
                        line-clamp-1
                      "
                      >
                        {
                          selectedFile.name
                        }
                      </h3>

                      <p
                        className="
                        text-white/40
                        mt-1
                      "
                      >
                        Ready for AI
                        processing
                      </p>

                    </div>

                  </div>

                  <div
                    className="
                    flex items-center gap-2
                    text-green-400
                    text-sm
                  "
                  >

                    <CheckCircle2
                      size={18}
                    />

                    Ready

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

            {/* UPLOAD BUTTON */}
            {selectedFile && (

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={handleUpload}
                disabled={loading}
                className="
                  mt-8
                  w-full md:w-auto
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-500
                  px-10 py-4
                  rounded-2xl
                  font-semibold
                  shadow-[0_0_35px_rgba(34,197,94,0.35)]
                  flex items-center justify-center gap-3
                  transition-all
                "
              >

                {loading ? (
                  <>

                    <Loader2
                      className="animate-spin"
                      size={22}
                    />

                    Generating AI Summary...

                  </>
                ) : (
                  <>

                    <Sparkles
                      size={22}
                    />

                    Upload & Analyze PDF

                  </>
                )}

              </motion.button>

            )}

          </div>

        </motion.div>

        {/* ================= SUMMARY ================= */}
        <AnimatePresence>

          {summary && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                relative overflow-hidden
                rounded-[38px]
                border border-cyan-400/10
                bg-white/[0.05]
                backdrop-blur-3xl
                p-8
                shadow-[0_0_60px_rgba(0,0,0,0.4)]
              "
            >

              {/* GLOW */}
              <div
                className="
                absolute top-0 right-0
                w-80 h-80
                bg-yellow-500/10
                blur-[120px]
                rounded-full
              "
              ></div>

              <div
                className="
                relative z-10
              "
              >

                {/* HEADER */}
                <div
                  className="
                  flex flex-col lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                  mb-8
                "
                >

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
                      from-yellow-500
                      to-orange-500
                      flex items-center justify-center
                      shadow-[0_0_35px_rgba(234,179,8,0.35)]
                    "
                    >

                      <Sparkles
                        size={30}
                      />

                    </div>

                    <div>

                      <h2
                        className="
                        text-3xl font-bold
                      "
                      >
                        AI Summary
                      </h2>

                      <p
                        className="
                        text-white/50
                        mt-1
                      "
                      >
                        Smart summary generated
                        successfully ✨
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={handleSave}
                    className="
                      bg-gradient-to-r
                      from-yellow-500
                      to-orange-500
                      px-7 py-4
                      rounded-2xl
                      font-semibold
                      hover:scale-105
                      transition-all
                      shadow-[0_0_35px_rgba(234,179,8,0.35)]
                      flex items-center gap-3
                    "
                  >

                    <Save size={20} />

                    Save to Notes

                  </button>

                </div>

                {/* FILE CARD */}
                <div
                  className="
                  bg-black/20
                  border border-white/10
                  rounded-[28px]
                  p-5
                  flex items-center gap-4
                  mb-7
                "
                >

                  <div
                    className="
                    w-16 h-16
                    rounded-3xl
                    bg-red-500/20
                    flex items-center justify-center
                  "
                  >

                    <FileText
                      className="text-red-400"
                      size={28}
                    />

                  </div>

                  <div>

                    <h3
                      className="
                      text-lg font-semibold
                    "
                    >
                      {fileName ||
                        selectedFile?.name}
                    </h3>

                    <p
                      className="
                      text-white/40
                      mt-1
                    "
                    >
                      Uploaded PDF Document
                    </p>

                  </div>

                </div>

                {/* SUMMARY BOX */}
                <div
                  className="
                  bg-black/20
                  border border-white/10
                  rounded-[30px]
                  p-7
                  text-white/80
                  leading-8
                  whitespace-pre-wrap
                  text-[15px]
                "
                >
                  {summary}
                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </div>
  );
}

export default UploadPDF;