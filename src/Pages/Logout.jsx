import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      // 🔥 CLEAR LOCAL AUTH
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profilePic");

      // optional: backend logout API (future use)
      // await fetch("http://localhost:5000/api/auth/logout", { method: "POST" });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 500);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-950 to-purple-900">

      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl text-center">

        {/* ICON */}
        <div className="flex justify-center">
          <div className="bg-red-500 p-6 rounded-full text-white shadow-lg">
            <LogOut size={55} />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-white mt-8">
          Logout
        </h1>

        <p className="text-white/70 mt-4 text-lg max-w-lg mx-auto">
          Are you sure you want to logout from your AI Study Assistant account?
        </p>

        {/* SECURITY BOX */}
        <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-5 flex items-center gap-4 text-left">

          <div className="bg-green-500 p-3 rounded-xl text-white">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg">
              Your Data is Safe
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Your saved notes and AI history remain securely stored.
            </p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-10">

          {/* CANCEL */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white/10 hover:bg-white/20 transition text-white px-8 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3"
          >
            <ArrowLeft size={22} />
            Cancel
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-60 transition text-white px-8 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3"
          >
            <LogOut size={22} />
            {loading ? "Logging out..." : "Logout"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Logout;