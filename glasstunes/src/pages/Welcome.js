import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import welcomeBg from "../assets/welcome-image.png";

export default function Welcome() {
  const navigate = useNavigate();


  // Основной рендер
  return (
    <div className="welcome-screen">
      <img src={welcomeBg} alt="" className="welcome-bg-image" />
      <div className="welcome-content">
        <div className="welcome-main-text">GlassTunes</div>
        <div className="welcome-text-description">
          Listen to free music from your favorite artists.
        </div>
        <button
          className="welcome-btn"
          onClick={() => navigate("/signup")}
        >
          Get started
        </button>
        <div
          className="welcome-already-account"
          onClick={() => navigate("/signin")}
        >
          I already have an account
        </div>
      </div>
    </div>
  );
}
