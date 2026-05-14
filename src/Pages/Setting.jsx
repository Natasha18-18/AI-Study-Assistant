import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import {
  User,
  Shield,
  Settings as SettingsIcon,
  Upload,
  Camera,
  Lock,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Settings = () => {

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
    localStorage.getItem("profilePic") ||
      "https://i.pravatar.cc/150"
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

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
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (profilePic instanceof File) {
      formData.append("profilePic", profilePic);
    }

    const res = await axios.put(
      "http://localhost:5000/api/user/update",
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
      ? `http://localhost:5000${updatedUser.profilePic}`
      : "https://i.pravatar.cc/150";

    // ✅ SAVE ONLY ONCE
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("profilePic", imageUrl);

    // ✅ update UI instantly
    setPreview(imageUrl);
    setName(updatedUser.name);
    setEmail(updatedUser.email);

    alert("Profile updated ✅");

  } catch (err) {
    console.log(err);
    alert("Error updating profile");
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

      await axios.put(
        "http://localhost:5000/api/user/change-password",
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b16] via-[#0f172a] to-black text-white px-4 md:px-8 py-8">

      <div className="max-w-6xl mx-auto space-y-8">


        {/* ================= TABS ================= */}
        <div className="flex gap-4 flex-wrap">

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
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 border
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 border-transparent shadow-xl scale-105"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">
                  {tab.label}
                </span>
              </button>
            );
          })}

        </div>

        {/* ================= CONTENT ================= */}
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >

          {/* ================= PROFILE ================= */}
          {activeTab === "profile" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                  <User size={28} />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">
                    Profile Information
                  </h2>

                  <p className="text-white/50 mt-1">
                    Update your personal
                    details & profile image
                  </p>
                </div>

              </div>

              {/* PROFILE IMAGE */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">

                <div className="relative w-fit">

                  <img
                    src={preview}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-2xl"
                  />

                  <div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center border-4 border-[#0f172a]">
                    <Camera size={16} />
                  </div>

                </div>

                <div>

                  <h3 className="text-xl font-semibold">
                    {name || "Your Name"}
                  </h3>

                  <p className="text-white/50 mt-1">
                    {email || "Your Email"}
                  </p>

                  <label className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">

                    <Upload size={18} />

                    <span className="font-medium">
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

              </div>

              {/* INPUTS */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 focus-within:border-purple-500 transition">

                    <User
                      size={18}
                      className="text-white/40"
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
                      className="bg-transparent w-full outline-none"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 focus-within:border-purple-500 transition">

                    <Mail
                      size={18}
                      className="text-white/40"
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
                      className="bg-transparent w-full outline-none"
                    />

                  </div>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handleProfileUpdate
                }
                className="mt-8 bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-2xl"
              >
                Save Profile Changes
              </button>

            </div>
          )}

          {/* ================= SECURITY ================= */}
          {activeTab === "security" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Shield size={28} />
                </div>

                <div>
                  <h2 className="text-3xl font-bold">
                    Security Settings
                  </h2>

                  <p className="text-white/50 mt-1">
                    Change your password &
                    secure your account 🔐
                  </p>
                </div>

              </div>

              <div className="space-y-6">

                {/* CURRENT PASSWORD */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Current Password
                  </label>

                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 focus-within:border-blue-500 transition">

                    <Lock
                      size={18}
                      className="text-white/40"
                    />

                    <input
                      type="password"
                      placeholder="Current password"
                      value={
                        currentPassword
                      }
                      onChange={(e) =>
                        setCurrentPassword(
                          e.target.value
                        )
                      }
                      className="bg-transparent w-full outline-none"
                    />

                  </div>

                </div>

                {/* NEW PASSWORD */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    New Password
                  </label>

                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 focus-within:border-blue-500 transition">

                    <Lock
                      size={18}
                      className="text-white/40"
                    />

                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      className="bg-transparent w-full outline-none"
                    />

                  </div>

                </div>

                {/* CONFIRM PASSWORD */}
                <div>

                  <label className="text-sm text-white/60 mb-2 block">
                    Confirm Password
                  </label>

                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 focus-within:border-blue-500 transition">

                    <Lock
                      size={18}
                      className="text-white/40"
                    />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={
                        confirmPassword
                      }
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      className="bg-transparent w-full outline-none"
                    />

                  </div>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={
                  handlePasswordChange
                }
                className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-2xl"
              >
                Update Password
              </button>

            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
};

export default Settings;