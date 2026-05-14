const express = require("express");
const router = express.Router();

const {
  signup,
  verifyOtp,
  loginWithPassword,
  sendLoginOtp,
  verifyLoginOtp,
  sendForgotOtp,
  verifyForgotOtp,
  resetPassword,
} = require("../controllers/authcontroller");

// SIGNUP
router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);

// LOGIN
router.post("/login", loginWithPassword);
router.post("/login-otp", sendLoginOtp);
router.post("/verify-login-otp", verifyLoginOtp);

// FORGOT PASSWORD
router.post("/forgot-otp", sendForgotOtp);
router.post("/verify-forgot-otp", verifyForgotOtp);
router.post("/reset-password", resetPassword);

module.exports = router;