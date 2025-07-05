import React, { useEffect, useState } from "react";
import Spotify from "../services/Spotify";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function FeaturedPage() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Spotify.getFeaturedPlaylists().then(setFeatured);
  }, []);

  return (
    <div className="featured-container">
      <h2>Featured Playlists</h2>
      <div className="dashboard-featured-row">
        {featured.map(pl => (
          <div key={pl.playlistId} className="dashboard-card" onClick={() => navigate(`/playlist/${pl.playlistId}`)}>
              <img src={pl.img} alt={pl.playlistName} className="dashboard-card-img" />
              <div className="dashboard-card-title">{pl.playlistName}</div>
            </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
