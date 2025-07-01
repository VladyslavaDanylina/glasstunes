import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./ArtistPage.css";

export default function ArtistPage() {
  const navigate = useNavigate();

  const topHits = [
    { id: 102, name: "Melbourne Sunset", listeners: 2238244 },
    { id: 101, name: "Every Day", listeners: 1878231 },
  ];

  return (
    <div className="artistpage-container">
      <div className="artistpage-header">
        <img src="/artist1.jpg" alt="artist" className="artistpage-img" />
        <h2>John</h2>
        <div className="artistpage-listeners">3,123,354 monthly listeners</div>
        <button className="artist-like-btn">💜</button>
      </div>
      <div className="artistpage-top-hits">
        <h3>Top Hits</h3>
        {topHits.map(hit => (
          <div key={hit.id} className="hit-row" onClick={() => navigate(`/song/${hit.id}`)}>
            <img src="/cover2.jpg" alt={hit.name} className="hit-img" />
            <div className="hit-info">
              <div className="hit-title">{hit.name}</div>
              <div className="hit-listeners">{hit.listeners.toLocaleString()} listens</div>
            </div>
            <span className="hit-like">💜</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
