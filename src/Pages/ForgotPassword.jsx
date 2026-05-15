import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Sparkles,
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

        return alert(data.msg);

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

        return alert(data.msg);

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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute w-[420px] h-[420px] bg-cyan-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-100px]"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* TOP BADGE */}
        <div className="flex justify-center mb-6">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl text-cyan-200 text-sm">

            <Sparkles size={16} />

            Secure AI Account

          </div>

        </div>

        {/* CARD */}
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

            Reset Password 🔐

          </h1>

          <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">

            Recover your account securely in just a few steps.

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

          {/* STEP 1 */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
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

          {/* STEP 2 */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-cyan-400/40 placeholder:text-gray-500 outline-none transition"
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

          {/* STEP 3 */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:border-green-400/40 placeholder:text-gray-500 outline-none transition"
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
          <div className="mt-5 text-center">

            <button
              onClick={() =>
                navigate("/login")
              }
              className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition text-sm"
            >

              <ArrowLeft size={16} />

              Back to Login

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;