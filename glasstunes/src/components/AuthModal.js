import React from 'react';
import Spotify from '../services/Spotify';
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const navigate = useNavigate();

  const handleSpotifyLogin = async () => {
    await Spotify.getAccessToken();
    onAuthSuccess();
    navigate("/home");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Вход через Spotify</h2>
        <p>Для работы с приложением требуется вход через Spotify Premium.</p>
        <button onClick={handleSpotifyLogin}>Войти через Spotify</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
}
