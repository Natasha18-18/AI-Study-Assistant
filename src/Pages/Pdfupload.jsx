// ==========================
// UploadPDF.jsx
// ==========================

import { useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Loader2,
  Save,
  FileUp,
} from "lucide-react";

function UploadPDF() {

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [summary, setSummary] = useState("");

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const token = localStorage.getItem("token");

  // =========================
  // LOAD SAVED SUMMARY
  // =========================
  useEffect(() => {

    const saved =
      localStorage.getItem("pdfSummary");

    if (saved) {
      setSummary(saved);
    }

  }, []);

  // =========================
  // FILE CHANGE
  // =========================
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file?.type === "application/pdf") {

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

      const formData = new FormData();

      formData.append("pdf", selectedFile);

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

      const data = await res.json();

      console.log("UPLOAD RESPONSE:", data);

      if (!res.ok) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      setSummary(data.summary || "");

      setFileName(
        data.title || selectedFile.name
      );

      localStorage.setItem(
        "pdfSummary",
        data.summary || ""
      );

    } catch (err) {

      console.log("UPLOAD ERROR:", err);

      alert(err.message || "Upload failed");

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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Save failed"
        );
      }

      alert("Saved to notes ✅");

    } catch (err) {

      console.log(err);

      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b16] via-[#0f172a] to-black text-white px-4 md:px-8 py-8">

      <div className="max-w-6xl mx-auto space-y-8">

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-xl">

          <div className="border-2 border-dashed border-white/10 hover:border-purple-500/40 transition rounded-[30px] p-10 text-center bg-black/10">

            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-2xl">
              <FileUp size={42} />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              Drag & Drop PDF
            </h2>

            <p className="text-white/50 mt-2">
              or click below to browse files
            </p>

            <label className="inline-block mt-6 cursor-pointer">

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition shadow-lg">
                Choose PDF
              </div>

            </label>

            {selectedFile && (
              <div className="mt-6 flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 max-w-xl mx-auto">

                <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <FileText
                    className="text-red-400"
                    size={22}
                  />
                </div>

                <div className="text-left">
                  <h3 className="font-medium line-clamp-1">
                    {selectedFile.name}
                  </h3>

                  <p className="text-white/40 text-sm">
                    PDF Ready to Upload
                  </p>
                </div>

              </div>
            )}

            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-7 bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto"
              >

                {loading ? (
                  <>
                    <Loader2
                      className="animate-spin"
                      size={20}
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    Upload PDF
                  </>
                )}

              </button>
            )}

          </div>

        </div>

        {summary && (
          <div className="relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)]">

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl">
                    <Sparkles size={28} />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      AI Summary
                    </h2>

                    <p className="text-white/50 mt-1">
                      Smart summary generated
                      successfully ✨
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all shadow-xl flex items-center gap-3"
                >
                  <Save size={20} />
                  Save Note
                </button>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <FileText
                    className="text-red-400"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {fileName ||
                      selectedFile?.name}
                  </h3>

                  <p className="text-white/40 text-sm">
                    Uploaded PDF Document
                  </p>
                </div>

              </div>

              <div className="bg-black/20 border border-white/10 rounded-[28px] p-6 leading-relaxed text-white/80 whitespace-pre-wrap text-[15px]">
                {summary}
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadPDF;