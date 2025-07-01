import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./AlbumPage.css";

export default function AlbumPage() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const tracks = [
    { id: 101, name: "Every Day", artist: "John" },
    { id: 102, name: "Melbourne Sunset", artist: "John" },
    // ...
  ];

  return (
    <div className="albumpage-container">
      <div className="albumpage-header">
        <img src="/cover2.jpg" alt="album" className="albumpage-cover" />
        <h2>3000 DAYS</h2>
        <div className="albumpage-artist" onClick={() => navigate("/artist/1")}>Album by John</div>
        <div className="albumpage-actions">
          <button onClick={() => setLiked(l => !l)}>{liked ? "💜" : "🤍"}</button>
          <button>⬇️</button>
        </div>
      </div>
      <div className="albumpage-tracklist">
        {tracks.map(track => (
          <div key={track.id} className="track-row" onClick={() => navigate(`/song/${track.id}`)}>
            <div className="track-title">{track.name}</div>
            <div className="track-artist">{track.artist}</div>
            <span className="track-more">⋯</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
