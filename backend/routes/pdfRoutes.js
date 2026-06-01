const axios = require("axios");
const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const Note = require("../models/note");
const UserActivity = require("../models/UserActivity");

const authMiddleware =
  require("../middleware/authmiddleware");

const router = express.Router();

// ==========================
// ENSURE UPLOADS FOLDER EXISTS
// ==========================

const uploadsPath = path.join(
  __dirname,
  "../uploads"
);

if (!fs.existsSync(uploadsPath)) {

  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

// ==========================
// STORAGE
// ==========================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadsPath);

  },

  filename: (req, file, cb) => {

    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );

  },
});

// ==========================
// ONLY PDF
// ==========================

const fileFilter = (
  req,
  file,
  cb
) => {

  if (
    file.mimetype ===
    "application/pdf"
  ) {

    cb(null, true);

  } else {

    cb(
      new Error("Only PDF allowed"),
      false
    );
  }
};

// ==========================
// MULTER
// ==========================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});

// ==========================
// UPDATE STUDY DATA
// ==========================

const updateStudyData = (
  activity
) => {

  activity.studyMinutes =
    (activity.studyMinutes || 0) + 5;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let lastDate =
    activity.lastActiveDate
      ? new Date(
          activity.lastActiveDate
        )
      : null;

  if (lastDate) {

    lastDate.setHours(
      0,
      0,
      0,
      0
    );
  }

  if (!lastDate) {

    activity.streak = 1;

  } else {

    const diff =
      Math.floor(
        (today - lastDate) /
          (1000 *
            60 *
            60 *
            24)
      );

    if (diff === 1) {

      activity.streak += 1;

    } else if (diff > 1) {

      activity.streak = 1;
    }
  }

  activity.lastActiveDate =
    new Date();
};

// ==========================
// UPLOAD + AI SUMMARY
// ==========================

router.post(
  "/upload",

  authMiddleware,

  upload.single("pdf"),

  async (req, res) => {

    try {

      // ==========================
      // CHECK FILE
      // ==========================

      if (!req.file) {

        return res
          .status(400)
          .json({
            message:
              "No PDF uploaded",
          });
      }

      // ==========================
      // READ FILE
      // ==========================

      const filePath =
        req.file.path;

      const dataBuffer =
        fs.readFileSync(
          filePath
        );

      // ==========================
      // PARSE PDF
      // ==========================

      let pdfData;

      try {

        pdfData =
          await pdf(
            dataBuffer
          );

      } catch (pdfError) {

        console.log(
          "PDF PARSE ERROR:",
          pdfError
        );

        return res
          .status(400)
          .json({
            message:
              "Invalid or unreadable PDF",
          });
      }

      // ==========================
      // EXTRACT TEXT
      // ==========================

      const extractedText =
        pdfData?.text?.trim();

      if (!extractedText) {

        return res
          .status(400)
          .json({
            message:
              "This PDF has no readable text.",
          });
      }

      const limitedText =
        extractedText.slice(
          0,
          5000
        );

      // ==========================
      // AI PROMPT
      // ==========================

      const prompt = `
You are an AI Study Assistant.

Analyze the following study material and generate structured notes.

Include:
1. Short Summary
2. Important Topics
3. Key Concepts
4. Quick Revision Notes
5. Viva Questions

Study Material:
${limitedText}
`;

      // ==========================
      // GROQ AI
      // ==========================

      let aiSummary =
        "No AI response";

      try {

        const response =
          await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",

            {
              model:
                "llama-3.3-70b-versatile",

              messages: [
                {
                  role:
                    "system",

                  content:
                    "You are a helpful AI assistant for students.",
                },

                {
                  role:
                    "user",

                  content:
                    prompt,
                },
              ],
            },

            {
              headers: {
                Authorization:
                  `Bearer ${process.env.GROQ_API_KEY}`,

                "Content-Type":
                  "application/json",
              },
            }
          );

        aiSummary =
          response.data
            ?.choices?.[0]
            ?.message
            ?.content ||
          "No AI response";

      } catch (apiError) {

        console.log(
          "GROQ ERROR:",
          apiError
            ?.response?.data ||
            apiError.message
        );

        aiSummary =
          "AI summary could not be generated.";
      }

      // ==========================
      // UPDATE ACTIVITY
      // ==========================

      let activity =
        await UserActivity.findOne(
          {
            userId:
              req.user.id,
          }
        );

      if (!activity) {

        activity =
          await UserActivity.create(
            {
              userId:
                req.user.id,
            }
          );
      }

      activity.pdfUploaded =
        (activity.pdfUploaded ||
          0) + 1;

      updateStudyData(
        activity
      );

      await activity.save();

      // ==========================
      // SUCCESS RESPONSE
      // ==========================

      return res
        .status(200)
        .json({
          message:
            "AI Summary Generated Successfully",

          summary:
            aiSummary,

          title:
            req.file
              .originalname,
        });

    } catch (error) {

      console.log(
        "UPLOAD ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          message:
            "PDF processing failed",

          error:
            error.message,
        });
    }
  }
);

// ==========================
// SAVE PDF NOTE
// ==========================

router.post(
  "/save",

  authMiddleware,

  async (req, res) => {

    try {

      const {
        title,
        content,
      } = req.body;

      if (
        !title ||
        !content
      ) {

        return res
          .status(400)
          .json({
            message:
              "Title and content required",
          });
      }

      // ==========================
      // SAVE NOTE
      // ==========================

      const note =
        await Note.create({
          userId:
            req.user.id,

          title,

          content,

          type: "pdf",
        });

      // ==========================
      // UPDATE ACTIVITY
      // ==========================

      let activity =
        await UserActivity.findOne(
          {
            userId:
              req.user.id,
          }
        );

      if (!activity) {

        activity =
          await UserActivity.create(
            {
              userId:
                req.user.id,
            }
          );
      }

      activity.notesCreated =
        (activity.notesCreated ||
          0) + 1;

      activity.recentNotes.unshift(
        {
          title,

          subject:
            "PDF Note",

          createdAt:
            new Date(),
        }
      );

      activity.recentNotes =
        activity.recentNotes.slice(
          0,
          5
        );

      updateStudyData(
        activity
      );

      await activity.save();

      return res
        .status(201)
        .json({
          message:
            "Note saved successfully",

          note,
        });

    } catch (error) {

      console.log(
        "SAVE ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          message:
            "Save failed",

          error:
            error.message,
        });
    }
  }
);

module.exports = router;