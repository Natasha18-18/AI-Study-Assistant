import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text cursor-pointer">
            AI Study
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-base font-medium text-white">

          <a
            href="/#features"
            className="relative hover:text-purple-400 transition duration-300 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Features
          </a>

          <a
            href="/#how"
            className="relative hover:text-purple-400 transition duration-300 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            How it Works
          </a>

          <Link to="/login">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 rounded-xl text-base font-semibold shadow-md hover:scale-105 hover:shadow-purple-500/30 transition duration-300">
              Login 🚀
            </button>
          </Link>

        </div>

        {/* MOBILE ICON */}
        <div className="md:hidden text-white">
          {open ? (
            <X size={28} onClick={() => setOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/40 backdrop-blur-lg border-t border-white/10 px-6 py-6 space-y-6 text-lg font-medium text-center">

          <a
            href="/#features"
            onClick={() => setOpen(false)}
            className="block hover:text-purple-400"
          >
            Features
          </a>

          <a
            href="/#how"
            onClick={() => setOpen(false)}
            className="block hover:text-purple-400"
          >
            How it Works
          </a>

          <Link to="/login" onClick={() => setOpen(false)}>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 rounded-xl text-lg font-semibold shadow-md">
              Login 🚀
            </button>
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;