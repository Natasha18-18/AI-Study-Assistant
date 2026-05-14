const express = require("express");
const axios = require("axios");

const authMiddleware = require("../middleware/authmiddleware");

const UserActivity = require("../models/UserActivity");

const router = express.Router();


// ===============================
// GENERATE QUIZ
// ===============================

router.post(
  "/generate",
  authMiddleware,
  async (req, res) => {

    try {

      const { text, difficulty } = req.body;

      if (!text || text.trim().length < 20) {

        return res.status(400).json({
          message: "Not enough study content",
        });

      }

      const prompt = `
You are an AI Quiz Generator.

Generate 10 ${difficulty} level MCQ questions.

RULES:
- Each question must have 4 options
- Use option keys A, B, C, D
- One correct answer only
- Add short explanation
- Return ONLY STRICT JSON ARRAY
- No markdown
- No extra text

FORMAT:
[
  {
    "question": "What is React?",

    "options": {
      "A": "Library",
      "B": "Database",
      "C": "OS",
      "D": "Browser"
    },

    "correctAnswer": "A",

    "explanation": "React is a JavaScript library."
  }
]

Study Material:
${text}
`;

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content: "Return only JSON",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
        }
      );

      let quizText =
        response.data?.choices?.[0]?.message?.content || "[]";

      quizText = quizText
        .replace(/```json|```/g, "")
        .trim();

      let questions;

      try {

        questions = JSON.parse(quizText);

      } catch (err) {

        return res.status(500).json({
          message: "AI returned invalid JSON",
          raw: quizText,
        });

      }

      res.json({ questions });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Quiz generation failed",
      });

    }
  }
);


// ===============================
// SAVE QUIZ RESULT
// ===============================

router.post(
  "/save-result",
  authMiddleware,
  async (req, res) => {

    try {

      const { score, totalQuestions } = req.body;

      let activity = await UserActivity.findOne({
        userId: req.user.id,
      });

      if (!activity) {
        activity = await UserActivity.create({
          userId: req.user.id,
        });
      }

      // ======================
      // QUIZ ATTEMPT
      // ======================

      activity.quizAttempts += 1;

      // ======================
      // CORRECT ANSWERS
      // ======================

      activity.correctAnswers += score;

      // ======================
      // BEST SCORE (FIXED)
      // ======================

      const percent = Math.round((score / totalQuestions) * 100);

if (percent > activity.bestQuizScore) {
  activity.bestQuizScore = percent;
}

      // ======================
      // ACCURACY (FIXED SAFE)
      // ======================

      const totalPossible =
        activity.quizAttempts * totalQuestions;

      activity.accuracy = totalPossible
        ? Math.round(
            (activity.correctAnswers /
              totalPossible) *
              100
          )
        : 0;

      await activity.save();

      res.json({
        success: true,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to save quiz result",
      });
    }
  }
);

module.exports = router;