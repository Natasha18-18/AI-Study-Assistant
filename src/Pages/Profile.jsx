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
  Trophy,
  Crown,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PROFILE
  // =========================

  useEffect(() => {

    const token =
      localStorage.getItem("token");

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

        console.log(
          "Error fetching profile",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    getProfile();

  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-[#050816]
        flex items-center justify-center
        overflow-hidden
        relative
      ">

        {/* GRID */}
        <div className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "></div>

        {/* GLOW */}
        <div className="
          absolute top-[-100px] left-[-100px]
          w-[350px] h-[350px]
          bg-cyan-500/20
          blur-[120px]
          rounded-full
        "></div>

        <div className="
          absolute bottom-[-100px] right-[-100px]
          w-[350px] h-[350px]
          bg-blue-600/20
          blur-[120px]
          rounded-full
        "></div>

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            relative z-10
            w-28 h-28
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex items-center justify-center
            shadow-[0_0_60px_rgba(59,130,246,0.45)]
          "
        >

          <Brain size={45} className="text-white" />

        </motion.div>

      </div>
    );
  }

  return (

    <div className="
      min-h-screen
      relative overflow-hidden
      bg-[#050816]
      text-white
      px-4 md:px-8 py-8
    ">

      {/* GRID */}
      <div className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:40px_40px]
      "></div>

      {/* GLOWS */}
      <div className="
        absolute top-[-120px] left-[-120px]
        w-[420px] h-[420px]
        bg-cyan-500/20
        blur-[150px]
        rounded-full
      "></div>

      <div className="
        absolute bottom-[-120px] right-[-120px]
        w-[420px] h-[420px]
        bg-blue-600/20
        blur-[150px]
        rounded-full
      "></div>

      <div className="
        relative z-10
        max-w-7xl mx-auto
        space-y-8
      ">

        {/* HERO PROFILE */}
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
            rounded-[40px]
            border border-cyan-400/10
            bg-white/[0.05]
            backdrop-blur-3xl
            shadow-[0_0_60px_rgba(0,0,0,0.45)]
          "
        >

          {/* TOP COVER */}
          <div className="
            relative
            h-[280px]
            bg-gradient-to-r
            from-cyan-500
            via-blue-600
            to-indigo-700
            overflow-hidden
          ">

            {/* BLUR ORBS */}
            <div className="
              absolute top-[-80px] right-[-80px]
              w-[260px] h-[260px]
              bg-white/20
              blur-[90px]
              rounded-full
            "></div>

            <div className="
              absolute bottom-[-80px] left-[-80px]
              w-[220px] h-[220px]
              bg-cyan-200/20
              blur-[90px]
              rounded-full
            "></div>

            {/* PREMIUM BADGE */}
            <div className="
              absolute top-6 right-6
              px-5 py-2
              rounded-full
              bg-black/20
              border border-white/20
              backdrop-blur-xl
              flex items-center gap-2
            ">

              <Crown
                size={18}
                className="text-yellow-300"
              />

              <span className="font-semibold">
                Premium User
              </span>

            </div>

          </div>

          {/* PROFILE CONTENT */}
          <div className="
            relative
            px-6 md:px-12
            pb-10
          ">

            {/* IMAGE */}
            <div className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-24
            ">

              <div className="
                relative
              ">

                <div className="
                  absolute inset-0
                  rounded-full
                  bg-cyan-500/30
                  blur-[35px]
                "></div>

                <img
                  src={
                    user?.profilePic ||
                    "https://i.pravatar.cc/300"
                  }
                  alt="profile"
                  className="
                    relative
                    w-44 h-44
                    rounded-full
                    border-[6px]
                    border-[#050816]
                    object-cover
                    shadow-[0_0_50px_rgba(59,130,246,0.4)]
                  "
                />

              </div>

            </div>

            {/* TEXT */}
            <div className="
              pt-28
              text-center
            ">

              <div className="
                inline-flex
                items-center gap-2
                px-5 py-2
                rounded-full
                bg-cyan-500/10
                border border-cyan-400/20
                text-cyan-300
                mb-6
              ">

                <Sparkles size={18} />

                AI Study Assistant User

              </div>

              <h1 className="
                text-5xl md:text-6xl
                font-black
                bg-gradient-to-r
                from-cyan-300
                via-blue-400
                to-white
                text-transparent
                bg-clip-text
              ">
                {user?.name}
              </h1>

              <div className="
                flex items-center justify-center
                gap-3
                mt-5
                text-white/65
              ">

                <Mail size={18} />

                <span className="text-lg">
                  {user?.email}
                </span>

              </div>

              {/* ACTION BUTTON */}
              <div className="mt-10">

                <button
                  onClick={() =>
                    navigate(
                      "/dashboard/profile/edit"
                    )
                  }
                  className="
                    group
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-8 py-4
                    rounded-2xl
                    flex items-center gap-3
                    mx-auto
                    font-semibold
                    hover:scale-105
                    transition-all duration-300
                    shadow-[0_0_35px_rgba(59,130,246,0.35)]
                  "
                >

                  <Pencil size={20} />

                  Edit Profile

                  <ArrowRight
                    size={18}
                    className="
                      group-hover:translate-x-1
                      transition
                    "
                  />

                </button>

              </div>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="
          grid
          grid-cols-1 md:grid-cols-3
          gap-6
        ">

          {/* CARD 1 */}
          <motion.div
            whileHover={{
              y: -8,
            }}
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-cyan-400/10
              bg-white/[0.05]
              backdrop-blur-3xl
              p-8
              shadow-[0_0_40px_rgba(0,0,0,0.35)]
            "
          >

            <div className="
              absolute -top-20 -right-20
              w-48 h-48
              bg-cyan-500/20
              blur-[100px]
              rounded-full
            "></div>

            <div className="relative z-10">

              <div className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center justify-center
                shadow-[0_0_25px_rgba(59,130,246,0.35)]
              ">

                <User size={30} />

              </div>

              <h2 className="
                text-2xl
                font-bold
                mt-7
              ">
                Personal Info
              </h2>

              <p className="
                text-white/60
                mt-4
                leading-8
              ">
                Manage your identity and customize your premium AI learning experience.
              </p>

            </div>

          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{
              y: -8,
            }}
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-cyan-400/10
              bg-white/[0.05]
              backdrop-blur-3xl
              p-8
              shadow-[0_0_40px_rgba(0,0,0,0.35)]
            "
          >

            <div className="
              absolute -top-20 -right-20
              w-48 h-48
              bg-blue-500/20
              blur-[100px]
              rounded-full
            "></div>

            <div className="relative z-10">

              <div className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                flex items-center justify-center
                shadow-[0_0_25px_rgba(59,130,246,0.35)]
              ">

                <ShieldCheck size={30} />

              </div>

              <h2 className="
                text-2xl
                font-bold
                mt-7
              ">
                Security
              </h2>

              <p className="
                text-white/60
                mt-4
                leading-8
              ">
                Protected with JWT authentication and secure encrypted sessions.
              </p>

            </div>

          </motion.div>

          {/* CARD 3 */}
          <motion.div
            whileHover={{
              y: -8,
            }}
            className="
              relative overflow-hidden
              rounded-[32px]
              border border-cyan-400/10
              bg-white/[0.05]
              backdrop-blur-3xl
              p-8
              shadow-[0_0_40px_rgba(0,0,0,0.35)]
            "
          >

            <div className="
              absolute -top-20 -right-20
              w-48 h-48
              bg-indigo-500/20
              blur-[100px]
              rounded-full
            "></div>

            <div className="relative z-10">

              <div className="
                w-16 h-16
                rounded-3xl
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
                flex items-center justify-center
                shadow-[0_0_25px_rgba(99,102,241,0.35)]
              ">

                <Trophy size={30} />

              </div>

              <h2 className="
                text-2xl
                font-bold
                mt-7
              ">
                Learning Journey
              </h2>

              <p className="
                text-white/60
                mt-4
                leading-8
              ">
                Track AI-powered study progress and become more productive daily.
              </p>

            </div>

          </motion.div>

        </div>

        {/* ABOUT SECTION */}
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
            p-8 md:p-10
            shadow-[0_0_60px_rgba(0,0,0,0.4)]
          "
        >

          {/* GLOW */}
          <div className="
            absolute top-[-100px] right-[-100px]
            w-[300px] h-[300px]
            bg-cyan-500/20
            blur-[120px]
            rounded-full
          "></div>

          <div className="relative z-10">

            {/* HEADER */}
            <div className="
              flex items-center gap-4
              mb-8
            ">

              <div className="
                w-18 h-18
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                flex items-center justify-center
                shadow-[0_0_30px_rgba(59,130,246,0.35)]
                p-5
              ">

                <Brain size={30} />

              </div>

              <div>

                <h2 className="
                  text-4xl
                  font-black
                  bg-gradient-to-r
                  from-cyan-300
                  to-white
                  text-transparent
                  bg-clip-text
                ">
                  Your AI Study Assistant
                </h2>

                <p className="
                  text-white/55
                  mt-2
                ">
                  Smart productivity & learning ecosystem
                </p>

              </div>

            </div>

            {/* TEXT */}
            <p className="
              text-white/70
              text-lg
              leading-9
            ">
              Your AI Study Assistant helps you learn smarter with advanced AI tools. 
              Generate quizzes, summarize PDFs, manage notes, ask doubts instantly, 
              and improve your productivity with a premium futuristic dashboard experience.
            </p>

            {/* FEATURES */}
            <div className="
              grid
              grid-cols-1 md:grid-cols-2
              gap-6
              mt-10
            ">

              {/* FEATURE */}
              <div className="
                rounded-[28px]
                border border-cyan-400/10
                bg-black/20
                p-7
              ">

                <div className="
                  flex items-center gap-4
                  mb-5
                ">

                  <div className="
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    flex items-center justify-center
                  ">

                    <BookOpen size={24} />

                  </div>

                  <div>

                    <h3 className="
                      text-2xl font-bold
                    ">
                      Smart Notes
                    </h3>

                    <p className="text-white/50">
                      AI enhanced note system
                    </p>

                  </div>

                </div>

                <p className="
                  text-white/65
                  leading-8
                ">
                  Create beautiful notes, organize study material, and access your learning resources instantly.
                </p>

              </div>

              {/* FEATURE */}
              <div className="
                rounded-[28px]
                border border-cyan-400/10
                bg-black/20
                p-7
              ">

                <div className="
                  flex items-center gap-4
                  mb-5
                ">

                  <div className="
                    w-14 h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-600
                    flex items-center justify-center
                  ">

                    <Zap size={24} />

                  </div>

                  <div>

                    <h3 className="
                      text-2xl font-bold
                    ">
                      AI Assistance
                    </h3>

                    <p className="text-white/50">
                      Instant intelligent support
                    </p>

                  </div>

                </div>

                <p className="
                  text-white/65
                  leading-8
                ">
                  Ask questions, generate quizzes, summarize PDFs, and improve concepts instantly using AI.
                </p>

              </div>

            </div>

            {/* FOOTER BADGE */}
            <div className="
              mt-10
              flex justify-center
            ">

              <div className="
                inline-flex
                items-center gap-3
                px-6 py-3
                rounded-full
                bg-cyan-500/10
                border border-cyan-400/20
                text-cyan-300
              ">

                <Star size={18} />

                Built for next-generation students 🚀

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Profile;