import React from "react";
import { useNavigate } from "react-router-dom";
import Spotify from "../services/Spotify";

export default function AuthSocialButtons({ onSuccess }) {
  const navigate = useNavigate();

  const handleSpotifyConnect = async () => {
    await Spotify.getAccessToken();
    if (onSuccess) onSuccess(); // обновить App.js (setLoggedIn, setUserProfile)
    navigate("/home"); // редирект на Home
  };

  return (
    <div className="social-btns-row">
      <button
        className="social-btn spotify-btn"
        onClick={handleSpotifyConnect}
        type="button"
      >
        Connect Spotify
      </button>
    </div>
  );
}
