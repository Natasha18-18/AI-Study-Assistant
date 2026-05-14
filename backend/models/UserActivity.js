const mongoose = require("mongoose");

const userActivitySchema =
  new mongoose.Schema(
    {
      // ======================
      // USER
      // ======================

      userId: {
        type: String,
        required: true,
        unique: true,
      },

      // ======================
      // AI
      // ======================

      aiQuestions: {
        type: Number,
        default: 0,
      },

      // ======================
      // NOTES
      // ======================

      notesCreated: {
        type: Number,
        default: 0,
      },

      recentNotes: [
        {
          title: {
            type: String,
            default: "",
          },

          subject: {
            type: String,
            default: "",
          },

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      // ======================
      // PDF
      // ======================

      pdfUploaded: {
        type: Number,
        default: 0,
      },

      // ======================
      // QUIZ
      // ======================

      quizzesGenerated: {
        type: Number,
        default: 0,
      },

      quizAttempts: {
        type: Number,
        default: 0,
      },

      correctAnswers: {
        type: Number,
        default: 0,
      },

      totalQuestions: {
        type: Number,
        default: 0,
      },

      // ======================
      // BEST QUIZ SCORE
      // ======================

      bestQuizScore: {
        type: Number,
        default: 0,
      },

      // ======================
      // ACCURACY
      // ======================

      accuracy: {
        type: Number,
        default: 0,
      },

      // ======================
      // STUDY TRACKING
      // ======================

      studyMinutes: {
        type: Number,
        default: 0,
      },

      streak: {
        type: Number,
        default: 0,
      },

      // ======================
      // LAST ACTIVE DATE
      // ======================

      lastActiveDate: {
        type: Date,
        default: null,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "UserActivity",
  userActivitySchema
);