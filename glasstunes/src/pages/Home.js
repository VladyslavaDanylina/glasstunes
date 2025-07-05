import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";
import "./Home.css";

function RecommendedTrackRow({ name, artist, img, onClick }) {
  return (
    <div className="dashboard-song-row" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={img} alt={name} className="dashboard-song-avatar" />
      <div className="dashboard-song-info">
        <div className="dashboard-song-name">{name}</div>
        <div className="dashboard-song-artist">{artist}</div>
      </div>
      <span className="dashboard-song-play">▶️</span>
    </div>
  );
}

export default function Home({ userProfile }) {
  const [playlists, setPlaylists] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryPlaylists, setCategoryPlaylists] = useState({});
  const navigate = useNavigate();

  // 1. User playlists
  useEffect(() => {
    Spotify.getUserPlaylists().then(setPlaylists);
  }, []);

  // 2. Recommended tracks
  useEffect(() => {
    Spotify.getRecommendations({ seed_genres: "pop" }).then(setRecommended);
  }, []);

  // 3. Categories and their playlists
  useEffect(() => {
    async function fetchCategoriesAndPlaylists() {
      const cats = await Spotify.getCategories();
      setCategories(cats);
      for (const c of cats.slice(0, 3)) {
        Spotify.getCategoryPlaylists(c.id).then(pls => {
          console.log("Playlists for category", c.id, pls);
          setCategoryPlaylists(prev => ({ ...prev, [c.id]: pls }));
        });
      }
    }
    fetchCategoriesAndPlaylists();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          Good afternoon, <b>{userProfile?.display_name || "User"}</b>!
        </div>
        <div className="dashboard-icons">
          <span className="bell-icon">🔔</span>
          <img
            className="dashboard-avatar"
            src={userProfile?.avatar || "/avatar1.jpg"}
            alt="profile"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* 1. YOUR PLAYLISTS */}
      <div className="dashboard-section">
        <div className="dashboard-section-title">
          Pick up where you left off
          <button className="dashboard-viewall-btn" onClick={() => navigate("/library")}>
            View all
          </button>
        </div>
        <div className="dashboard-playlists-row">
          {playlists.length === 0 ? (
            <div style={{ color: "#aaa" }}>No playlists found.</div>
          ) : (
            playlists.slice(0, 3).map(pl => (
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

      {/* 2. CATEGORIES */}
      {categories.slice(0, 8).map(cat => (
        <div className="dashboard-section" key={cat.id}>
          <div className="dashboard-section-title">
            {cat.name}
            <button className="dashboard-viewall-btn" onClick={() => navigate(`/category/${cat.id}`)}>
              View all
            </button>
          </div>
          <div className="dashboard-playlists-row">
            {(categoryPlaylists[cat.id] || []).slice(0, 8).map(pl => (
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
      ))}

      {/* 3. RECOMMENDED TRACKS */}
      <div className="dashboard-section">
        <div className="dashboard-section-title">
          Recommended For You
          <button className="dashboard-viewall-btn" onClick={() => navigate("/recommended")}>
            View all
          </button>
        </div>
        <div className="dashboard-songs-list">
          {recommended.length === 0 ? (
            <div style={{ color: "#aaa" }}>Loading…</div>
          ) : (
            recommended.map(track => (
              <RecommendedTrackRow
                key={track.id}
                name={track.name}
                artist={track.artist}
                img={track.albumCover || "/cover-default.jpg"}
                onClick={() => navigate(`/track/${track.id}`)}
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
