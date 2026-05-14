const express = require("express");

const router = express.Router();

const {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

const authMiddleware = require("../middleware/authmiddleware");


router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.delete("/:id", authMiddleware, deleteNote);

router.put("/:id", authMiddleware, updateNote);


module.exports = router;