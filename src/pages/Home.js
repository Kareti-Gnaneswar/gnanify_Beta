// src/App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./pages/Profile";
import Courses from "./components/courses";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import Founder from "./components/Founder";
import VideoList from "./components/VideoList";
import Resources from "./components/Resources";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./pages/Home"; // ✅ Import the new Home

import "./styles/App.css";

function App() {
  const { user, logout } = useContext(AuthContext);

  const [adminAuthenticated, setAdminAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const adminAuthStatus = localStorage.getItem("adminAuthenticated");
    if (adminAuthStatus === "true") {
      setAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = () => {
    setAdminAuthenticated(true);
    localStorage.setItem("adminAuthenticated", "true");
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  return (
    <div className="app-container">
      <Navbar isLoggedIn={!!user} onLogout={logout} />

      <Routes>
        {/* Home page handled by Home.js now */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/resources" element={<Resources />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin handleAdminLogin={handleAdminLogin} />} />
        <Route
          path="/admin-dashboard"
          element={
            adminAuthenticated ? (
              <AdminDashboard handleAdminLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        {/* Protected Profile */}
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
