const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/userController");

router.get(
  "/me",
  authMiddleware,
  async (req, res) => {

    res.json({
      user: req.user,
    });

  }
);

// 🔹 UPDATE PROFILE (name, email, profile pic)
router.put(
  "/update",
  authMiddleware,
  upload.single("profilePic"),
  updateUser
);

// 🔹 CHANGE PASSWORD
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// 🔹 DELETE ACCOUNT
router.delete(
  "/delete",
  authMiddleware,
  deleteUser
);

module.exports = router;