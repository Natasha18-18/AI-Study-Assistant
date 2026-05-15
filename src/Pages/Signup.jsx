// ================= SIGNUP.jsx =================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const Signup = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {

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

      alert(
        "Fill all required fields"
      );

      return false;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(user.email)
    ) {

      alert("Enter valid email");

      return false;

    }

    if (
      user.password.length < 6
    ) {

      alert(
        "Password must be at least 6 characters"
      );

      return false;

    }

    if (
      user.password !==
      user.confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return false;

    }

    return true;

  };

  // ================= SIGNUP =================

  const handleSignup = async (
    e
  ) => {

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
            name: user.name.trim(),

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

        return alert(
          data.msg ||
            "Signup failed"
        );

      }

      alert(data.msg);

      setStep(2);

    } catch (err) {

      console.log(err);

      setLoading(false);

      alert("Server error");

    }

  };

  // ================= VERIFY OTP =================

  const verifyOtp = async (
    e
  ) => {

    e.preventDefault();

    if (!user.otp.trim()) {

      return alert("Enter OTP");

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

            otp: user.otp.trim(),
          }),
        }
      );

      const data =
        await res.json();

      setLoading(false);

      if (!res.ok) {

        return alert(
          data.msg ||
            "Invalid OTP"
        );

      }

      alert(
        "Account verified 🚀"
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      setLoading(false);

      alert("Server error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4 py-10">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute w-[420px] h-[420px] bg-cyan-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* TOP BADGE */}
        <div className="flex justify-center mb-6">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl text-cyan-200 text-sm">

            <Sparkles size={16} />

            Join AI Learning

          </div>

        </div>

        {/* MAIN CARD */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">

          {/* LOGO */}
          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_35px_rgba(59,130,246,0.5)]">

              <span className="text-black font-extrabold text-2xl">
                AI
              </span>

            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-extrabold text-center text-white mb-3">

            Create Account

          </h1>

          <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">

            Join AI Study and start learning smarter with AI-powered tools.

          </p>

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

          {/* STEP 1 */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
                />

              </div>

              {/* PASSWORD */}
              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={
                    handleChange
                  }
                  autoComplete="new-password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative">

                <ShieldCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={
                    user.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="new-password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] transition-all duration-300 disabled:opacity-70"
              >

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}

              </button>

            </form>

          )}

          {/* STEP 2 */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
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

              {/* BACK BUTTON */}
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
          <div className="mt-8 text-center text-sm text-gray-400">

            Already have an account?{" "}

            <span
              onClick={() =>
                navigate("/login")
              }
              className="text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer transition"
            >

              Sign in

            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;