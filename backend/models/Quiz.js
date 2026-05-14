const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "AI Generated Quiz",
    },

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        options: [
          {
            type: String,
          },
        ],

        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Quiz ||
  mongoose.model("Quiz", quizSchema);