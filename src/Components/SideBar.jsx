import {
  LayoutDashboard,
  Brain,
  FileText,
  History,
  Upload,
  ClipboardList,
  LogOut,
  Settings as SettingsIcon,
  Sparkles,
  ChevronRight,
  Crown,
  ShieldCheck,
} from "lucide-react";

import {
  NavLink,
  Link,
} from "react-router-dom";

const Sidebar = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const validImage =
    user?.profilePic
      ? `http://localhost:5000${user.profilePic}`
      : "https://i.pravatar.cc/100";

  const handleLogout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (confirmLogout) {

      localStorage.clear();

      window.location.href =
        "/landing";

    }

  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Ask AI",
      path: "/dashboard/askai",
      icon: Brain,
    },
    {
      name: "Notes",
      path: "/dashboard/notes",
      icon: FileText,
    },
    {
      name: "History",
      path: "/dashboard/history",
      icon: History,
    },
    {
      name: "PDF Upload",
      path: "/dashboard/upload",
      icon: Upload,
    },
    {
      name: "Quiz Generator",
      path: "/dashboard/quiz",
      icon: ClipboardList,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ];

  return (

    <div
      className="
        h-full
        w-full
        bg-[#050816]
        backdrop-blur-3xl
        border-r border-white/10
        flex flex-col
        relative
        overflow-hidden
      "
    >

      {/* PREMIUM GLOWS */}
      <div className="absolute top-[-140px] left-[-100px] w-[320px] h-[320px] bg-cyan-400/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-140px] right-[-120px] w-[300px] h-[300px] bg-blue-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute top-[35%] right-[-120px] w-[240px] h-[240px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_40%)]"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-5 py-6 custom-scrollbar">

        {/* LOGO */}
        <div className="mb-10">

          <div className="flex items-center gap-4">

            {/* ICON */}
            <div
              className="
                relative
                w-16 h-16
                rounded-[26px]
                bg-gradient-to-br
                from-cyan-300
                via-blue-500
                to-indigo-600
                flex items-center justify-center
                shadow-[0_0_50px_rgba(59,130,246,0.55)]
              "
            >

              <div className="absolute inset-[1.5px] rounded-[24px] bg-[#071120]"></div>

              <span className="relative z-10 text-2xl font-black text-white">

                AI

              </span>

            </div>

            {/* TEXT */}
            <div>

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-tight
                  bg-gradient-to-r
                  from-white
                  via-cyan-200
                  to-blue-400
                  text-transparent
                  bg-clip-text
                "
              >

                AI Study

              </h1>

              <div className="flex items-center gap-2 mt-1">

                <ShieldCheck
                  size={13}
                  className="text-cyan-300"
                />

                <p className="text-[11px] uppercase tracking-[4px] text-cyan-100/70">

                  Smart Workspace

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* PROFILE CARD */}
        <Link
          to="/dashboard/settings"
          className="
            relative
            flex items-center gap-4
            p-5
            mb-10
            rounded-[30px]
            border border-cyan-400/10
            bg-white/[0.03]
            shadow-[0_0_30px_rgba(0,0,0,0.25)]
            backdrop-blur-3xl
            overflow-hidden
            transition-all duration-500
            hover:border-cyan-300/30
            hover:shadow-[0_0_60px_rgba(56,189,248,0.15)]
            group
          "
        >

          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

          {/* IMAGE */}
          <div className="relative shrink-0">

            <div className="absolute inset-0 rounded-3xl bg-cyan-400 blur-2xl opacity-30"></div>

            <img
              src={validImage}
              alt="profile"
              onError={(e) => {
                e.target.src =
                  "https://i.pravatar.cc/100";
              }}
              className="
                relative
                w-16 h-16
                rounded-3xl
                object-cover
                border-2 border-cyan-300/40
                shadow-[0_0_35px_rgba(56,189,248,0.4)]
              "
            />

          </div>

          {/* INFO */}
          <div className="relative z-10 min-w-0 flex-1">

            <h2 className="text-white font-bold text-[16px] truncate">

              {user?.name || "User"}

            </h2>

            <p className="text-slate-400 text-xs truncate mt-1">

              {user?.email || ""}

            </p>

            {/* <div
              className="
                inline-flex
                items-center gap-2
                mt-3
                px-3 py-1.5
                rounded-full
                bg-cyan-400/10
                border border-cyan-300/10
              "
            >

              <Crown
                size={13}
                className="text-cyan-300"
              />

              <span className="text-[11px] font-semibold text-cyan-100">

                PREMIUM MEMBER

              </span>

            </div> */}

          </div>

        </Link>

        {/* NAVIGATION TITLE */}
        <div className="flex items-center justify-between mb-4 px-2">

          <p className="text-[11px] uppercase tracking-[4px] text-slate-500 font-bold">

            Navigation

          </p>

          <Sparkles
            size={14}
            className="text-cyan-300"
          />

        </div>

        {/* NAVIGATION */}
        <div className="space-y-3">

          {navItems.map((item) => {

            const Icon =
              item.icon;

            return (

              <NavLink
                key={item.name}
                to={item.path}
                className={({
                  isActive,
                }) =>
                  `
                  group
                  relative
                  flex items-center justify-between
                  px-4 py-3.5
                  rounded-2xl
                  overflow-hidden
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-cyan-400
                        via-blue-500
                        to-indigo-600
                        text-white
                        shadow-[0_0_50px_rgba(59,130,246,0.55)]
                        scale-[1.02]
                      `
                      : `
                        bg-white/[0.03]
                        border border-white/5
                        text-slate-300
                        hover:bg-cyan-400/[0.08]
                        hover:border-cyan-300/10
                        hover:text-white
                        hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
                      `
                  }
                `
                }
              >

                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 transition duration-300"></div>

                {/* LEFT */}
                <div className="relative z-10 flex items-center gap-4">

                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      flex items-center justify-center
                      bg-black/20
                      border border-white/10
                      backdrop-blur-xl
                    "
                  >

                    <Icon size={20} />

                  </div>

                  <span className="font-semibold tracking-wide">

                    {item.name}

                  </span>

                </div>

                {/* RIGHT */}
                <ChevronRight
                  size={18}
                  className="
                    relative z-10
                    opacity-0
                    translate-x-2
                    group-hover:translate-x-0
                    group-hover:opacity-100
                    transition-all duration-300
                  "
                />

              </NavLink>

            );

          })}

        </div>

      </div>

      {/* FOOTER */}
      <div
        className="
          relative z-10
          p-5
          border-t border-cyan-400/10
          bg-white/[0.03]
          backdrop-blur-2xl
        "
      >

        {/* AI CARD */}
        {/* <div
          className="
            mb-5
            p-4
            rounded-3xl
            border border-cyan-400/10
            bg-gradient-to-br
            from-cyan-400/10
            via-blue-500/10
            to-purple-500/10
          "
        > */}

          {/* <div className="flex items-center justify-between mb-3">

            <div>

              <p className="text-white font-semibold text-sm">

                AI Workspace

              </p>

              <p className="text-slate-400 text-xs mt-1">

                Premium access enabled

              </p>

            </div>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-cyan-400/10
                flex items-center justify-center
              "
            >

              <Sparkles
                size={18}
                className="text-cyan-300"
              />

            </div>

          </div> */}

          {/* PROGRESS */}
          {/* <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

            <div
              className="
                h-full
                w-[85%]
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-indigo-600
                shadow-[0_0_20px_rgba(56,189,248,0.6)]
              "
            ></div>

          </div> */}

        {/* </div> */}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            w-full
            flex items-center justify-center gap-3
            px-5 py-4
            rounded-2xl
            bg-white/[0.04]
            border border-white/10
            text-slate-300
            hover:bg-red-500/10
            hover:border-red-400/20
            hover:text-red-400
            transition-all duration-300
            group
          "
        >

          <LogOut
            size={20}
            className="group-hover:rotate-12 transition"
          />

          <span className="font-semibold tracking-wide">

            Logout

          </span>

        </button>

      </div>

    </div>

  );

};

export default Sidebar;