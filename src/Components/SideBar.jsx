import {
  LayoutDashboard,
  Brain,
  FileText,
  History,
  Upload,
  ClipboardList,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  // const profilePic =
  //   localStorage.getItem("profilePic");

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

      window.location.href = "/landing";

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

    // ✅ IMPORTANT FIXES HERE
    <div
      className="
        h-full
        w-full
        overflow-hidden
        bg-[#1e293b]/95
        backdrop-blur-xl
        border-r
        border-white/10
        shadow-2xl
        flex
        flex-col
      "
    >

      {/* SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">

        {/* LOGO */}
        <h1 className="text-3xl font-bold text-white mb-8 leading-tight">
          AI Study
          <br />
          Assistant
        </h1>

        {/* PROFILE */}
        <Link
          to="/dashboard/settings"
          className="
            flex items-center gap-3 mb-8 p-3
            bg-white/10 rounded-2xl
            hover:bg-white/20
            transition-all duration-300
          "
        >

          <img
            src={validImage}
            alt="profile"
            onError={(e) => {
              e.target.src =
                "https://i.pravatar.cc/100";
            }}
            className="
              w-12 h-12 rounded-full
              object-cover
              border-2 border-purple-500
              shadow-md
              shrink-0
            "
          />

          <div className="min-w-0">

            <p className="text-white font-semibold truncate">
              {user?.name || "User"}
            </p>

            <p className="text-white/60 text-xs truncate">
              {user?.email || ""}
            </p>

            <p className="text-purple-400 text-xs mt-1">
              View & edit profile
            </p>

          </div>

        </Link>

        {/* NAVIGATION */}
        <div className="space-y-2">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  px-5 py-3 rounded-2xl
                  transition-all duration-300
                  overflow-hidden
                  
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                  `
                }
              >

                <Icon
                  size={20}
                  className="shrink-0"
                />

                <span className="font-medium truncate">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </div>

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="
            w-full
            flex items-center gap-4
            px-5 py-3 rounded-2xl
            text-gray-300
            hover:bg-red-500/20
            hover:text-red-400
            transition-all duration-300
          "
        >

          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
};

export default Sidebar;