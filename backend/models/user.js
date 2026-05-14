const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: String,

    isVerified: {
      type: Boolean,
      default: false,
    },

    // SIGNUP OTP
    signupOtp: String,
    signupOtpExpiry: Date,

    // LOGIN OTP
    loginOtp: String,
    loginOtpExpiry: Date,

    // FORGOT PASSWORD
    forgotPasswordOtp: String,
    forgotPasswordOtpExpiry: Date,
    isForgotOtpVerified: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);