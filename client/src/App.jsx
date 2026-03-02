import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import useTheme from "./zustand/useTheme";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed top-4 right-4 z-50">
      <label className="switch" title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
        <span className="slider">
          <div className="star star_1"></div>
          <div className="star star_2"></div>
          <div className="star star_3"></div>
          <svg viewBox="0 0 16 16" className="cloud_1 cloud">
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            ></path>
          </svg>
        </span>
      </label>
    </div>
  );
};

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center overflow-hidden relative" style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}>

      {/* Global theme toggle — fixed top-right, visible on all pages */}
      <ThemeSwitch />

      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
