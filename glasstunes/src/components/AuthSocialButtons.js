import React from "react";
import "./AuthSocialButtons.css";
import Spotify from "../services/Spotify";

export default function AuthSocialButtons({ onSuccess }) {
  // onSuccess — колбэк после успешной авторизации (можно не передавать)

  const handleSpotifyConnect = async () => {
    await Spotify.getAccessToken();
    if (onSuccess) onSuccess();
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