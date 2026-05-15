import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Landing = () => {
  const features = [
    {
      title: "AI Chat",
      icon: "💬",
      desc: "Ask anything instantly with AI-powered assistance.",
    },
    {
      title: "Smart Notes",
      icon: "📝",
      desc: "Generate beautiful notes for fast revision.",
    },
    {
      title: "PDF Summary",
      icon: "📄",
      desc: "Upload PDFs and get concise summaries instantly.",
    },
    {
      title: "Quiz Generator",
      icon: "🧠",
      desc: "Practice smarter using AI-generated quizzes.",
    },
    {
      title: "History",
      icon: "📜",
      desc: "Access your previous learning sessions anytime.",
    },
    {
      title: "All-in-One",
      icon: "⚡",
      desc: "Everything you need for studying in one platform.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#050816] text-white">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="relative pt-24 px-4 md:px-10 lg:px-16">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 items-center min-h-[92vh] gap-16">

          {/* LEFT */}
          <div className="text-center md:text-left">

            <div className="inline-flex items-center gap-2 bg-white/5 border border-cyan-400/20 backdrop-blur-xl px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-cyan-200">
                AI Powered Learning Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">

              Study Smarter with <br />

              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-white text-transparent bg-clip-text">
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

            <p className="text-gray-400 mt-7 max-w-xl mx-auto md:mx-0 text-lg leading-relaxed">
              Chat with AI, generate notes, summarize PDFs, create quizzes,
              and track your learning journey — all in one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center md:justify-start">

              <Link to="/login">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-semibold shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] transition-all duration-300">
                  Start Learning 🚀
                </button>
              </Link>

              <a href="#features">
                <button className="border border-cyan-400/30 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all duration-300">
                  Explore Features
                </button>
              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center items-center">

            {/* MAIN IMAGE */}
            <div className="relative group">

              <img
                src="src/assets/mainimg.jpg"
                alt="AI Study"
                className="w-72 md:w-80 lg:w-[420px] h-[500px] object-cover rounded-[32px] shadow-[0_0_50px_rgba(59,130,246,0.25)] border border-cyan-400/20 transition duration-500 group-hover:scale-105"
              />

              {/* IMAGE GLOW */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-2xl -z-10"></div>

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
                className={`hidden md:flex items-center gap-3 absolute ${item.pos} bg-[#0f172a]/80 backdrop-blur-2xl border border-cyan-400/20 shadow-[0_0_25px_rgba(59,130,246,0.15)] px-5 py-3 rounded-2xl text-white/90 animate-[float_6s_ease-in-out_infinite]`}
              >
                <span className="text-xl">{item.icon}</span>

                <span className="text-sm font-medium">
                  {item.text}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* HOW IT WORKS */}
        <div id="how" className="mt-28 scroll-mt-24">

          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            How It Works ⚡
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Ask or Upload",
                desc: "Type your question or upload PDFs instantly.",
              },
              {
                title: "AI Generates",
                desc: "AI creates summaries, notes, and quizzes in seconds.",
              },
              {
                title: "Save & Practice",
                desc: "Track progress and revise smarter every day.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-8 rounded-3xl hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all duration-300"
              >

                {/* <div className="text-5xl mb-6">
                  0{i + 1}
                </div> */}

                <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>


        {/* FEATURES */}
        <div id="features" className="mt-32 pb-24">

          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            Powerful Features 🚀
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((item, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all duration-300"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>

                {/* WHY CHOOSE */}
        <div id="why" className="mt-8 mb-20">

          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            Why Choose AI Study? 💡
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Fast Learning",
                icon: "⚡",
                desc: "Learn concepts faster with intelligent AI assistance.",
              },
              {
                title: "Smart AI",
                icon: "🧠",
                desc: "Advanced AI tools designed for students.",
              },
              {
                title: "All-in-One",
                icon: "📚",
                desc: "Everything you need for productivity and studying.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group text-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] p-8 rounded-3xl hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all duration-300"
              >

                <div className="text-5xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

        </div>


      </div>

      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-15">

        <div className="relative overflow-hidden text-center bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 border border-cyan-400/20 rounded-[40px] p-12 shadow-[0_0_60px_rgba(59,130,246,0.2)]">

          <div className="absolute top-[-80px] left-[-80px] w-[200px] h-[200px] bg-cyan-400/20 rounded-full blur-[100px]"></div>

          <div className="absolute bottom-[-80px] right-[-80px] w-[200px] h-[200px] bg-blue-500/20 rounded-full blur-[100px]"></div>

          <div className="relative">

            <h2 className="text-3xl md:text-5xl font-bold mb-5">
              Ready to Study Smarter? 🚀
            </h2>

            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              Join now and transform your learning experience using
              powerful AI-driven tools built for modern students.
            </p>

            <Link to="/login">
              <button className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
                Get Started Free →
              </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Landing;