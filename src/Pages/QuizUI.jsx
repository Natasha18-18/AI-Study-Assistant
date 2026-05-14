import { useState } from "react";

function QuizUI({ questions, onQuizComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = questions[current];

  const handleOptionClick = (key) => {
    if (selected !== null) return;

    setSelected(key);

    if (key === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // =========================
  // NEXT QUESTION (ONLY UI FLOW)
  // =========================
  const nextQuestion = () => {
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);

      // ✅ ONLY ONE SAVE CALL (PARENT HANDLES IT)
      if (onQuizComplete) {
        onQuizComplete(score, questions.length);
      }
    }
  };

  if (showResult) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="text-center mt-10 text-white">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl">
          <h2 className="text-4xl font-bold mb-4">
            Quiz Completed 🎉
          </h2>

          <p className="text-5xl font-bold text-purple-400">
            {score} / {questions.length}
          </p>

          <p className="text-white/60 mt-4 text-lg">
            You scored {percentage}%
          </p>

          <div className="mt-6">
            {percentage >= 80 ? (
              <p className="text-green-400 text-xl font-semibold">
                Excellent Work 🚀
              </p>
            ) : percentage >= 50 ? (
              <p className="text-yellow-300 text-xl font-semibold">
                Good Job 👍
              </p>
            ) : (
              <p className="text-red-400 text-xl font-semibold">
                Keep Practicing 💪
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <div className="w-full bg-white/20 h-2 rounded mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded transition-all duration-500"
          style={{
            width: `${
              ((current + 1) / questions.length) * 100
            }%`,
          }}
        />
      </div>

      <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/60 text-sm">
            Question {current + 1} of {questions.length}
          </p>

          <p className="text-purple-300 font-semibold">
            Score: {score}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-8 leading-relaxed">
          Q{current + 1}. {question.question}
        </h2>

        <div className="space-y-4">
          {Object.entries(question.options).map(([key, val]) => {
            const isCorrect = key === question.correctAnswer;
            const isSelected = key === selected;

            return (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 border
                ${
                  selected
                    ? isCorrect
                      ? "bg-green-500 border-green-400"
                      : isSelected
                      ? "bg-red-500 border-red-400"
                      : "bg-white/10 border-white/10"
                    : "bg-white/10 hover:bg-white/20 border-white/10"
                }`}
              >
                <span className="font-bold mr-2">{key}.</span>
                {val}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/20 p-5 rounded-2xl">
            <h3 className="font-semibold text-blue-300 mb-2 text-lg">
              Explanation 💡
            </h3>

            <p className="text-white/80 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {selected !== null && (
          <button
            onClick={nextQuestion}
            className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
          >
            {current + 1 === questions.length
              ? "Finish Quiz 🎯"
              : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizUI;