// ================= SIGNUP.jsx =================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

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
      [e.target.name]: e.target.value,
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
      alert("Fill all required fields");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(user.email)) {
      alert("Enter valid email");
      return false;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  // ================= SIGNUP =================
  const handleSignup = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: user.name.trim(),
            email: user.email.trim().toLowerCase(),
            password: user.password,
            confirmPassword:
              user.confirmPassword,
          }),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        return alert(
          data.msg || "Signup failed"
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
  const verifyOtp = async (e) => {

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
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: user.email.trim().toLowerCase(),
            otp: user.otp.trim(),
          }),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        return alert(
          data.msg || "Invalid OTP"
        );
      }

      alert("Account verified 🚀");

      navigate("/login");

    } catch (err) {

      console.log(err);

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
          Create Account 🚀
        </h1>

        <p className="text-center text-white/60 text-sm mb-6">
          Join AI Study and start learning smarter
        </p>

        {/* STEP INDICATOR */}
        <div className="flex justify-center mb-6 gap-2">

          <div
            className={`h-2 w-10 rounded-full ${
              step === 1
                ? "bg-purple-500"
                : "bg-white/20"
            }`}
          />

          <div
            className={`h-2 w-10 rounded-full ${
              step === 2
                ? "bg-purple-500"
                : "bg-white/20"
            }`}
          />

        </div>

        {/* STEP 1 */}
        {step === 1 && (

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >

            <input
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-purple-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-70"
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
            className="space-y-4"
          >

            <input
              name="otp"
              placeholder="Enter OTP"
              value={user.otp}
              onChange={handleChange}
              autoComplete="one-time-code"
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-pink-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-70"
            >

              {loading
                ? "Verifying..."
                : "Verify OTP"}

            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-white/60 text-sm hover:text-white"
            >
              ← Back
            </button>

          </form>

        )}

        {/* LOGIN REDIRECT */}
        <div className="mt-6 text-center text-sm text-white/60">

          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-pink-400 font-medium cursor-pointer transition"
          >
            Sign in
          </span>

        </div>

      </div>

    </div>
  );
};

export default Signup;