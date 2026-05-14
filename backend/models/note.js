const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["ai", "manual", "pdf"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);