import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("password");

  const [loading, setLoading] =
    useState(false);

  const [otpSent, setOtpSent] =
    useState(false);

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

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  // =========================
  // PASSWORD LOGIN
  // =========================

  const handlePasswordLogin = async (
    e
  ) => {

    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      return alert(
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

      const data = await res.json();

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      setLoading(false);

      if (!res.ok) {
        return alert(
          data.msg || "Login failed"
        );
      }

      // CLEAR OLD DATA
      localStorage.clear();

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
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

      alert("Server error");

    }
  };

  // =========================
  // SEND OTP
  // =========================

  const sendOtp = async () => {

    if (!formData.email) {
      return alert(
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
            email: formData.email,
          }),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        return alert(
          data.message ||
            data.msg ||
            "OTP failed"
        );
      }

      setOtpSent(true);

      alert("OTP Sent ✅");

    } catch (err) {

      console.log(err);

      setLoading(false);

      alert("Server error");

    }
  };

  // =========================
  // VERIFY OTP LOGIN
  // =========================

  const verifyOtpLogin = async (
    e
  ) => {

    e.preventDefault();

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
            email: formData.email,
            otp: formData.otp,
          }),
        }
      );

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        return alert(
          data.message ||
            data.msg ||
            "Invalid OTP"
        );
      }

      // CLEAR OLD DATA
      localStorage.clear();

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
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

      alert("Server error");

    }
  };

  // =========================
  // SWITCH MODE
  // =========================

  const switchMode = (m) => {

    setMode(m);

    setOtpSent(false);

    setFormData({
      email: "",
      password: "",
      otp: "",
    });

  };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4">

      {/* BACKGROUND */}

      <div className="absolute w-[400px] h-[400px] bg-purple-600/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>

      <div className="absolute w-[350px] h-[350px] bg-pink-500/20 blur-3xl rounded-full bottom-[-120px] right-[-100px] animate-pulse"></div>

      {/* CARD */}

      <div className="w-full max-w-md z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">

          Welcome Back 👋

        </h1>

        <p className="text-center text-white/60 text-sm mb-6">

          Continue your AI learning journey

        </p>

        {/* MODE SWITCH */}

        <div className="flex gap-3 justify-center mb-6">

          <button
            onClick={() =>
              switchMode("password")
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              mode === "password"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white/10 text-white/60"
            }`}
          >

            Password

          </button>

          <button
            onClick={() =>
              switchMode("otp")
            }
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              mode === "otp"
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-white/10 text-white/60"
            }`}
          >

            OTP

          </button>

        </div>

        {/* PASSWORD LOGIN */}

        {mode === "password" && (

          <form
            onSubmit={
              handlePasswordLogin
            }
            className="space-y-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-purple-500 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
            >

              {loading
                ? "Loading..."
                : "Login"}

            </button>

          </form>

        )}

        {/* OTP LOGIN */}

        {mode === "otp" && (

          <form
            onSubmit={verifyOtpLogin}
            className="space-y-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-pink-500 outline-none"
            />

            <button
              type="button"
              onClick={sendOtp}
              disabled={
                loading || otpSent
              }
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl transition"
            >

              {otpSent
                ? "OTP Sent ✔"
                : "Send OTP"}

            </button>

            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/10 focus:border-pink-500 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg"
            >

              {loading
                ? "Verifying..."
                : "Verify & Login"}

            </button>

          </form>

        )}

        {/* LINKS */}

        <div className="text-center mt-6 text-sm text-white/60 space-y-2">

          <p>

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-purple-400 font-semibold"
            >

              Sign up

            </Link>

          </p>

          <Link
            to="/forgot-password"
            className="text-yellow-300 hover:underline"
          >

            Forgot Password?

          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;