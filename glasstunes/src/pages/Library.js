import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./Library.css";

export default function Library() {
  const navigate = useNavigate();

  const playlists = [
    { id: 1, title: "Work Out", img: "/cover1.jpg" },
    { id: 2, title: "Techno 90s", img: "/cover2.jpg" },
    // ...
  ];

  return (
    <div className="library-container">
      <h2>Your Library</h2>
      <div className="dashboard-playlists-row">
        {playlists.map(pl => (
          <div key={pl.id} className="dashboard-card" onClick={() => navigate(`/album/${pl.id}`)}>
            <img src={pl.img} alt={pl.title} className="dashboard-card-img" />
            <div className="dashboard-card-title">{pl.title}</div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
