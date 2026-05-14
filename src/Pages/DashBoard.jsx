import { useEffect, useState } from "react";
import {
  Clock,
  FileText,
  Flame,
  ClipboardList,
  Trophy,
  Activity,
  Sparkles,
  BarChart3,
  Target,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  // =========================
  // USER SYNC
  // =========================
  useEffect(() => {

    const handleStorage = () => {

      setUser(
        JSON.parse(localStorage.getItem("user")) || {}
      );

    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () =>
      window.removeEventListener(
        "storage",
        handleStorage
      );

  }, []);

  const token =
    localStorage.getItem("token");

  const validImage = user?.profilePic
    ? `http://localhost:5000${user.profilePic}`
    : "https://i.pravatar.cc/100";

  // =========================
  // FETCH DASHBOARD
  // =========================
  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "DASHBOARD DATA:",
        res.data
      );

      setDashboardData(res.data);

    } catch (err) {

      console.log(
        "Dashboard Error:",
        err.response?.data || err.message
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {

    if (!token) {

      navigate("/login");
      return;

    }

    fetchDashboard();

  }, []);

  const stats = dashboardData || {};

  // =========================
  // QUICK STATS
  // =========================
  const quickStats = [
    {
      id: 1,
      title: "Study Minutes",
      value: `${stats.studyMinutes || 0}m`,
      icon: Clock,
      color:
        "from-blue-500 to-cyan-500",
    },

    {
      id: 2,
      title: "Notes Created",
      value: stats.notesCreated || 0,
      icon: FileText,
      color:
        "from-purple-500 to-pink-500",
    },

    {
      id: 3,
      title: "Quiz Attempts",
      value: stats.quizAttempts || 0,
      icon: ClipboardList,
      color:
        "from-orange-500 to-yellow-500",
    },

    {
      id: 4,
      title: "Study Streak",
      value: `${stats.streak || 0} Days`,
      icon: Flame,
      color:
        "from-red-500 to-orange-500",
    },

    {
      id: 5,
      title: "Best Quiz Score",
      value: `${stats.bestQuizScore || 0}%`,
      icon: Trophy,
      color:
        "from-green-500 to-emerald-500",
    },

    {
      id: 6,
      title: "Accuracy",
      value: `${stats.accuracy || 0}%`,
      icon: Activity,
      color:
        "from-pink-500 to-rose-500",
    },
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#070b16] via-[#0f172a] to-black text-white px-4 md:px-6 py-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.4)]">

          {/* Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-2xl">

                <Sparkles size={28} />

              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  Dashboard ✨
                </h1>

                <p className="text-white/60 mt-1">
                  Welcome back{" "}
                  <span className="text-purple-300 font-medium">
                    {user?.name || "Student"}
                  </span>
                </p>

              </div>

            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-xl">

              <img
                src={validImage}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://i.pravatar.cc/100";
                }}
              />

              <div>

                <p className="font-semibold">
                  {user?.name || "Student"}
                </p>

                <p className="text-white/50 text-sm">
                  AI Learning User
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= LOADING ================= */}
        {loading && (

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white/60 animate-pulse">
            Loading dashboard...
          </div>

        )}

        {/* ================= STATS ================= */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

            {quickStats.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                >

                  {/* Glow */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-r ${item.color} opacity-10 blur-3xl rounded-full`}
                  ></div>

                  <div className="relative z-10 flex items-start justify-between">

                    <div>

                      <p className="text-white/60 text-sm">
                        {item.title}
                      </p>

                      <h2 className="text-3xl font-bold mt-3">
                        {item.value}
                      </h2>

                    </div>

                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                    >

                      <Icon size={24} />

                    </div>

                  </div>

                </div>

              );
            })}

          </div>
        )}

        {/* ================= PERFORMANCE + ACHIEVEMENTS ================= */}
        {!loading && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* QUIZ PERFORMANCE */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-xl">

              <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">

                    <BarChart3 size={22} />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      Quiz Performance
                    </h2>

                    <p className="text-white/50 text-sm">
                      Your learning analytics
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                    <div>

                      <p className="text-white/50 text-sm">
                        Total Quizzes
                      </p>

                      <h2 className="text-2xl font-bold mt-1">
                        {stats.quizAttempts || 0}
                      </h2>

                    </div>

                    <ClipboardList className="text-cyan-400" />

                  </div>

                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                    <div>

                      <p className="text-white/50 text-sm">
                        Correct Answers
                      </p>

                      <h2 className="text-2xl font-bold mt-1">
                        {stats.correctAnswers || 0}
                      </h2>

                    </div>

                    <Target className="text-green-400" />

                  </div>

                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">

                    <div>

                      <p className="text-white/50 text-sm">
                        Accuracy
                      </p>

                      <h2 className="text-2xl font-bold mt-1">
                        {stats.accuracy || 0}%
                      </h2>

                    </div>

                    <Activity className="text-pink-400" />

                  </div>

                </div>

              </div>

            </div>

            {/* ACHIEVEMENTS */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-xl">

              <div className="absolute top-0 right-0 w-52 h-52 bg-purple-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">

                    <Trophy size={22} />

                  </div>

                  <div>

                    <h2 className="text-2xl font-bold">
                      Achievements
                    </h2>

                    <p className="text-white/50 text-sm">
                      Your milestones & rewards
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-5">

                    <p className="text-yellow-300 text-sm">
                      Best Quiz Score
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.bestQuizScore || 0}%
                    </h2>

                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-5">

                    <p className="text-purple-300 text-sm">
                      PDFs Uploaded
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.pdfUploaded || 0}
                    </h2>

                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-5">

                    <p className="text-green-300 text-sm">
                      Current Study Streak
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stats.streak || 0} Days
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>

  );
};

export default Dashboard;