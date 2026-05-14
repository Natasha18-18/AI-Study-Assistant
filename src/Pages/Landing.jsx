import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

const Landing = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b0f1a] via-[#15123a] to-black text-white">

      {/* 🔥 BACKGROUND GLOW BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-[-120px] right-[-120px]"></div>

      {/* <Navbar /> */}

      <div className="relative pt-28 px-4 md:px-12">

        {/* HERO */}
        <div className="grid md:grid-cols-2 items-center min-h-[90vh] gap-12">

          {/* LEFT */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Study Smarter with <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
                <Typewriter
                  words={[
                    "AI Assistant",
                    "Smart Notes",
                    "Quiz Generator",
                    "PDF Analyzer",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              </span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-lg mx-auto md:mx-0 text-lg">
              Chat with AI, generate notes, summarize PDFs, create quizzes,
              and track your learning — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">

              <Link to="/login">
                <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-7 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition">
                  Start Learning 🚀
                </button>
              </Link>

              <a href="#features">
                <button className="border border-white/20 px-7 py-3 rounded-xl hover:bg-white hover:text-black transition">
                  Explore Features
                </button>
              </a>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center items-center">

            {/* IMAGE */}
            <div className="relative group">
              <img
                src="src/assets/mainimg.jpg"
                alt="AI"
                className="w-72 md:w-80 lg:w-[400px] h-[440px] object-cover rounded-3xl shadow-2xl border border-white/10 transition group-hover:scale-105"
              />

              {/* glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 blur-2xl -z-10"></div>
            </div>

            {/* FLOATING CARDS */}
            {[
              { text: "AI Chat", pos: "top-6 -left-12", icon: "💬" },
              { text: "PDF Summary", pos: "top-28 -right-12", icon: "📄" },
              { text: "Quiz Generator", pos: "bottom-10 right-0", icon: "🧠" },
              { text: "Smart Notes", pos: "bottom-24 -left-14", icon: "📝" },
            ].map((item, i) => (
              <div
                key={i}
                className={`hidden md:flex items-center gap-2 absolute ${item.pos} bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-lg text-white/90 animate-[float_6s_ease-in-out_infinite]`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}

          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how" className="mt-28 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works ⚡
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Ask or Upload",
              "AI Generates",
              "Save & Practice",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition"
              >
                <h3 className="font-semibold mb-3 text-lg">
                  {i + 1}. {title}
                </h3>
                <p className="text-gray-400 text-sm">
                  Smart AI helps you instantly with learning tasks.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* WHY */}
        <div id="why" className="mt-28">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose AI Study? 💡
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "⚡ Fast Learning",
              "🧠 Smart AI",
              "📚 All-in-One",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition"
              >
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-gray-400 text-sm">
                  Enhance your learning with AI-driven tools.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div id="features" className="mt-28">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Powerful Features 🚀
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-5">
            {[
              "💬 AI Chat",
              "📝 Notes System",
              "📄 PDF Summary",
              "🧠 Quiz Generator",
              "📜 History",
              "⚡ All-in-One",
            ].map((title, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition"
              >
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-gray-400 text-sm">
                  Powerful feature to enhance your productivity.
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

        {/* CTA SECTION */}
  <div className="max-w-5xl mx-auto px-6 md:px-12 mb-12">
    <div className="text-center bg-gradient-to-r from-purple-700 to-pink-600 rounded-3xl p-10 shadow-2xl">

      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Study Smarter? 🚀
      </h2>

      <p className="text-gray-200 mb-6">
        Join now and transform your learning with AI-powered tools.
      </p>

      <a href="/login">
        <button className="bg-white text-black px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition">
          Get Started Free →
        </button>
      </a>

    </div>
  </div>

    </div>
  );
};

export default Landing;