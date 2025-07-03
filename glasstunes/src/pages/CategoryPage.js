import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";

export default function CategoryPage() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Spotify.getCategoryPlaylists(id).then(setPlaylists);
  }, [id]);

  return (
    <div>
      <h2>Playlists in this Category</h2>
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
