import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import Sidebar from "./Sidebar";

const DashboardLayout = () => {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  return (

    // ✅ FIXED HEIGHT + HIDE OUTER SCROLL
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-black text-white">

      {/* MOBILE MENU */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-xl shadow-lg"
      >

        <Menu size={22} />

      </button>


      {/* OVERLAY */}
      {openSidebar && (
        <div
          onClick={() =>
            setOpenSidebar(false)
          }
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}


      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          transition-transform duration-300 ease-in-out
          bg-white/5 backdrop-blur-2xl border-r border-white/10

          ${
            openSidebar
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() =>
            setOpenSidebar(false)
          }
          className="lg:hidden absolute top-5 right-5 text-white"
        >

          <X size={26} />

        </button>

        {/* SIDEBAR CONTENT */}
        <div className="h-full overflow-y-auto">

          <Sidebar />

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main
        className="
          lg:ml-72
          h-screen
          overflow-y-auto
          overflow-x-hidden
        "
      >

        {/* MOBILE SPACE */}
        <div className="h-16 lg:hidden shrink-0" />

        {/* PAGE CONTENT */}
        <div
          className="
            min-h-full
            px-4
            md:px-6
            lg:px-8
            py-6
          "
        >

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;