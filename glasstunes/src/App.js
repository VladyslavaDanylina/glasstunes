import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Spotify from "./services/Spotify";

function AppWrapper() {
  const location = useLocation();
  return <App currentPath={location.pathname} />;
}

function App({ currentPath }) {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Тут не вызывай useNavigate!
  // Перенеси navigate в нужный компонент

  const handleShowAuthModal = () => setAuthModalOpen(true);

  const handleLogout = () => {
    Spotify.logout();
    setLoggedIn(false);
    setUserProfile(null);
  };

  // После авторизации можешь делать navigate("/home") внутри компонента авторизации!
  const handleAuthSuccess = async () => {
    setAuthModalOpen(false);
    setLoggedIn(true);
    const profile = await Spotify.getUserProfile();
    setUserProfile(profile);
    // navigate("/home") ДОЛЖЕН БЫТЬ В КОМПОНЕНТЕ!
  };

  return (
    <>
      { !["/", "/signin", "/signup"].includes(currentPath) &&
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleShowAuthModal}
          onLogout={handleLogout}
          userProfile={userProfile}
        />
      }
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            isLoggedIn
              ? <Home isLoggedIn={isLoggedIn} userProfile={userProfile} />
              : <Navigate to="/" />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn
              ? <ProfilePage userProfile={userProfile} />
              : <Navigate to="/" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      { !["/", "/signin", "/signup", "/player"].includes(currentPath)
          && isLoggedIn && (
        <div style={{
          position: "fixed", top: 16, right: 16, display: "flex", alignItems: "center", gap: 12, zIndex: 1000
        }}>
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
