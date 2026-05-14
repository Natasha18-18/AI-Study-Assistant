require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant for students.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data?.choices?.[0]?.message?.content || "No response from AI";

    res.json({ answer });

  }catch (error) {

  console.log("FULL ERROR:", error);

  console.log("RESPONSE ERROR:", error.response?.data);

  console.log("MESSAGE:", error.message);

  res.status(500).json({
    message: error.response?.data || error.message,
  });
}
});

module.exports = router;