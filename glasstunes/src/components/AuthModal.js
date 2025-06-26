import React from 'react';
import Spotify from '../services/Spotify';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  if (!isOpen) return null;

  const handleLogin = () => {
    Spotify.login();
    onAuthSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Вход через Spotify</h2>
        <p>Для работы с приложением требуется вход через Spotify Premium.</p>
        <button onClick={handleLogin}>Войти через Spotify</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
}
