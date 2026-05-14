// ================= controllers/authcontroller.js =================

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// ================= EMAIL FUNCTION =================

const sendEmailOTP = async (email, otp) => {

  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "OTP Verification",

    html: `
      <div style="font-family:sans-serif;">
        <h2>Your OTP is:</h2>

        <h1>${otp}</h1>

        <p>OTP valid for 5 minutes.</p>
      </div>
    `,
  });

};


// ================= SIGNUP =================

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      confirmPassword,
    } = req.body;


    // VALIDATION
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      return res.status(400).json({
        msg: "All fields are required",
      });

    }

    if (password.length < 6) {

      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });

    }

    if (password !== confirmPassword) {

      return res.status(400).json({
        msg: "Passwords do not match",
      });

    }

    const existing = await User.findOne({
      email,
    });

    if (existing) {

      return res.status(400).json({
        msg: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const signupOtp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    const user = new User({
      name,
      email,

      password: hashedPassword,

      isVerified: false,

      signupOtp,

      signupOtpExpiry:
        Date.now() + 5 * 60 * 1000,
    });

    await user.save();

    await sendEmailOTP(
      email,
      signupOtp
    );

    res.status(201).json({
      msg: "Signup OTP sent 🚀",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= VERIFY SIGNUP OTP =================

exports.verifyOtp = async (req, res) => {

  try {

    const { email, otp } = req.body;

    if (!email || !otp) {

      return res.status(400).json({
        msg: "Email and OTP required",
      });

    }

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    if (
      !user.signupOtp ||
      user.signupOtp !== otp ||
      user.signupOtpExpiry < Date.now()
    ) {

      return res.status(400).json({
        msg: "Invalid or expired OTP",
      });

    }

    user.isVerified = true;

    user.signupOtp = null;

    user.signupOtpExpiry = null;

    await user.save();

    res.json({
      msg: "Account verified 🚀",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= LOGIN WITH PASSWORD =================

exports.loginWithPassword = async (
  req,
  res
) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        msg: "All fields required",
      });

    }

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        msg: "User not found",
      });

    }

    if (!user.isVerified) {

      return res.status(400).json({
        msg: "Verify OTP first",
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        msg: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= SEND LOGIN OTP =================

exports.sendLoginOtp = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({
        msg: "Email required",
      });

    }

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    const loginOtp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    user.loginOtp = loginOtp;

    user.loginOtpExpiry =
      Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmailOTP(
      email,
      loginOtp
    );

    res.json({
      msg: "Login OTP sent 🚀",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= VERIFY LOGIN OTP =================

exports.verifyLoginOtp = async (
  req,
  res
) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    if (
      !user.loginOtp ||
      user.loginOtp !== otp ||
      user.loginOtpExpiry < Date.now()
    ) {

      return res.status(400).json({
        msg: "Invalid OTP",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    user.loginOtp = null;

    user.loginOtpExpiry = null;

    await user.save();

    res.json({
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= SEND FORGOT PASSWORD OTP =================

exports.sendForgotOtp = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    user.forgotPasswordOtp = otp;

    user.forgotPasswordOtpExpiry =
      Date.now() + 5 * 60 * 1000;

    user.isForgotOtpVerified = false;

    await user.save();

    await sendEmailOTP(email, otp);

    res.json({
      msg: "OTP sent 🚀",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= VERIFY FORGOT OTP =================

exports.verifyForgotOtp = async (
  req,
  res
) => {

  try {

    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    if (
      !user.forgotPasswordOtp ||
      user.forgotPasswordOtp !== otp ||
      user.forgotPasswordOtpExpiry <
        Date.now()
    ) {

      return res.status(400).json({
        msg: "Invalid OTP",
      });

    }

    user.isForgotOtpVerified = true;

    await user.save();

    res.json({
      msg: "OTP verified 🚀",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};


// ================= RESET PASSWORD =================

exports.resetPassword = async (
  req,
  res
) => {

  try {

    const { email, newPassword } =
      req.body;

    if (!email || !newPassword) {

      return res.status(400).json({
        msg: "All fields required",
      });

    }

    if (newPassword.length < 6) {

      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });

    }

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        msg: "User not found",
      });

    }

    if (!user.isForgotOtpVerified) {

      return res.status(400).json({
        msg: "OTP not verified",
      });

    }

    const hashed =
      await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    user.forgotPasswordOtp = null;

    user.forgotPasswordOtpExpiry = null;

    user.isForgotOtpVerified = false;

    await user.save();

    res.json({
      msg: "Password updated 🔐",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

};