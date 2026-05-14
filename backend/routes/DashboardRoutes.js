const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
  getDashboardData,
} = require("../controllers/activityController");

router.get(
  "/",
  authMiddleware,
  getDashboardData
);

module.exports = router;