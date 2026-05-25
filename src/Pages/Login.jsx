import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  ShieldCheck,
  BrainCircuit,
  BookOpen,
  BarChart3,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [mode, setMode] =
    useState("password");

  const [loading, setLoading] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("error");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      otp: "",
    });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setMessage("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));

  };

  // =========================
  // PASSWORD LOGIN
  // =========================

  const handlePasswordLogin =
    async (e) => {

      e.preventDefault();

      if (
        !formData.email ||
        !formData.password
      ) {

        setMessageType("error");

        return setMessage(
          "Email aur password required hai"
        );

      }

      if (loading) return;

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email:
                formData.email.trim(),

              password:
                formData.password,
            }),
          }
        );

        const data =
          await res.json();

        setLoading(false);

        if (!res.ok) {

          setMessageType("error");

          return setMessage(
            data.msg ||
              data.message ||
              "Incorrect email or password"
          );

        }

        localStorage.clear();

        localStorage.setItem(
          "token",
          data.token
        );

        if (data.user) {

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          const fullImageUrl =
            data.user.profilePic
              ? `http://localhost:5000${data.user.profilePic}`
              : "https://i.pravatar.cc/150";

          localStorage.setItem(
            "profilePic",
            fullImageUrl
          );

        }

        navigate("/dashboard");

      } catch (err) {

        console.log(err);

        setLoading(false);

        setMessageType("error");

        setMessage("Server error");

      }
    };

  // =========================
  // SEND OTP
  // =========================

  const sendOtp = async () => {

    if (!formData.email) {

      setMessageType("error");

      return setMessage(
        "Email required"
      );

    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email:
              formData.email,
          }),
        }
      );

      const data =
        await res.json();

      setLoading(false);

      if (!res.ok) {

        setMessageType("error");

        return setMessage(
          data.message ||
            data.msg ||
            "OTP failed"
        );

      }

      setOtpSent(true);

      setMessageType("success");

      setMessage(
        "OTP Sent Successfully ✅"
      );

    } catch (err) {

      console.log(err);

      setLoading(false);

      setMessageType("error");

      setMessage("Server error");

    }
  };

  // =========================
  // VERIFY OTP LOGIN
  // =========================

  const verifyOtpLogin =
    async (e) => {

      e.preventDefault();

      if (!formData.otp) {

        setMessageType("error");

        return setMessage(
          "Please enter OTP"
        );

      }

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/verify-login-otp",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email:
                formData.email,

              otp:
                formData.otp,
            }),
          }
        );

        const data =
          await res.json();

        setLoading(false);

        if (!res.ok) {

          setMessageType("error");

          return setMessage(
            data.message ||
              data.msg ||
              "Invalid OTP"
          );

        }

        localStorage.clear();

        localStorage.setItem(
          "token",
          data.token
        );

        if (data.user) {

          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          const fullImageUrl =
            data.user.profilePic
              ? `http://localhost:5000${data.user.profilePic}`
              : "https://i.pravatar.cc/150";

          localStorage.setItem(
            "profilePic",
            fullImageUrl
          );

        }

        navigate("/dashboard");

      } catch (err) {

        console.log(err);

        setLoading(false);

        setMessageType("error");

        setMessage("Server error");

      }
    };

  // =========================
  // SWITCH MODE
  // =========================

  const switchMode = (m) => {

    setMode(m);

    setOtpSent(false);

    setMessage("");

    setFormData({
      email: "",
      password: "",
      otp: "",
    });

  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-[#050816] px-4 py-10 flex items-center justify-center">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* FLOATING ORBS */}
      <div className="absolute top-20 right-20 w-6 h-6 bg-cyan-400 rounded-full animate-bounce"></div>

      <div className="absolute bottom-32 left-24 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center relative">

          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            <h1 className="text-6xl font-black text-white leading-tight mb-6 mt-10">

              Learn
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Smarter
              </span>

              <br />

              With AI

            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">

              Revolutionize your study experience with
              intelligent AI tools, smart notes,
              personalized quizzes, and advanced
              productivity tracking.

            </p>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-2 gap-5">

              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-cyan-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BrainCircuit
                    className="text-cyan-400"
                    size={28}
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  AI Chat Assistant
                </h3>

                <p className="text-gray-400 text-sm">
                  Ask anything instantly and learn faster.
                </p>

              </div>

              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-blue-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BookOpen
                    className="text-blue-400"
                    size={28}
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Smart Notes
                </h3>

                <p className="text-gray-400 text-sm">
                  Organize all your learning material easily.
                </p>

              </div>

              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-pink-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BarChart3
                    className="text-pink-400"
                    size={28}
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Study Analytics
                </h3>

                <p className="text-gray-400 text-sm">
                  Track productivity and performance.
                </p>

              </div>

              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-yellow-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <Zap
                    className="text-yellow-400"
                    size={28}
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Productivity Boost
                </h3>

                <p className="text-gray-400 text-sm">
                  Study efficiently using AI-powered tools.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* LOGIN CARD */}
        <div className="relative">

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.45)] w-full max-w-md mx-auto mt-15">

            {/* LOGO */}
            <div className="flex justify-center mb-6">

              <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.6)]">

                <span className="text-black font-black text-3xl">
                  AI
                </span>

              </div>

            </div>

            {/* TITLE */}
            <h1 className="text-4xl font-black text-center text-white mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">
              Continue your intelligent learning journey.
            </p>

            {/* MESSAGE */}
            {message && (

              <div
                className={`mb-5 text-sm px-4 py-3 rounded-2xl border ${
                  messageType === "success"
                    ? "bg-green-500/10 border-green-400/20 text-green-300"
                    : "bg-red-500/10 border-red-400/20 text-red-300"
                }`}
              >

                {message}

              </div>

            )}

            {/* MODE SWITCH */}
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl mb-8">

              <button
                onClick={() =>
                  switchMode(
                    "password"
                  )
                }
                className={`w-1/2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mode === "password"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-400"
                }`}
              >

                Password

              </button>

              <button
                onClick={() =>
                  switchMode("otp")
                }
                className={`w-1/2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mode === "otp"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-400"
                }`}
              >

                OTP Login

              </button>

            </div>

            {/* PASSWORD LOGIN */}
            {mode === "password" && (

              <form
                onSubmit={
                  handlePasswordLogin
                }
                className="space-y-5"
              >

                {/* EMAIL */}
                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                {/* PASSWORD */}
                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

                {/* BUTTON */}
                <button
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] transition-all duration-300"
                >

                  {loading
                    ? "Loading..."
                    : "Login 🚀"}

                </button>

              </form>

            )}

            {/* OTP LOGIN */}
            {mode === "otp" && (

              <form
                onSubmit={
                  verifyOtpLogin
                }
                className="space-y-5"
              >

                {/* EMAIL */}
                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                {/* SEND OTP */}
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={
                    loading ||
                    otpSent
                  }
                  className="w-full bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 py-3 rounded-2xl text-white transition-all duration-300"
                >

                  {otpSent
                    ? "OTP Sent ✔"
                    : "Send OTP"}

                </button>

                {/* OTP */}
                <div className="relative">

                  <ShieldCheck
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    name="otp"
                    placeholder="Enter OTP"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                {/* VERIFY BUTTON */}
                <button
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] transition-all duration-300"
                >

                  {loading
                    ? "Verifying..."
                    : "Verify & Login"}

                </button>

              </form>

            )}

            {/* LINKS */}
            <div className="text-center mt-8 text-sm text-gray-400 space-y-4">

              <p>

                Don’t have an account?{" "}

                <Link
                  to="/signup"
                  className="text-cyan-300 font-semibold hover:text-cyan-200 transition"
                >

                  Sign up

                </Link>

              </p>

              <Link
                to="/forgot-password"
                className="text-yellow-300 hover:underline block"
              >

                Forgot Password?

              </Link>

              {/* BACK BUTTON */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition mt-2"
              >

                ← Back to Landing Page

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;