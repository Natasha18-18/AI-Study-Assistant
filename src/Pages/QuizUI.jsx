import { useState } from "react";

import {
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  Brain,
  ArrowRight,
  Target,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function QuizUI({ questions, onQuizComplete }) {

  const [current, setCurrent] = useState(0);

  const [selected, setSelected] = useState(null);

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const question = questions[current];

  // =========================
  // OPTION CLICK
  // =========================

  const handleOptionClick = (key) => {

    if (selected !== null) return;

    setSelected(key);

    if (key === question.correctAnswer) {

      setScore((prev) => prev + 1);

    }
  };

  // =========================
  // NEXT QUESTION
  // =========================

  const nextQuestion = () => {

    setSelected(null);

    if (current + 1 < questions.length) {

      setCurrent(current + 1);

    } else {

      const finalScore =
        selected === question.correctAnswer
          ? score
          : score;

      setShowResult(true);

      if (onQuizComplete) {
        onQuizComplete(
          finalScore,
          questions.length
        );
      }
    }
  };

  // =========================
  // RESULT SCREEN
  // =========================

  if (showResult) {

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          relative overflow-hidden
          rounded-[38px]
          border border-cyan-400/10
          bg-white/[0.05]
          backdrop-blur-3xl
          p-10
          shadow-[0_0_60px_rgba(0,0,0,0.45)]
          text-center
        "
      >

        {/* GLOW */}
        <div className="
          absolute top-[-100px] left-[-100px]
          w-[260px] h-[260px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
        "></div>

        <div className="
          absolute bottom-[-100px] right-[-100px]
          w-[260px] h-[260px]
          bg-blue-600/20
          blur-[120px]
          rounded-full
        "></div>

        <div className="relative z-10">

          {/* ICON */}
          <div className="
            w-28 h-28
            mx-auto
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex items-center justify-center
            shadow-[0_0_45px_rgba(59,130,246,0.4)]
          ">

            <Trophy size={50} />

          </div>

          {/* TITLE */}
          <h2 className="
            text-4xl md:text-5xl
            font-black
            mt-8
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
            to-white
            text-transparent
            bg-clip-text
          ">
            Quiz Completed 🎉
          </h2>

          <p className="
            text-white/60
            mt-4
            text-lg
          ">
            Your AI quiz performance summary
          </p>

          {/* SCORE CARD */}
          <div className="
            mt-10
            rounded-[32px]
            border border-cyan-400/10
            bg-black/20
            p-8
          ">

            <p className="
              text-white/50
              uppercase
              tracking-[4px]
              text-sm
            ">
              FINAL SCORE
            </p>

            <h1 className="
              text-7xl
              font-black
              mt-4
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              text-transparent
              bg-clip-text
            ">
              {score}/{questions.length}
            </h1>

            <div className="
              mt-5
              inline-flex
              items-center gap-2
              px-5 py-2
              rounded-full
              bg-cyan-500/10
              border border-cyan-400/20
              text-cyan-300
            ">

              <Target size={18} />

              {percentage}% Accuracy

            </div>

          </div>

          {/* PERFORMANCE */}
          <div className="mt-8">

            {percentage >= 80 ? (

              <div className="
                bg-green-500/10
                border border-green-400/20
                rounded-2xl
                px-6 py-5
              ">

                <p className="
                  text-2xl
                  font-bold
                  text-green-400
                ">
                  Excellent Work 🚀
                </p>

                <p className="text-white/60 mt-2">
                  You're mastering your study material.
                </p>

              </div>

            ) : percentage >= 50 ? (

              <div className="
                bg-yellow-500/10
                border border-yellow-400/20
                rounded-2xl
                px-6 py-5
              ">

                <p className="
                  text-2xl
                  font-bold
                  text-yellow-300
                ">
                  Good Job 👍
                </p>

                <p className="text-white/60 mt-2">
                  You're improving consistently.
                </p>

              </div>

            ) : (

              <div className="
                bg-red-500/10
                border border-red-400/20
                rounded-2xl
                px-6 py-5
              ">

                <p className="
                  text-2xl
                  font-bold
                  text-red-400
                ">
                  Keep Practicing 💪
                </p>

                <p className="text-white/60 mt-2">
                  Review your notes and try again.
                </p>

              </div>

            )}

          </div>

        </div>

      </motion.div>
    );
  }

  return (

    <div className="
      max-w-4xl
      mx-auto
      text-white
    ">

      {/* PROGRESS */}
      <div className="mb-8">

        <div className="
          flex items-center
          justify-between
          mb-3
        ">

          <div className="
            flex items-center gap-3
          ">

            <div className="
              w-12 h-12
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              flex items-center justify-center
              shadow-[0_0_25px_rgba(59,130,246,0.35)]
            ">

              <Brain size={22} />

            </div>

            <div>

              <p className="
                text-white/50
                text-sm
              ">
                Question Progress
              </p>

              <h3 className="
                text-xl font-bold
              ">
                {current + 1} / {questions.length}
              </h3>

            </div>

          </div>

          <div className="
            px-5 py-2
            rounded-full
            bg-cyan-500/10
            border border-cyan-400/20
            text-cyan-300
            font-semibold
          ">

            Score: {score}

          </div>

        </div>

        {/* BAR */}
        <div className="
          w-full h-3
          rounded-full
          bg-white/10
          overflow-hidden
        ">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((current + 1) / questions.length) * 100
              }%`,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-indigo-500
            "
          />

        </div>

      </div>

      {/* QUESTION CARD */}
      <motion.div
        key={current}
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
          p-8 md:p-10
          shadow-[0_0_60px_rgba(0,0,0,0.45)]
        "
      >

        {/* GLOW */}
        <div className="
          absolute top-[-120px] right-[-120px]
          w-[260px] h-[260px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
        "></div>

        <div className="relative z-10">

          {/* QUESTION */}
          <div className="
            flex items-start gap-4
            mb-10
          ">

            <div className="
              w-16 h-16
              rounded-3xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              flex items-center justify-center
              shrink-0
              shadow-[0_0_30px_rgba(59,130,246,0.35)]
            ">

              <Sparkles size={26} />

            </div>

            <div>

              <p className="
                text-cyan-300
                text-sm
                uppercase
                tracking-[3px]
                mb-3
              ">
                AI Generated Question
              </p>

              <h2 className="
                text-2xl md:text-3xl
                font-bold
                leading-relaxed
              ">
                Q{current + 1}.{" "}
                {question.question}
              </h2>

            </div>

          </div>

          {/* OPTIONS */}
          <div className="space-y-5">

            {Object.entries(question.options).map(
              ([key, val]) => {

                const isCorrect =
                  key === question.correctAnswer;

                const isSelected =
                  key === selected;

                return (

                  <motion.button
                    whileHover={{
                      scale: selected
                        ? 1
                        : 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    key={key}
                    onClick={() =>
                      handleOptionClick(key)
                    }
                    className={`
                      w-full
                      text-left
                      rounded-[24px]
                      border
                      p-5
                      transition-all duration-300

                      ${
                        selected === null
                          ? `
                            bg-white/[0.04]
                            border-white/10
                            hover:border-cyan-400/30
                            hover:bg-cyan-500/10
                          `
                          : isCorrect
                          ? `
                            bg-green-500/15
                            border-green-400/40
                          `
                          : isSelected
                          ? `
                            bg-red-500/15
                            border-red-400/40
                          `
                          : `
                            bg-white/[0.03]
                            border-white/5
                          `
                      }
                    `}
                  >

                    <div className="
                      flex items-center
                      justify-between
                      gap-4
                    ">

                      <div className="
                        flex items-center gap-4
                      ">

                        <div className={`
                          w-11 h-11
                          rounded-2xl
                          flex items-center justify-center
                          font-bold

                          ${
                            selected === null
                              ? `
                                bg-white/10
                              `
                              : isCorrect
                              ? `
                                bg-green-500
                              `
                              : isSelected
                              ? `
                                bg-red-500
                              `
                              : `
                                bg-white/10
                              `
                          }
                        `}>

                          {key}

                        </div>

                        <span className="
                          text-[16px]
                          leading-relaxed
                        ">
                          {val}
                        </span>

                      </div>

                      {selected !== null &&
                        isCorrect && (
                          <CheckCircle2
                            className="
                              text-green-400
                            "
                            size={24}
                          />
                        )}

                      {selected !== null &&
                        isSelected &&
                        !isCorrect && (
                          <XCircle
                            className="
                              text-red-400
                            "
                            size={24}
                          />
                        )}

                    </div>

                  </motion.button>

                );
              }
            )}

          </div>

          {/* EXPLANATION */}
          <AnimatePresence>

            {selected !== null && (

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
                  rounded-[28px]
                  border border-cyan-400/10
                  bg-gradient-to-r
                  from-cyan-500/10
                  to-blue-500/10
                  p-6
                "
              >

                <h3 className="
                  text-xl font-bold
                  text-cyan-300
                  mb-3
                ">
                  Explanation 💡
                </h3>

                <p className="
                  text-white/75
                  leading-8
                ">
                  {question.explanation}
                </p>

              </motion.div>

            )}

          </AnimatePresence>

          {/* NEXT BUTTON */}
          <AnimatePresence>

            {selected !== null && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-8"
              >

                <button
                  onClick={nextQuestion}
                  className="
                    group
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-8 py-4
                    rounded-2xl
                    font-semibold
                    flex items-center gap-3
                    hover:scale-105
                    transition-all duration-300
                    shadow-[0_0_35px_rgba(59,130,246,0.35)]
                  "
                >

                  {current + 1 ===
                  questions.length
                    ? "Finish Quiz 🎯"
                    : "Next Question"}

                  <ArrowRight
                    className="
                      group-hover:translate-x-1
                      transition
                    "
                    size={20}
                  />

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
}

export default QuizUI;