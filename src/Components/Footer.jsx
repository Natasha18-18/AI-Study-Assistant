const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white bg-[#050816] border-t border-white/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-[-100px] w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-[-100px] w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:35px_35px]"></div>

      <div className="relative z-10">

        {/* MAIN FOOTER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row justify-between items-center gap-10">

          {/* LOGO + DESC */}
          <div className="text-center md:text-left max-w-md">

            {/* LOGO */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.4)]">

                <span className="text-black font-extrabold text-lg">
                  AI
                </span>

              </div>

              <div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-white text-transparent bg-clip-text">
                  AI Study
                </h2>

                <p className="text-[10px] tracking-[3px] uppercase text-cyan-200/60">
                  Smart Learning
                </p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Smart AI-powered study platform to help you learn faster,
              generate notes instantly, and practice efficiently.
            </p>

          </div>

          {/* LINKS */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">

            {[
              {
                name: "How it Works",
                link: "/#how",
              },
              {
                name: "Features",
                link: "/#features",
              },
              {
                name: "Login",
                link: "/login",
              },
              {
                name: "Sign Up",
                link: "/signup",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="px-5 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-400/30 hover:-translate-y-1 transition-all duration-300"
              >
                {item.name}
              </a>
            ))}

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-5 text-center text-gray-500 text-sm backdrop-blur-md bg-white/[0.03]">
          © {new Date().getFullYear()} AI Study. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;