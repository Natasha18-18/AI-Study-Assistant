import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import DashboardLayout from "./Components/Layout";
import Dashboard from "./Pages/DashBoard";

import ForgotPassword from "./Pages/ForgotPassword";

import AskAi from "./Pages/AskAI";
import Notes from "./Pages/Notes";
import History from "./Pages/History";
import UploadPDF from "./Pages/Pdfupload";
import QuizGenerator from "./Pages/QuizGenerator";
import Profile from "./Pages/Profile";
import Logout from "./Pages/Logout";
import Settings from "./Pages/Setting";

// 🔥 Navbar & Footer only on public pages
function LayoutWrapper() {
  const location = useLocation();

  const publicPages = ["/", "/landing", "/login", "/signup","/forgot-password"];

  const showNavbarFooter = publicPages.includes(location.pathname);

  return (
    <>
      {/* ✅ Show only on Landing/Login/Signup */}
      {showNavbarFooter && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="askai" element={<AskAi />} />
          <Route path="askai/:id" element={<AskAi />} />
          <Route path="notes" element={<Notes />} />
          <Route path="history" element={<History />} />
          <Route path="upload" element={<UploadPDF />} />
          <Route path="quiz" element={<QuizGenerator />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* ✅ Footer only on Landing/Login/Signup */}
      {showNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  );
}

export default App;