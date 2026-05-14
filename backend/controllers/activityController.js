const UserActivity = require("../models/UserActivity");

// ======================
// HELPER FUNCTION
// ======================

const updateStudyData = (activity) => {

  // ======================
  // STUDY MINUTES
  // ======================

  activity.studyMinutes =
    (activity.studyMinutes || 0) + 5;

  // ======================
  // STREAK SYSTEM
  // ======================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let lastDate = activity.lastActiveDate
    ? new Date(activity.lastActiveDate)
    : null;

  if (lastDate) {
    lastDate.setHours(0, 0, 0, 0);
  }

  // FIRST TIME USER

  if (!lastDate) {

    activity.streak = 1;

  } else {

    const diff =
      Math.floor(
        (today - lastDate) /
        (1000 * 60 * 60 * 24)
      );

    // NEXT DAY

    if (diff === 1) {

      activity.streak += 1;

    }

    // MISSED DAYS

    else if (diff > 1) {

      activity.streak = 1;

    }

    // SAME DAY
    // diff === 0 → no change
  }

  activity.lastActiveDate =
    new Date();
};

// ======================
// GET / CREATE USER
// ======================

const getActivity = async (userId) => {

  let activity =
    await UserActivity.findOne({
      userId,
    });

  if (!activity) {

    activity =
      await UserActivity.create({
        userId,
      });
  }

  return activity;
};

// ======================
// AI TRACK
// ======================

exports.trackAI = async (req, res) => {

  try {

    const userId = req.user.id;

    const activity =
      await getActivity(userId);

    activity.aiQuestions += 1;

    updateStudyData(activity);

    await activity.save();

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// NOTE TRACK
// ======================

exports.trackNote = async (req, res) => {

  try {

    const userId = req.user.id;

    const { title, subject } =
      req.body;

    const activity =
      await getActivity(userId);

    activity.notesCreated += 1;

    activity.recentNotes.unshift({
      title,
      subject,
      createdAt: new Date(),
    });

    // keep latest 5 notes
    activity.recentNotes =
      activity.recentNotes.slice(0, 5);

    updateStudyData(activity);

    await activity.save();

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// NOTE DELETE TRACK
// ======================

exports.deleteNoteTrack =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const activity =
        await getActivity(userId);

      activity.notesCreated =
        Math.max(
          0,
          activity.notesCreated - 1
        );

      await activity.save();

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };

// ======================
// PDF TRACK
// ======================

exports.trackPDF = async (req, res) => {

  try {

    const userId = req.user.id;

    const activity =
      await getActivity(userId);

    activity.pdfUploaded += 1;

    updateStudyData(activity);

    await activity.save();

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// QUIZ TRACK
// ======================

exports.trackQuiz = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      score = 0,
      totalQuestions = 1,
    } = req.body;

    const activity = await getActivity(userId);

    // ✅ SAFE INCREMENT (NO DOUBLE COUNT)
    activity.quizAttempts = (activity.quizAttempts || 0) + 1;

    // ⚠️ correct answers ONLY SCORE (safe)
    activity.correctAnswers =
      (activity.correctAnswers || 0) + score;

    activity.totalQuestions =
      (activity.totalQuestions || 0) + totalQuestions;

    // ✅ BEST SCORE
    const percentage = Math.round(
      (score / totalQuestions) * 100
    );

    if (percentage > (activity.bestQuizScore || 0)) {
      activity.bestQuizScore = percentage;
    }

    // ❌ FIX: AVOID OVER-INFLATED ACCURACY
    activity.accuracy =
      activity.totalQuestions > 0
        ? Math.round(
            (activity.correctAnswers /
              activity.totalQuestions) *
              100
          )
        : 0;

    updateStudyData(activity);

    await activity.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// DASHBOARD DATA
// ======================

exports.getDashboardData =
  async (req, res) => {

    try {

      const activity =
        await getActivity(
          req.user.id
        );

      res.json({

        notesCreated:
          activity.notesCreated || 0,

        recentNotes:
          activity.recentNotes || [],

        aiQuestions:
          activity.aiQuestions || 0,

        pdfUploaded:
          activity.pdfUploaded || 0,

        quizzesGenerated:
          activity.quizzesGenerated || 0,

        quizAttempts:
          activity.quizAttempts || 0,

        correctAnswers:
          activity.correctAnswers || 0,

        totalQuestions:
          activity.totalQuestions || 0,

        accuracy:
          activity.accuracy || 0,

        streak:
          activity.streak || 0,

        studyMinutes:
          activity.studyMinutes || 0,

        bestQuizScore:
          activity.bestQuizScore || 0,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  };