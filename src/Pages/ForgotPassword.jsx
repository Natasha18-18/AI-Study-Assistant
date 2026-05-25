import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import {
  Mail,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Sparkles,
  BrainCircuit,
  Shield,
  KeyRound,
  Zap,
} from "lucide-react";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      otp: "",
      newPassword: "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  // ================= SEND OTP =================

  const sendOtp = async () => {

    if (!form.email) {

      return alert(
        "Email required"
      );

    }

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: form.email,
          }),
        }
      );

      const data =
        await res.json();

      setLoading(false);

      if (!res.ok) {

        return alert(
          data.msg
        );

      }

      setStep(2);

    } catch {

      setLoading(false);

      alert("Server error");

    }

  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/verify-forgot-otp",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: form.email,
            otp: form.otp,
          }),
        }
      );

      const data =
        await res.json();

      setLoading(false);

      if (!res.ok) {

        return alert(
          data.msg
        );

      }

      setStep(3);

    } catch {

      setLoading(false);

      alert("Server error");

    }

  };

  // ================= RESET PASSWORD =================

  const resetPassword =
    async () => {

      setLoading(true);

      try {

        const res = await fetch(
          "http://localhost:5000/api/auth/reset-password",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email: form.email,
              newPassword:
                form.newPassword,
            }),
          }
        );

        const data =
          await res.json();

        setLoading(false);

        if (!res.ok) {

          return alert(
            data.msg
          );

        }

        alert(
          "Password updated 🔐"
        );

        navigate("/login");

      } catch {

        setLoading(false);

        alert("Server error");

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4 py-10">

      {/* GRID BG */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-500/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* FLOATING DOTS */}
      <div className="absolute top-20 right-24 w-5 h-5 bg-cyan-400 rounded-full animate-bounce"></div>

      <div className="absolute bottom-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT SECTION ================= */}

        <div className="hidden lg:flex flex-col justify-center relative">

          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10">

            {/* BADGE */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl text-cyan-200 text-sm mb-8">

              <Sparkles size={16} />

              Secure AI Authentication

            </div> */}

            {/* TITLE */}
            <h1 className="text-6xl font-black leading-tight text-white mb-6 mt-10">

              Recover
              <br />

              Your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                {" "}Account

              </span>

            </h1>

            {/* DESC */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-10">

              Reset your password securely using advanced
              OTP verification and AI-powered account protection.

            </p>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-2 gap-5">

              {/* CARD 1 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-cyan-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <Shield
                    size={28}
                    className="text-cyan-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">

                  Secure Recovery

                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">

                  Multi-step password reset protection system.

                </p>

              </div>

              {/* CARD 2 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-blue-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <KeyRound
                    size={28}
                    className="text-blue-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">

                  OTP Verification

                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">

                  Email-based authentication for account safety.

                </p>

              </div>

              {/* CARD 3 */}
              <div className="group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 hover:scale-105 hover:border-pink-400/30 transition-all duration-300">

                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 group-hover:rotate-6 transition">

                  <BrainCircuit
                    size={28}
                    className="text-pink-400"
                  />

                </div>

                <h3 className="text-white font-bold text-lg mb-2">

                  AI Security

                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">

                  Intelligent authentication system protection.

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

                  Fast Recovery

                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">

                  Reset passwords instantly in just a few steps.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT CARD ================= */}

        <div className="relative">

          {/* CARD */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[36px] p-8 shadow-[0_10px_60px_rgba(0,0,0,0.45)] w-full max-w-md mx-auto">

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

              Reset Password 🔐

            </h1>

            <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">

              Recover your account securely in a few easy steps.

            </p>

            {/* STEP PROGRESS */}
            <div className="flex justify-center gap-3 mb-8">

              {[1, 2, 3].map(
                (s) => (

                  <div
                    key={s}
                    className={`h-2 w-16 rounded-full transition-all duration-300 ${
                      step >= s
                        ? "bg-gradient-to-r from-cyan-400 to-blue-600"
                        : "bg-white/10"
                    }`}
                  />

                )
              )}

            </div>

            {/* ================= STEP 1 ================= */}

            {step === 1 && (

              <div className="space-y-5">

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    name="email"
                    placeholder="Enter your email"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] transition-all duration-300"
                >

                  {loading
                    ? "Sending..."
                    : "Send OTP 🚀"}

                </button>

              </div>

            )}

            {/* ================= STEP 2 ================= */}

            {step === 2 && (

              <div className="space-y-5">

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
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] transition-all duration-300"
                >

                  {loading
                    ? "Verifying..."
                    : "Verify OTP ✅"}

                </button>

                <button
                  onClick={() =>
                    setStep(1)
                  }
                  className="w-full text-gray-400 text-sm hover:text-white transition"
                >

                  ← Back

                </button>

              </div>

            )}

            {/* ================= STEP 3 ================= */}

            {step === 3 && (

              <div className="space-y-5">

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300"
                  />

                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={
                      handleChange
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-green-400/40 focus:bg-white/10 placeholder:text-gray-500 outline-none transition-all duration-300"
                  />

                </div>

                <button
                  onClick={
                    resetPassword
                  }
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] transition-all duration-300"
                >

                  {loading
                    ? "Updating..."
                    : "Reset Password 🔐"}

                </button>

              </div>

            )}

            {/* LOGIN LINK */}
            <div className="mt-8 text-center text-sm text-gray-400">

              Remember your password?{" "}

              <span
                onClick={() =>
                  navigate("/login")
                }
                className="text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer transition"
              >

                Login

              </span>

            </div>

            {/* BACK BUTTON */}
            <div className="mt-5 text-center space-y-3">

              <button
                onClick={() =>
                  navigate("/login")
                }
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition text-sm"
              >

                <ArrowLeft size={16} />

                Back to Login

              </button>

              <div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition text-sm"
                >

                  ← Back to Landing Page

                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;