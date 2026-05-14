import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SEND OTP
  const sendOtp = async () => {
    if (!form.email) return alert("Email required");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.msg);

      setStep(2);
    } catch {
      setLoading(false);
      alert("Server error");
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-forgot-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.msg);

      setStep(3);
    } catch {
      setLoading(false);
      alert("Server error");
    }
  };

  // RESET PASSWORD
  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) return alert(data.msg);

      alert("Password updated 🔐");
      navigate("/login");

    } catch {
      setLoading(false);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4">

      {/* GLOW BACKGROUND */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full top-[-120px] left-[-120px] animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px] animate-pulse"></div>

      {/* CARD */}
      <div className="w-full max-w-md z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Reset Password 🔐
        </h1>

        <p className="text-center text-white/60 text-sm mb-6">
          Secure your account in a few steps
        </p>

        {/* STEP PROGRESS */}
        <div className="flex justify-center gap-2 mb-6">
          {[1,2,3].map((s) => (
            <div
              key={s}
              className={`h-2 w-10 rounded-full ${
                step >= s ? "bg-purple-500" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">

            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-500 outline-none"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">

            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-pink-500 outline-none"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-white/60 text-sm hover:text-white"
            >
              ← Back
            </button>

          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-green-500 outline-none"
            />

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

          </div>
        )}

        {/* BACK TO LOGIN */}
        <div className="mt-6 text-center text-sm text-white/60">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-pink-400 font-medium cursor-pointer transition"
          >
            Login
          </span>
        </div>

        {/* BACK BUTTON */}
<div className="mt-5 text-center">
  <button
    onClick={() => navigate("/login")}
    className="text-white/60 hover:text-white transition text-sm"
  >
    ← Back to Login
  </button>
</div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;