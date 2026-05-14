const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white bg-[#050816] border-t border-white/10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-[-100px] w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-[-100px] w-72 h-72 bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* MAIN FOOTER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* LOGO + DESC */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-300 text-transparent bg-clip-text">
              AI Study
            </h2>

            <p className="text-gray-300 mt-3 text-sm leading-relaxed">
              Smart AI-powered study platform to help you learn faster,
              generate notes instantly, and practice efficiently.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-300">

            <a
              href="/#how"
              className="hover:text-purple-400 transition duration-300"
            >
              How it Works
            </a>

            <a
              href="/#features"
              className="hover:text-pink-400 transition duration-300"
            >
              Features
            </a>

            <a
              href="/login"
              className="hover:text-purple-400 transition duration-300"
            >
              Login
            </a>

            <a
              href="/signup"
              className="hover:text-pink-400 transition duration-300"
            >
              Sign Up
            </a>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-5 text-center text-gray-400 text-sm backdrop-blur-md bg-white/5">
          © {new Date().getFullYear()} AI Study. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;