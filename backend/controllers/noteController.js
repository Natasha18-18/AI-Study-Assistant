const Note = require("../models/note");
const UserActivity = require("../models/UserActivity");


// CREATE NOTE
exports.createNote = async (req, res) => {

  try {

    const { title, content, type } = req.body;

    const note = await Note.create({
      userId: req.user.id,
      title,
      content,
      type,
    });

    // 🔥 TRACK ACTIVITY
    let activity = await UserActivity.findOne({
      userId: req.user.id,
    });

    if (!activity) {
      activity = await UserActivity.create({
        userId: req.user.id,
      });
    }

    activity.notesCreated += 1;

    activity.recentNotes.unshift({
      title,
      createdAt: new Date(),
    });

    await activity.save();

    res.status(201).json(note);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create note",
    });

  }
};


// GET ALL NOTES
exports.getNotes = async (req, res) => {

  try {

    const notes = await Note.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notes",
    });

  }
};


// DELETE NOTE
exports.deleteNote = async (req, res) => {

  try {

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Note deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed",
    });

  }
};


// UPDATE NOTE
exports.updateNote = async (req, res) => {

  try {

    const updatedNote =
      await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(updatedNote);

  } catch (error) {

    res.status(500).json({
      message: "Update failed",
    });

  }
};