import React, { useEffect, useState } from "react";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

export default function FeaturedPage() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Spotify.getFeaturedPlaylists().then(setFeatured);
  }, []);

  return (
    <div>
      <h2>Featured Playlists</h2>
      <div className="dashboard-playlists-row">
        {featured.map(pl => (
          <DashboardCard
            key={pl.playlistId}
            title={pl.playlistName}
            subtitle={pl.owner}
            img={pl.img || "/cover-default.jpg"}
            onClick={() => navigate(`/playlist/${pl.playlistId}`)}
          />
        ))}
      </div>
    </div>
  );
}
