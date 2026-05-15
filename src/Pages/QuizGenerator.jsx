import { useState } from "react";

import {
  Brain,
  Loader2,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
  Target,
  Stars,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

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

    <div className="
      min-h-screen
      relative overflow-hidden
      bg-[#050816]
      text-white
      px-4 md:px-8 py-8
    ">

      {/* GRID BACKGROUND */}

      <div className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "></div>

      {/* GLOW EFFECTS */}

      <div className="
        absolute top-[-120px] left-[-120px]
        w-[350px] h-[350px]
        bg-cyan-500/20
        blur-[120px]
        rounded-full
      "></div>

      <div className="
        absolute bottom-[-120px] right-[-120px]
        w-[350px] h-[350px]
        bg-blue-500/20
        blur-[120px]
        rounded-full
      "></div>

      <div className="
        relative z-10
        max-w-7xl mx-auto
      ">

        {/* ================= HEADER ================= */}

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
            rounded-[36px]
            border border-cyan-400/10
            bg-white/[0.05]
            backdrop-blur-3xl
            p-6 md:p-8
            shadow-[0_0_60px_rgba(0,0,0,0.45)]
          "
        >

          {/* HEADER GLOW */}

          <div className="
            absolute top-0 right-0
            w-80 h-80
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "></div>

          <div className="
            relative z-10
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          ">

            {/* LEFT */}

            <div className="
              flex items-center gap-5
            ">

              <div className="
                relative
                w-20 h-20
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center justify-center
                shadow-[0_0_40px_rgba(59,130,246,0.4)]
              ">

                <Brain size={38} />

              </div>

              <div>

                <div className="
                  flex items-center gap-3
                  mb-2
                ">

                  <h1 className="
                    text-4xl md:text-5xl
                    font-black
                    bg-gradient-to-r
                    from-cyan-200
                    via-blue-300
                    to-white
                    bg-clip-text
                    text-transparent
                  ">
                    AI Quiz Generator
                  </h1>

                  <Stars
                    className="
                      text-cyan-300
                    "
                    size={28}
                  />

                </div>

                <p className="
                  text-white/60
                  text-lg
                  max-w-2xl
                ">
                  Transform your notes, PDFs &
                  AI chats into smart premium quizzes 🚀
                </p>

              </div>

            </div>

            {/* RIGHT STATS */}

            <div className="
              flex gap-4 flex-wrap
            ">

              <div className="
                px-5 py-4
                rounded-2xl
                bg-white/[0.05]
                border border-white/10
                backdrop-blur-xl
                min-w-[120px]
              ">

                <div className="
                  flex items-center gap-2
                  text-cyan-300
                  mb-2
                ">

                  <Trophy size={18} />

                  <span className="
                    text-sm
                  ">
                    Questions
                  </span>

                </div>

                <h3 className="
                  text-2xl font-bold
                ">
                  {questions.length}
                </h3>

              </div>

              <div className="
                px-5 py-4
                rounded-2xl
                bg-white/[0.05]
                border border-white/10
                backdrop-blur-xl
                min-w-[120px]
              ">

                <div className="
                  flex items-center gap-2
                  text-blue-300
                  mb-2
                ">

                  <Zap size={18} />

                  <span className="
                    text-sm
                  ">
                    Difficulty
                  </span>

                </div>

                <h3 className="
                  text-2xl font-bold capitalize
                ">
                  {difficulty}
                </h3>

              </div>

            </div>

          </div>

        </motion.div>

        {/* ================= CONTENT ================= */}

        <div className="mt-10">

          <AnimatePresence mode="wait">

            {questions.length === 0 ? (

              <motion.div
                key="generate"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                }}
                className="
                  relative overflow-hidden
                  rounded-[36px]
                  border border-cyan-400/10
                  bg-white/[0.05]
                  backdrop-blur-3xl
                  p-8 md:p-12
                  shadow-[0_0_60px_rgba(0,0,0,0.35)]
                  text-center
                "
              >

                {/* INNER GLOW */}

                <div className="
                  absolute bottom-0 left-0
                  w-72 h-72
                  bg-blue-500/10
                  blur-[120px]
                  rounded-full
                "></div>

                <div className="
                  relative z-10
                ">

                  {/* ICON */}

                  <div className="
                    relative
                    w-32 h-32
                    mx-auto
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    flex items-center justify-center
                    shadow-[0_0_50px_rgba(59,130,246,0.45)]
                    mb-8
                  ">

                    <Target size={52} />

                  </div>

                  <h2 className="
                    text-3xl md:text-4xl
                    font-bold
                    mb-4
                  ">
                    Ready to Test Yourself?
                  </h2>

                  <p className="
                    text-white/60
                    max-w-2xl
                    mx-auto
                    leading-8
                    text-lg
                  ">
                    Generate premium AI-powered quizzes
                    from your study materials instantly ✨
                  </p>

                  {/* DIFFICULTY */}

                  <div className="
                    flex justify-center
                    gap-5 flex-wrap
                    mt-12 mb-12
                  ">

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
                        className={`
                          relative overflow-hidden
                          px-8 py-4
                          rounded-2xl
                          capitalize
                          font-semibold
                          transition-all duration-300
                          border
                          ${
                            difficulty === lvl
                              ? `
                              border-cyan-400/40
                              bg-gradient-to-r
                              from-cyan-500
                              to-blue-600
                              shadow-[0_0_30px_rgba(59,130,246,0.35)]
                              scale-105
                            `
                              : `
                              border-white/10
                              bg-white/[0.04]
                              hover:bg-white/[0.08]
                              hover:scale-105
                            `
                          }
                        `}
                      >

                        {lvl}

                      </button>

                    ))}

                  </div>

                  {/* GENERATE BUTTON */}

                  <button
                    onClick={generateQuiz}
                    disabled={loading}
                    className="
                      group
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      px-10 py-5
                      rounded-2xl
                      text-lg font-bold
                      flex items-center gap-3
                      mx-auto
                      hover:scale-105
                      transition-all duration-300
                      shadow-[0_0_40px_rgba(59,130,246,0.4)]
                      disabled:opacity-60
                    "
                  >

                    {loading ? (
                      <>

                        <Loader2
                          className="animate-spin"
                          size={24}
                        />

                        Generating Premium Quiz...

                      </>
                    ) : (
                      <>

                        <Sparkles size={22} />

                        Generate Quiz 🚀

                      </>
                    )}

                  </button>

                </div>

              </motion.div>

            ) : (

              <motion.div
                key="quiz"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  space-y-8
                "
              >

                {/* QUIZ CARD */}

                <div className="
                  relative overflow-hidden
                  rounded-[36px]
                  border border-cyan-400/10
                  bg-white/[0.05]
                  backdrop-blur-3xl
                  p-6 md:p-8
                  shadow-[0_0_60px_rgba(0,0,0,0.35)]
                ">

                  {/* QUIZ GLOW */}

                  <div className="
                    absolute top-0 right-0
                    w-72 h-72
                    bg-cyan-500/10
                    blur-[120px]
                    rounded-full
                  "></div>

                  <div className="
                    relative z-10
                  ">

                    {/* TOP */}

                    <div className="
                      flex flex-col md:flex-row
                      md:items-center
                      md:justify-between
                      gap-5
                      mb-8
                    ">

                      <div>

                        <h2 className="
                          text-3xl font-bold
                        ">
                          Your Premium Quiz 
                        </h2>

                        <p className="
                          text-white/50
                          mt-2
                        ">
                          AI generated questions based on your study data
                        </p>

                      </div>

                      <div className="
                        px-5 py-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500/20
                        to-blue-600/20
                        border border-cyan-400/20
                        text-white
                        font-semibold
                      ">

                        {questions.length} Questions

                      </div>

                    </div>

                    {/* QUIZ UI */}

                    <QuizUI
                      questions={questions}
                      onQuizComplete={
                        saveQuizResult
                      }
                    />

                  </div>

                </div>

                {/* RESET BUTTON */}

                <div className="
                  flex justify-center
                ">

                  <button
                    onClick={resetQuiz}
                    className="
                      group
                      bg-white/[0.05]
                      border border-white/10
                      hover:bg-cyan-500
                      px-8 py-4
                      rounded-2xl
                      flex items-center gap-3
                      font-semibold
                      hover:scale-105
                      transition-all duration-300
                    "
                  >

                    <RotateCcw size={20} />

                    Generate New Quiz

                  </button>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}

export default QuizGenerator;