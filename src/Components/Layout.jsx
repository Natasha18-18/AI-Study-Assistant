import { Outlet } from "react-router-dom";
import { useState } from "react";

import {
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import Sidebar from "./Sidebar";

const DashboardLayout = () => {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  return (

    <div className="relative h-screen overflow-hidden bg-[#020817] text-white">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[-180px] left-[-140px] w-[420px] h-[420px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-120px] w-[400px] h-[400px] bg-blue-600/20 blur-[140px] rounded-full"></div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setOpenSidebar(true)
        }
        className="
          lg:hidden
          fixed top-5 left-5 z-50
          w-12 h-12
          rounded-2xl
          border border-cyan-400/20
          bg-white/[0.08]
          backdrop-blur-2xl
          flex items-center justify-center
          shadow-[0_0_25px_rgba(59,130,246,0.3)]
          hover:scale-105
          hover:border-cyan-400/40
          transition-all duration-300
        "
      >

        <Menu size={24} />

      </button>

      {/* OVERLAY */}
      {openSidebar && (

        <div
          onClick={() =>
            setOpenSidebar(false)
          }
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />

      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          transition-transform duration-300 ease-in-out

          bg-[#030712]/95
          backdrop-blur-3xl
          border-r border-cyan-400/10
          shadow-[0_0_50px_rgba(0,0,0,0.45)]

          ${
            openSidebar
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        {/* MOBILE CLOSE */}
        <button
          onClick={() =>
            setOpenSidebar(false)
          }
          className="
            lg:hidden
            absolute top-5 right-5
            z-50
            w-10 h-10
            rounded-xl
            bg-white/5
            border border-white/10
            flex items-center justify-center
            text-gray-300
            hover:text-white
            hover:border-cyan-400/30
            transition
          "
        >

          <X size={22} />

        </button>

        {/* SIDEBAR */}
        <div className="h-full overflow-hidden">

          <Sidebar />

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main
        className="
          relative z-10
          lg:ml-72
          h-screen
          overflow-y-auto
          overflow-x-hidden
        "
      >

        {/* MOBILE SPACE */}
        <div className="h-20 lg:hidden shrink-0" />

        {/* TOP BAR */}
        <div
          className="
            sticky top-0 z-30
            backdrop-blur-3xl
            bg-[#020817]/70
            border-b border-cyan-400/5
            px-4 md:px-8
            py-5
          "
        >

        </div>

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

          {/* CONTENT WRAPPER */}
          <div
            className="
              relative
              rounded-[32px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-4 md:p-6
              overflow-hidden
              shadow-[0_0_50px_rgba(0,0,0,0.25)]
            "
          >

            {/* INNER GLOW */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] pointer-events-none"></div>

            {/* CONTENT */}
            <div className="relative z-10">

              <Outlet />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default DashboardLayout;