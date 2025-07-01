import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  // Эмулируем последние и рекомендуемые поиски
  const recent = [
    { type: "artist", id: "1", name: "John", avatar: "/artist1.jpg" },
    { type: "album", id: "3000days", name: "3000 days", avatar: "/cover2.jpg" },
    // ...
  ];

  return (
    <div className="search-container">
      <input className="search-input" placeholder="Search for artists, songs, albums..." />
      <div className="recent-searches">
        <h3>Recent searches</h3>
        {recent.map(r => (
          <div key={r.id}
            className="recent-row"
            onClick={() => navigate(`/${r.type}/${r.id}`)}>
            <img src={r.avatar} alt={r.name} className="recent-avatar" />
            <span>{r.name}</span>
          </div>
        ))}
      </div>
      <div className="recommendations">
        <h3>Based on what you like</h3>
        <div className="dashboard-playlists-row">
          <div className="dashboard-card" onClick={() => navigate("/album/10")}>Indie Mix</div>
          {/* ... */}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
