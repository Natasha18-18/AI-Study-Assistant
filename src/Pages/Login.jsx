import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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

        const data =
          await res.json();

        setLoading(false);

        if (!res.ok) {
          return alert(
            data.msg ||
              "Login failed"
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
            email:
              formData.email,
          }),
        }
      );

      const data =
        await res.json();

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

  const verifyOtpLogin =
    async (e) => {

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
              email:
                formData.email,

              otp: formData.otp,
            }),
          }
        );

        const data =
          await res.json();

        setLoading(false);

        if (!res.ok) {
          return alert(
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

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050816] px-4 py-10">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute w-[420px] h-[420px] bg-cyan-500/20 blur-[120px] rounded-full top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* TOP BADGE */}
        <div className="flex justify-center mb-6">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-xl text-cyan-200 text-sm">

            <Sparkles size={16} />

            AI Powered Learning

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

            Welcome Back 👋

          </h1>

          <p className="text-center text-gray-400 text-sm mb-8 leading-relaxed">

            Continue your smart AI-powered learning journey.

          </p>

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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 text-white placeholder:text-gray-500 outline-none transition"
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={
                    handleChange
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 text-white placeholder:text-gray-500 outline-none transition"
                />

              </div>

              {/* BUTTON */}
              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] transition-all duration-300"
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 text-white placeholder:text-gray-500 outline-none transition"
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-400/40 text-white placeholder:text-gray-500 outline-none transition"
                />

              </div>

              {/* VERIFY BUTTON */}
              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] transition-all duration-300"
              >

                {loading
                  ? "Verifying..."
                  : "Verify & Login"}

              </button>

            </form>

          )}

          {/* LINKS */}
          <div className="text-center mt-8 text-sm text-gray-400 space-y-3">

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
              className="text-yellow-300 hover:underline"
            >

              Forgot Password?

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;