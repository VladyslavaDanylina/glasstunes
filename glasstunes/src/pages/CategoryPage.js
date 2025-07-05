import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  Spotify.getCategoryPlaylists(id).then(result => {
    console.log("Fetched playlists for category", id, result);
    setPlaylists(result);
  });
}, [id]);
  console.log("Category ID:", id, playlists);

 return (
    <div className="category-container">
      <h2>Playlists in this Category</h2>
      <div className="dashboard-playlists-row">
        {playlists.length === 0 ? (
          <div style={{ color: "#aaa" }}>No playlists found.</div>
        ) : (
          playlists.map(pl => (
            <DashboardCard
              key={pl.playlistId}
              title={pl.playlistName}
              subtitle={pl.owner}
              img={pl.img || "/cover-default.jpg"}
              onClick={() => navigate(`/playlist/${pl.playlistId}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
