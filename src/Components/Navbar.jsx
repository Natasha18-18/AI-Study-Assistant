import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Navbar blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleScrollToSection = (id) => {

    setOpen(false);

    // IF USER IS NOT ON LANDING PAGE
    if (location.pathname !== "/") {

      navigate("/");

      // wait for page render
      setTimeout(() => {

        const section =
          document.getElementById(id);

        if (section) {

          const navbarHeight = 100;

          const sectionPosition =
            section.getBoundingClientRect().top +
            window.pageYOffset;

          const offsetPosition =
            sectionPosition -
            navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

        }

      }, 200);

      return;
    }

    // IF USER IS ALREADY ON LANDING PAGE
    const section =
      document.getElementById(id);

    if (section) {

      const navbarHeight = 100;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.pageYOffset;

      const offsetPosition =
        sectionPosition -
        navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050816]/80 backdrop-blur-2xl border-b border-cyan-400/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-14 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="group">
          <div className="flex items-center gap-3">

            {/* LOGO ICON */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:scale-110 transition duration-300">

              <span className="text-black font-extrabold text-lg">
                AI
              </span>

            </div>

            {/* LOGO TEXT */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-300 via-blue-400 to-white text-transparent bg-clip-text">
                AI Study
              </h1>

              <p className="text-[11px] text-cyan-200/70 tracking-[3px] uppercase">
                Smart Learning
              </p>
            </div>

          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-white">

          {[
            { name: "How It Works", id: "how" },
            { name: "Features", id: "features" },
            { name: "Why Choose Us", id: "why" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() =>
                handleScrollToSection(
                  item.id
                )
              }
              className="relative text-gray-300 hover:text-cyan-300 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </button>
          ))}

          {/* LOGIN BUTTON */}
          <Link to="/login">
            <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl text-sm font-semibold shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300">

              <span className="relative z-10">
                Login 🚀
              </span>

            </button>
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-11 h-11 rounded-xl border border-cyan-400/20 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:border-cyan-400/50 transition"
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          open
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-3xl border border-cyan-400/10 bg-[#0b1120]/90 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-6">

          <div className="flex flex-col gap-5 text-center">

            {[
              { name: "Features", id: "features" },
              { name: "How It Works", id: "how" },
              { name: "Why Choose Us", id: "why" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() =>
                  handleScrollToSection(
                    item.id
                  )
                }
                className="text-gray-300 text-lg font-medium hover:text-cyan-300 transition duration-300"
              >
                {item.name}
              </button>
            ))}

            {/* MOBILE BUTTON */}
            <Link
              to="/login"
              onClick={() =>
                setOpen(false)
              }
            >
              <button className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-2xl text-base font-semibold shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:scale-[1.02] transition-all duration-300">
                Login 🚀
              </button>
            </Link>

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;