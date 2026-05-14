const express = require("express");

const router = express.Router();

const {
  askAI,
  getHistory,
  deleteConversation,
  getSingleConversation,
  updateConversationTitle
} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authmiddleware");


// ASK AI ROUTE
router.post("/ask", authMiddleware, askAI);
router.get("/history",authMiddleware, getHistory,);
router.delete("/:id", authMiddleware, deleteConversation);
router.get("/:id", authMiddleware, getSingleConversation);
router.put("/:id", authMiddleware, updateConversationTitle);


module.exports = router;