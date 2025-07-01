import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./SongPage.css";

export default function SongPage() {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="songpage-container">
      <div className="songpage-cover" style={{ backgroundImage: `url(/cover2.jpg)` }}></div>
      <div className="songpage-content">
        <h1>Melbourne Sunset</h1>
        <div className="song-artist" onClick={() => navigate("/artist/1")}>3000 Days</div>
        <div className="song-progress-bar">
          {/* Здесь могла бы быть прогресс-бар */}
        </div>
        <div className="song-controls">
          <button onClick={() => setPlaying(!playing)} className="play-btn">{playing ? "⏸️" : "▶️"}</button>
          <button onClick={() => setLiked(l => !l)}>{liked ? "💜" : "🤍"}</button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
