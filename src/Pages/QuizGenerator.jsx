import { useState } from "react";
import {
  Brain,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import QuizUI from "./QuizUI";

function QuizGenerator() {

  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [difficulty, setDifficulty] =
    useState("medium");

  // =========================
  // GENERATE QUIZ
  // =========================

  const generateQuiz = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const summary =
        localStorage.getItem("pdfSummary") || "";

      const notesArr =
        JSON.parse(
          localStorage.getItem("notesBackup")
        ) || [];

      const notes =
        notesArr
          .map((n) => n.content)
          .join("\n");

      const chats =
        JSON.parse(
          localStorage.getItem("aiChats")
        ) || [];

      const chatText =
        chats
          .map((c) => c.message)
          .join("\n");

      const combinedText = `
${summary}

${notes}

${chatText}
`;

      if (
        !summary &&
        notesArr.length === 0 &&
        chats.length === 0
      ) {

        setLoading(false);

        return alert(
          "No study data found 😫"
        );
      }

      const res = await fetch(
        "http://localhost:5000/api/quiz/generate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            text: combinedText,
            difficulty,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Quiz failed"
        );
      }

      setQuestions(data.questions);

    } catch (err) {

      console.log(err);

      alert(
        err.message || "Quiz failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // RESET QUIZ
  // =========================

  const resetQuiz = () => {

    setQuestions([]);

  };

  // =========================
  // SAVE QUIZ RESULT
  // =========================

  const saveQuizResult = async (
    score,
    totalQuestions
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        "http://localhost:5000/api/quiz/save-result",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            score,
            totalQuestions,
          }),
        }
      );

    } catch (err) {

      console.log(
        "Save Result Error:",
        err
      );

    }
  };

  return (

    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 text-white relative">

      {/* 🔥 BACKGROUND GLOW */}

      <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-3xl rounded-full top-0 left-0 -z-10"></div>

      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-3xl rounded-full bottom-0 right-0 -z-10"></div>

      {/* HEADER */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex items-center gap-4">

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-2xl shadow-lg">

          <Brain size={28} />

        </div>

        <div>

          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">

            AI Quiz Generator

            <Sparkles
              className="text-yellow-300"
              size={20}
            />

          </h1>

          <p className="text-white/60 text-sm">

            Turn your study material into smart quizzes instantly

          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="mt-10">

        {questions.length === 0 && (

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center shadow-xl">

            {/* EMPTY STATE */}

            <div className="mb-8">

              <h2 className="text-xl font-semibold mb-2">

                Ready to test yourself? 🧠

              </h2>

              <p className="text-white/60 text-sm">

                Generate quizzes from your notes, chats, or PDFs

              </p>

            </div>

            {/* DIFFICULTY */}

            <div className="flex justify-center gap-4 mb-10 flex-wrap">

              {[
                "easy",
                "medium",
                "hard",
              ].map((lvl) => (

                <button
                  key={lvl}
                  onClick={() =>
                    setDifficulty(lvl)
                  }
                  className={`px-6 py-2 rounded-full text-sm capitalize transition-all duration-300
                  ${
                    difficulty === lvl
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg scale-105"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >

                  {lvl}

                </button>

              ))}

            </div>

            {/* GENERATE BUTTON */}

            <button
              onClick={generateQuiz}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 rounded-xl flex items-center gap-2 mx-auto hover:scale-105 transition shadow-lg disabled:opacity-60"
            >

              {loading ? (
                <>

                  <Loader2
                    className="animate-spin"
                    size={18}
                  />

                  Generating Quiz...

                </>
              ) : (
                <>
                  Generate Quiz 🚀
                </>
              )}

            </button>

          </div>

        )}

        {/* QUIZ SECTION */}

        {questions.length > 0 && (

          <div className="space-y-6">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

              <QuizUI
                questions={questions}
                onQuizComplete={
                  saveQuizResult
                }
              />

            </div>

            <div className="flex justify-center">

              <button
                onClick={resetQuiz}
                className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition"
              >

                <RotateCcw size={18} />

                Generate New Quiz

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default QuizGenerator;