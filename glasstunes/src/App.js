import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Spotify from "./services/Spotify";

// Обёртка чтобы использовать useLocation
function AppWrapper() {
  const location = useLocation();
  return <App currentPath={location.pathname} />;
}

function App({ currentPath }) {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = Spotify.getAccessToken();
    if (token) {
      setLoggedIn(true);
      Spotify.getUserProfile().then(setUserProfile);
    }
  }, []);

  const handleLogin = () => setAuthModalOpen(true);
  const handleLogout = () => {
    Spotify.logout();
    setLoggedIn(false);
    setUserProfile(null);
  };
  const handleAuthSuccess = async () => {
    setAuthModalOpen(false);
    setLoggedIn(true);
    const profile = await Spotify.getUserProfile();
    setUserProfile(profile);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        userProfile={userProfile}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} userProfile={userProfile} />}
        />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage userProfile={userProfile} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Не показывать профиль и выход на странице плеера */}
      {currentPath !== "/player" && isLoggedIn && (
        <div style={{ position: "fixed", top: 16, right: 16 }}>
          <img
            src={userProfile?.avatar}
            alt="avatar"
            width={40}
            style={{ borderRadius: "50%" }}
          />
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </>
  );
}

export default function Main() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
