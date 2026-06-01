const express = require("express");

const router = express.Router();

const {
  trackAI,
  trackNote,
  trackPDF,
  trackQuiz,
  getDashboardData,
  deleteNoteTrack,
} = require("../controllers/activityController");

const authMiddleware =
  require("../middleware/authmiddleware");

// ======================
// TRACK ROUTES
// ======================

router.post(
  "/ai",
  authMiddleware,
  trackAI
);

router.post(
  "/note",
  authMiddleware,
  trackNote
);

router.delete(
  "/note",
  authMiddleware,
  deleteNoteTrack
);

router.post(
  "/pdf",
  authMiddleware,
  trackPDF
);

router.post(
  "/quiz",
  authMiddleware,
  trackQuiz
);

// ======================
// DASHBOARD
// ======================

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardData
);

module.exports = router;