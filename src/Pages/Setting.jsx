import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import {
  User,
  Shield,
  Upload,
  Camera,
  Lock,
  Mail,
  Sparkles,
  CheckCircle2,
  Crown,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";

const Settings = () => {

  const API_URL = import.meta.env.VITE_API_URL; 

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [activeTab, setActiveTab] =
    useState("profile");

  const [name, setName] = useState(
    storedUser?.name || ""
  );

  const [email, setEmail] = useState(
    storedUser?.email || ""
  );

  const [profilePic, setProfilePic] =
    useState(null);

  const [preview, setPreview] = useState(
  storedUser?.profilePic
    ? `${API_URL}${storedUser.profilePic}`
    : "https://i.pravatar.cc/150"
);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const token = localStorage.getItem("token");

  // =========================
  // IMAGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);

      if (profilePic instanceof File) {
        formData.append(
          "profilePic",
          profilePic
        );
      }

      const res = await axios.put(
        `${API_URL}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = {
        ...storedUser,
        ...res.data.user,
      };

      const imageUrl = updatedUser.profilePic
        ? `${API_URL}${updatedUser.profilePic}`
        : "https://i.pravatar.cc/150";

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      window.dispatchEvent(new Event("storage"));

      localStorage.setItem(
        "profilePic",
        imageUrl
      );

      setPreview(imageUrl);
      setName(updatedUser.name);
      setEmail(updatedUser.email);

      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PASSWORD
  // =========================
  const handlePasswordChange = async () => {
    try {

      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {
        return alert(
          "All fields are required"
        );
      }

      if (newPassword.length < 6) {
        return alert(
          "Password must be at least 6 characters"
        );
      }

      if (
        newPassword !== confirmPassword
      ) {
        return alert(
          "Passwords do not match"
        );
      }

      setLoading(true);

      await axios.put(
        `${API_URL}/api/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password updated 🔐");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.log(err);
      alert("Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-[#050816]
        text-white
        px-4 md:px-8
        py-8
      "
    >

      {/* GRID */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* GLOWS */}
      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[350px]
          h-[350px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          bg-blue-500/20
          blur-[120px]
          rounded-full
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative overflow-hidden
            rounded-[38px]
            border border-cyan-400/10
            bg-white/[0.05]
            backdrop-blur-3xl
            p-7 md:p-10
            shadow-[0_0_60px_rgba(0,0,0,0.45)]
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-80
              h-80
              bg-cyan-500/20
              blur-[120px]
              rounded-full
            "
          />

          <div
            className="
              relative z-10
              flex flex-col lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            "
          >

            <div className="flex items-center gap-5">

              <div
                className="
                  w-20 h-20
                  rounded-[28px]
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  flex items-center justify-center
                  shadow-[0_0_35px_rgba(59,130,246,0.45)]
                "
              >
                <Sparkles size={34} />
              </div>

              <div>

                {/* <div
                  className="
                    inline-flex items-center gap-2
                    px-4 py-1.5
                    rounded-full
                    border border-cyan-400/20
                    bg-cyan-400/10
                    text-cyan-300
                    text-xs
                    font-semibold
                    mb-4
                  "
                >
                  <Crown size={14} />
                  PREMIUM SETTINGS
                </div> */}

                <h1
                  className="
                    text-4xl md:text-5xl
                    font-black
                    bg-gradient-to-r
                    from-cyan-300
                    via-blue-400
                    to-white
                    text-transparent
                    bg-clip-text
                  "
                >
                  Account Settings
                </h1>

                <p className="text-white/55 mt-3">
                  Manage your profile, security &
                  personalization experience.
                </p>

              </div>

            </div>

            {/* QUICK STATUS */}
            <div
              className="
                flex items-center gap-4
                px-5 py-4
                rounded-3xl
                border border-emerald-400/15
                bg-emerald-500/10
                backdrop-blur-xl
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-500
                  flex items-center justify-center
                "
              >
                <CheckCircle2 size={26} />
              </div>

              <div>
                <p className="text-sm text-white/50">
                  Account Status
                </p>

                <h3 className="font-bold text-lg text-emerald-300">
                  Fully Secured
                </h3>
              </div>

            </div>

          </div>

        </motion.div>

        {/* TABS */}
        <div className="flex gap-4 mt-8 flex-wrap">

          {[
            {
              id: "profile",
              label: "Profile",
              icon: User,
            },
            {
              id: "security",
              label: "Security",
              icon: Shield,
            },
          ].map((tab) => {

            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id)
                }
                className={`
                  group
                  flex items-center gap-3
                  px-7 py-4
                  rounded-2xl
                  border
                  transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? `
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        border-transparent
                        shadow-[0_0_35px_rgba(59,130,246,0.35)]
                        scale-105
                      `
                      : `
                        bg-white/[0.05]
                        border-white/10
                        hover:bg-white/[0.08]
                      `
                  }
                `}
              >

                <Icon size={20} />

                <span className="font-semibold">
                  {tab.label}
                </span>

              </button>
            );
          })}

        </div>

        {/* CONTENT */}
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="mt-8"
        >

          {/* PROFILE */}
          {activeTab === "profile" && (

            <div
              className="
                relative overflow-hidden
                rounded-[36px]
                border border-cyan-400/10
                bg-white/[0.05]
                backdrop-blur-3xl
                p-8 md:p-10
                shadow-[0_0_60px_rgba(0,0,0,0.35)]
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  top-[-100px]
                  right-[-100px]
                  w-[280px]
                  h-[280px]
                  bg-blue-500/20
                  blur-[120px]
                  rounded-full
                "
              />

              <div className="relative z-10">

                {/* TOP */}
                <div
                  className="
                    flex flex-col lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-8
                    mb-10
                  "
                >

                  <div className="flex items-center gap-6">

                    {/* IMAGE */}
                    <div className="relative">

                      <div
                        className="
                          absolute inset-0
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-600
                          blur-xl
                          opacity-60
                        "
                      />

                      <img
                        src={preview}
                        alt="profile"
                        className="
                          relative
                          w-32 h-32
                          rounded-full
                          object-cover
                          border-[5px]
                          border-white/20
                          shadow-2xl
                        "
                      />

                      <label
                        className="
                          absolute
                          bottom-2
                          right-2
                          w-11 h-11
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-500
                          to-blue-600
                          flex items-center justify-center
                          cursor-pointer
                          border-4 border-[#050816]
                          shadow-xl
                        "
                      >

                        <Camera size={16} />

                        <input
                          type="file"
                          onChange={
                            handleImageChange
                          }
                          className="hidden"
                        />

                      </label>

                    </div>

                    {/* INFO */}
                    <div>

                      <h2 className="text-3xl font-bold">
                        {name || "Your Name"}
                      </h2>

                      <p className="text-white/50 mt-2">
                        {email || "Your Email"}
                      </p>

                      {/* <div
                        className="
                          mt-5
                          inline-flex items-center gap-2
                          px-4 py-2
                          rounded-full
                          bg-cyan-500/10
                          border border-cyan-500/20
                          text-cyan-300
                          text-sm
                        "
                      >
                        <Zap size={15} />
                        AI Study Premium User
                      </div> */}

                    </div>

                  </div>

                  {/* UPLOAD BUTTON */}
                  <label
                    className="
                      inline-flex
                      items-center gap-3
                      px-6 py-4
                      rounded-2xl
                      bg-white/[0.06]
                      border border-white/10
                      hover:bg-white/[0.09]
                      cursor-pointer
                      transition-all
                    "
                  >

                    <Upload size={18} />

                    <span className="font-semibold">
                      Upload New Photo
                    </span>

                    <input
                      type="file"
                      onChange={
                        handleImageChange
                      }
                      className="hidden"
                    />

                  </label>

                </div>

                {/* INPUTS */}
                <div className="grid md:grid-cols-2 gap-7">

                  {/* NAME */}
                  <div>

                    <label className="text-white/60 text-sm mb-3 block">
                      Full Name
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        px-5 py-4
                        rounded-2xl
                        bg-black/20
                        border border-white/10
                        focus-within:border-cyan-400/40
                        focus-within:shadow-[0_0_20px_rgba(34,211,238,0.2)]
                        transition-all
                      "
                    >

                      <User
                        size={18}
                        className="text-cyan-300"
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="
                          bg-transparent
                          w-full
                          outline-none
                          placeholder:text-white/30
                        "
                      />

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div>

                    <label className="text-white/60 text-sm mb-3 block">
                      Email Address
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        px-5 py-4
                        rounded-2xl
                        bg-black/20
                        border border-white/10
                        focus-within:border-cyan-400/40
                        focus-within:shadow-[0_0_20px_rgba(34,211,238,0.2)]
                        transition-all
                      "
                    >

                      <Mail
                        size={18}
                        className="text-cyan-300"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        placeholder="Enter your email"
                        className="
                          bg-transparent
                          w-full
                          outline-none
                          placeholder:text-white/30
                        "
                      />

                    </div>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={
                    handleProfileUpdate
                  }
                  disabled={loading}
                  className="
                    mt-10
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-8 py-4
                    rounded-2xl
                    font-bold
                    hover:scale-105
                    transition-all duration-300
                    shadow-[0_0_35px_rgba(59,130,246,0.35)]
                    disabled:opacity-60
                    flex items-center gap-3
                  "
                >

                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Save Profile Changes
                    </>
                  )}

                </button>

              </div>

            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (

            <div
              className="
                relative overflow-hidden
                rounded-[36px]
                border border-cyan-400/10
                bg-white/[0.05]
                backdrop-blur-3xl
                p-8 md:p-10
                shadow-[0_0_60px_rgba(0,0,0,0.35)]
              "
            >

              <div
                className="
                  absolute
                  bottom-[-100px]
                  left-[-100px]
                  w-[280px]
                  h-[280px]
                  bg-cyan-500/20
                  blur-[120px]
                  rounded-full
                "
              />

              <div className="relative z-10">

                {/* HEADER */}
                <div className="flex items-center gap-5 mb-10">

                  <div
                    className="
                      w-20 h-20
                      rounded-[28px]
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      flex items-center justify-center
                      shadow-[0_0_35px_rgba(59,130,246,0.35)]
                    "
                  >
                    <Shield size={34} />
                  </div>

                  <div>

                    <h2 className="text-4xl font-black">
                      Security Center
                    </h2>

                    <p className="text-white/50 mt-2">
                      Protect your account with
                      strong credentials 🔐
                    </p>

                  </div>

                </div>

                <div className="space-y-7">

                  {/* CURRENT */}
                  <div>

                    <label className="text-white/60 text-sm mb-3 block">
                      Current Password
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        px-5 py-4
                        rounded-2xl
                        bg-black/20
                        border border-white/10
                        focus-within:border-cyan-400/40
                        transition-all
                      "
                    >

                      <Lock
                        size={18}
                        className="text-cyan-300"
                      />

                      <input
                        type={
                          showCurrent
                            ? "text"
                            : "password"
                        }
                        placeholder="Current password"
                        value={
                          currentPassword
                        }
                        onChange={(e) =>
                          setCurrentPassword(
                            e.target.value
                          )
                        }
                        className="
                          bg-transparent
                          w-full
                          outline-none
                          placeholder:text-white/30
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrent(
                            !showCurrent
                          )
                        }
                      >

                        {showCurrent ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* NEW */}
                  <div>

                    <label className="text-white/60 text-sm mb-3 block">
                      New Password
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        px-5 py-4
                        rounded-2xl
                        bg-black/20
                        border border-white/10
                        focus-within:border-cyan-400/40
                        transition-all
                      "
                    >

                      <Lock
                        size={18}
                        className="text-cyan-300"
                      />

                      <input
                        type={
                          showNew
                            ? "text"
                            : "password"
                        }
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(
                            e.target.value
                          )
                        }
                        className="
                          bg-transparent
                          w-full
                          outline-none
                          placeholder:text-white/30
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNew(!showNew)
                        }
                      >

                        {showNew ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* CONFIRM */}
                  <div>

                    <label className="text-white/60 text-sm mb-3 block">
                      Confirm Password
                    </label>

                    <div
                      className="
                        flex items-center gap-3
                        px-5 py-4
                        rounded-2xl
                        bg-black/20
                        border border-white/10
                        focus-within:border-cyan-400/40
                        transition-all
                      "
                    >

                      <Lock
                        size={18}
                        className="text-cyan-300"
                      />

                      <input
                        type={
                          showConfirm
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm password"
                        value={
                          confirmPassword
                        }
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        className="
                          bg-transparent
                          w-full
                          outline-none
                          placeholder:text-white/30
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirm(
                            !showConfirm
                          )
                        }
                      >

                        {showConfirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                      </button>

                    </div>

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={
                    handlePasswordChange
                  }
                  disabled={loading}
                  className="
                    mt-10
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-8 py-4
                    rounded-2xl
                    font-bold
                    hover:scale-105
                    transition-all duration-300
                    shadow-[0_0_35px_rgba(59,130,246,0.35)]
                    disabled:opacity-60
                  "
                >

                  {loading
                    ? "Updating..."
                    : "Update Password"}

                </button>

              </div>

            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
};

export default Settings;