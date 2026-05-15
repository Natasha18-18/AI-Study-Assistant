const Note = require("../models/note");
const UserActivity = require("../models/UserActivity");


// ==========================
// CREATE NOTE
// ==========================
exports.createNote = async (req, res) => {

  try {

    const { title, content, type } = req.body;

    const note = await Note.create({
      userId: req.user.id,
      title,
      content,
      type,
    });

    // TRACK USER ACTIVITY
    let activity = await UserActivity.findOne({
      userId: req.user.id,
    });

    // CREATE IF NOT EXISTS
    if (!activity) {

      activity = await UserActivity.create({
        userId: req.user.id,
        notesCreated: 0,
        recentNotes: [],
      });

    }

    // INCREASE NOTES COUNT
    activity.notesCreated += 1;

    // ADD RECENT NOTE
    activity.recentNotes.unshift({
      title,
      createdAt: new Date(),
    });

    // KEEP ONLY LAST 5 NOTES
    activity.recentNotes =
      activity.recentNotes.slice(0, 5);

    await activity.save();

    res.status(201).json(note);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create note",
    });

  }
};


// ==========================
// GET ALL NOTES
// ==========================
exports.getNotes = async (req, res) => {

  try {

    const notes = await Note.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch notes",
    });

  }
};


// ==========================
// DELETE NOTE
// ==========================
exports.deleteNote = async (req, res) => {

  try {

    // FIND NOTE
    const note = await Note.findById(
      req.params.id
    );

    if (!note) {

      return res.status(404).json({
        message: "Note not found",
      });

    }

    // SECURITY CHECK
    if (
      note.userId.toString() !== req.user.id
    ) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    // DELETE NOTE
    await Note.findByIdAndDelete(
      req.params.id
    );

    // FIND USER ACTIVITY
    const activity =
      await UserActivity.findOne({
        userId: req.user.id,
      });

    if (activity) {

      // DECREASE NOTES COUNT
      activity.notesCreated = Math.max(
        0,
        activity.notesCreated - 1
      );

      // REMOVE NOTE FROM RECENT NOTES
      activity.recentNotes =
        activity.recentNotes.filter(
          (item) => item.title !== note.title
        );

      await activity.save();

    }

    res.status(200).json({
      message: "Note deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });

  }
};


// ==========================
// UPDATE NOTE
// ==========================
exports.updateNote = async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    );

    if (!note) {

      return res.status(404).json({
        message: "Note not found",
      });

    }

    // SECURITY CHECK
    if (
      note.userId.toString() !== req.user.id
    ) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    const updatedNote =
      await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedNote);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update failed",
    });

  }
};