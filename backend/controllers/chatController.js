const axios = require("axios");
const Conversation = require("../models/Conversation");
const UserActivity = require("../models/UserActivity"); // ✅ FIXED

const askAI = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    const userId = req.user.id;

    let conversation;

    // ======================
    // GET OR CREATE CHAT
    // ======================
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        return res.status(404).json({
          message: "Conversation not found",
        });
      }
    } else {
      conversation = new Conversation({
        userId,
        title: prompt,
        messages: [],
      });
    }

    // ======================
    // SAVE USER MESSAGE
    // ======================
    conversation.messages.push({
      role: "user",
      content: prompt,
    });

    // ======================
    // GROQ API CALL
    // ======================
    let aiResponseText = "No response from AI";

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant for students.",
            },
            ...conversation.messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      aiResponseText =
        response.data?.choices?.[0]?.message?.content ||
        "No response from AI";
    } catch (apiError) {
      console.log("GROQ ERROR:", apiError?.response?.data || apiError.message);

      aiResponseText = "AI error occurred.";
    }

    // ======================
    // SAVE AI MESSAGE
    // ======================
    conversation.messages.push({
      role: "assistant",
      content: aiResponseText,
    });

    await conversation.save();

    // ======================
    // TRACK ACTIVITY (FIXED)
    // ======================
    let activity = await UserActivity.findOne({ userId });

    if (!activity) {
      activity = await UserActivity.create({ userId });
    }

    activity.aiQuestions = (activity.aiQuestions || 0) + 1; // ✅ SAFE

    await activity.save();

    // ======================
    // RESPONSE
    // ======================
    return res.status(200).json({
      success: true,
      conversationId: conversation._id,
      answer: aiResponseText,
      conversation,
    });
  } catch (error) {
    console.log("CHAT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// HISTORY
// ======================
const getHistory = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user.id,
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE
// ======================
const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conversation deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// SINGLE CHAT
// ======================
const getSingleConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE TITLE
// ======================
const updateConversationTitle = async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { title },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  askAI,
  getHistory,
  deleteConversation,
  getSingleConversation,
  updateConversationTitle,
};