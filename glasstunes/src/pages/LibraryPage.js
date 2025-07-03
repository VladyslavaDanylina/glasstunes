import React, { useEffect, useState } from "react";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";
import { useNavigate } from "react-router-dom";

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Spotify.getUserPlaylists().then(setPlaylists);
  }, []);

  return (
    <div>
      <h2>Your Playlists</h2>
      <div className="dashboard-playlists-row">
        {playlists.map(pl => (
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
