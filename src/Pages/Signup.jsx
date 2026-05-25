// ================= SIGNUP.jsx =================

import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  User,
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

const Signup = () => {

  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("error");

  const [user, setUser] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });

  const handleChange = (e) => {

    setMessage("");

    setUser((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));

  };

  // ================= VALIDATION =================

  const validate = () => {

    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.password.trim() ||
      !user.confirmPassword.trim()
    ) {

      setMessageType("error");

      setMessage(
        "Fill all required fields"
      );

      return false;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(user.email)
    ) {

      setMessageType("error");

      setMessage(
        "Enter valid email"
      );

      return false;

    }

    // PASSWORD VALIDATION
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (
      !passwordRegex.test(
        user.password
      )
    ) {

      setMessageType("error");

      setMessage(
        "Password must contain uppercase, lowercase, number and minimum 6 characters"
      );

      return false;

    }

    if (
      user.password !==
      user.confirmPassword
    ) {

      setMessageType("error");

      setMessage(
        "Passwords do not match"
      );

      return false;

    }

    return true;

  };

  // ================= SIGNUP =================

  const handleSignup =
    async (e) => {

      e.preventDefault();

      if (!validate()) return;

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/signup",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                user.name.trim(),

              email: user.email
                .trim()
                .toLowerCase(),

              password:
                user.password,

              confirmPassword:
                user.confirmPassword,
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
              "Signup failed"
          );

        }

        setMessageType("success");

        setMessage(
          data.msg ||
            "OTP Sent Successfully ✅"
        );

        setStep(2);

      } catch (err) {

        console.log(err);

        setLoading(false);

        setMessageType("error");

        setMessage("Server error");

      }
    };

  // ================= VERIFY OTP =================

  const verifyOtp =
    async (e) => {

      e.preventDefault();

      if (!user.otp.trim()) {

        setMessageType("error");

        return setMessage(
          "Enter OTP"
        );

      }

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/verify-otp",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email: user.email
                .trim()
                .toLowerCase(),

              otp:
                user.otp.trim(),
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
              "Invalid OTP"
          );

        }

        setMessageType("success");

        setMessage(
          "Account verified 🚀"
        );

        setTimeout(() => {

          navigate("/login");

        }, 1200);

      } catch (err) {

        console.log(err);

        setLoading(false);

        setMessageType("error");

        setMessage("Server error");

      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4 py-10">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* FLOATING DOTS */}
      <div className="absolute top-20 right-24 w-5 h-5 bg-cyan-400 rounded-full animate-bounce"></div>

      <div className="absolute bottom-28 left-28 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT SECTION ================= */}

        <div className="hidden lg:flex flex-col justify-center relative">

          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            {/* TITLE */}
            <h1 className="text-6xl font-black leading-tight text-white mb-6 mt-10">

              Start Your
              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                AI Learning

              </span>

              <br />

              Journey 🚀

            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">

              Experience intelligent studying with AI-powered
              notes, smart quizzes, productivity tracking,
              and personalized learning assistance.

            </p>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-2 gap-5">

              {/* CARD 1 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-cyan-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BrainCircuit
                    size={28}
                    className="text-cyan-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  AI Assistant
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Learn instantly with intelligent AI support.
                </p>

              </div>

              {/* CARD 2 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-blue-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BookOpen
                    size={28}
                    className="text-blue-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Smart Notes
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Organize study material efficiently.
                </p>

              </div>

              {/* CARD 3 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-pink-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BarChart3
                    size={28}
                    className="text-pink-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Analytics
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Track learning progress with insights.
                </p>

              </div>

              {/* CARD 4 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-yellow-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <Zap
                    size={28}
                    className="text-yellow-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  Productivity
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  Boost efficiency with smart AI tools.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= SIGNUP CARD ================= */}

        <div className="relative">

          {/* CARD */}
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
              Create Account
            </h1>

            <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">
              Join AI Study and unlock smart AI-powered learning.
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

            {/* STEP INDICATOR */}
            <div className="flex justify-center gap-3 mb-8">

              <div
                className={`h-2 w-16 rounded-full transition-all duration-300 ${
                  step === 1
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600"
                    : "bg-white/10"
                }`}
              />

              <div
                className={`h-2 w-16 rounded-full transition-all duration-300 ${
                  step === 2
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600"
                    : "bg-white/10"
                }`}
              />

            </div>

            {/* ================= STEP 1 ================= */}

            {step === 1 && (

              <form
                onSubmit={handleSignup}
                className="space-y-5"
              >

                {/* NAME */}
                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    name="name"
                    placeholder="Full Name"
                    value={user.name}
                    onChange={
                      handleChange
                    }
                    autoComplete="name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                {/* EMAIL */}
                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={user.email}
                    onChange={
                      handleChange
                    }
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
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
                    placeholder="Password"
                    value={user.password}
                    onChange={
                      handleChange
                    }
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative">

                  <ShieldCheck
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={
                      user.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >

                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

                {/* PASSWORD RULES */}
                <div className="text-xs text-gray-400 leading-relaxed px-1">

                  Password must contain:
                  <br />
                  • 1 uppercase letter
                  <br />
                  • 1 lowercase letter
                  <br />
                  • 1 number
                  <br />
                  • Minimum 6 characters

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] transition-all duration-300 disabled:opacity-70"
                >

                  {loading
                    ? "Sending OTP..."
                    : "Send OTP 🚀"}

                </button>

              </form>

            )}

            {/* ================= STEP 2 ================= */}

            {step === 2 && (

              <form
                onSubmit={verifyOtp}
                className="space-y-5"
              >

                {/* OTP */}
                <div className="relative">

                  <ShieldCheck
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    name="otp"
                    placeholder="Enter OTP"
                    value={user.otp}
                    onChange={
                      handleChange
                    }
                    autoComplete="one-time-code"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                {/* VERIFY BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] transition-all duration-300 disabled:opacity-70"
                >

                  {loading
                    ? "Verifying..."
                    : "Verify OTP ✅"}

                </button>

                {/* BACK */}
                <button
                  type="button"
                  onClick={() =>
                    setStep(1)
                  }
                  className="w-full text-gray-400 text-sm hover:text-white transition"
                >

                  ← Back

                </button>

              </form>

            )}

            {/* LOGIN REDIRECT */}
            <div className="mt-8 text-center text-sm text-gray-400 space-y-4">

              <p>

                Already have an account?{" "}

                <span
                  onClick={() =>
                    navigate("/login")
                  }
                  className="text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer transition"
                >

                  Sign in

                </span>

              </p>

              {/* BACK TO LANDING */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition"
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

export default Signup;