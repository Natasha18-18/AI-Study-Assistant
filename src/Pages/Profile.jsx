import { useEffect, useState } from "react";

import {
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  Pencil,
  CalendarDays,
  BookOpen,
  Brain,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // ✅ FETCH PROFILE
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    const getProfile = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          return;
        }

        setUser(data);

      } catch (error) {

        console.log("Error fetching profile", error);

      } finally {

        setLoading(false);
      }
    };

    getProfile();

  }, []);


  // ✅ LOADING
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">

        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading Profile...
        </div>

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] px-4 py-10">

      <div className="max-w-6xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] overflow-hidden shadow-2xl">

          {/* COVER */}
          <div className="h-56 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 relative">

            {/* GLOW */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* PROFILE IMAGE */}
            <div className="absolute left-1/2 -bottom-20 transform -translate-x-1/2">

              <img
                src={
                  user?.profilePic ||
                  "https://i.pravatar.cc/200"
                }
                alt="profile"
                className="w-40 h-40 rounded-full border-[6px] border-white shadow-2xl object-cover"
              />

            </div>

          </div>


          {/* CONTENT */}
          <div className="pt-24 pb-10 px-6 md:px-12 text-center">

            {/* NAME */}
            <h1 className="text-5xl font-bold text-white tracking-wide">
              {user?.name}
            </h1>

            {/* EMAIL */}
            <div className="flex items-center justify-center gap-2 mt-4 text-white/70">

              <Mail size={18} />

              <p className="text-lg">
                {user?.email}
              </p>

            </div>


            {/* TAG */}
            <div className="mt-5 inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-200 px-5 py-2 rounded-full">

              <Sparkles size={18} />

              AI Study Assistant User

            </div>


            {/* BUTTON */}
            <div className="mt-8">

              <button
                onClick={() => navigate("/dashboard/profile/edit")}
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-lg flex items-center gap-3 mx-auto text-lg font-semibold"
              >

                <Pencil size={22} />

                Edit Profile

              </button>

            </div>

          </div>

        </div>


        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* CARD 1 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300">

            <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">

              <User size={30} />

            </div>

            <h2 className="text-white text-2xl font-bold">
              Personal Info
            </h2>

            <p className="text-white/70 mt-4 leading-relaxed">
              Update your profile details and customize your AI learning identity.
            </p>

          </div>


          {/* CARD 2 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300">

            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">

              <ShieldCheck size={30} />

            </div>

            <h2 className="text-white text-2xl font-bold">
              Account Security
            </h2>

            <p className="text-white/70 mt-4 leading-relaxed">
              Your account is secured with JWT authentication and protected routes.
            </p>

          </div>


          {/* CARD 3 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-xl hover:scale-105 transition duration-300">

            <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">

              <CalendarDays size={30} />

            </div>

            <h2 className="text-white text-2xl font-bold">
              Learning Journey
            </h2>

            <p className="text-white/70 mt-4 leading-relaxed">
              Track your AI-powered study progress and build smarter learning habits.
            </p>

          </div>

        </div>


        {/* EXTRA SECTION */}
        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center gap-3 mb-5">

            <Brain className="text-yellow-300" />

            <h2 className="text-3xl font-bold text-white">
              About Your AI Study Assistant
            </h2>

          </div>

          <p className="text-white/70 text-lg leading-relaxed">
            Your AI Study Assistant is designed to improve productivity and help
            you learn faster using AI-powered tools. You can generate quizzes,
            summarize notes, upload PDFs, ask questions, and track your progress
            — all in one modern dashboard.
          </p>


          {/* FEATURE BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">

              <div className="flex items-center gap-3 mb-3">

                <BookOpen className="text-purple-300" />

                <h3 className="text-white text-xl font-semibold">
                  Smart Notes
                </h3>

              </div>

              <p className="text-white/70">
                Create and manage study notes efficiently with AI support.
              </p>

            </div>


            <div className="bg-white/10 rounded-2xl p-6 border border-white/10">

              <div className="flex items-center gap-3 mb-3">

                <Brain className="text-pink-300" />

                <h3 className="text-white text-xl font-semibold">
                  AI Assistance
                </h3>

              </div>

              <p className="text-white/70">
                Ask doubts, generate quizzes, and improve concepts instantly.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;