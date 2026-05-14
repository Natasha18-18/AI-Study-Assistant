const User = require("../models/user");
const bcrypt = require("bcryptjs");

// 🔹 UPDATE PROFILE
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // image
    if (req.file) {
      updateData.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

// 🔹 CHANGE PASSWORD (UPDATED)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 🔥 VALIDATION
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:"All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong current password",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error changing password",
    });
  }
};


// 🔹 DELETE ACCOUNT
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json({ message: "Account deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting account" });
  }
};

// FORGOT PASSWORD

exports.sendForgotOtp = async (req, res) => {
  const { email, phone } = req.body;

  const user = await User.findOne({ $or: [{ email }, { phone }] });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  user.forgotPasswordOtp = otp;
  user.forgotPasswordOtpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  if (email) await sendEmailOTP(email, otp);

  res.json({ msg: "OTP sent for password reset" });
};