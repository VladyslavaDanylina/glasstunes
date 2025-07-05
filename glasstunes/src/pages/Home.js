import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Spotify from "../services/Spotify";
import DashboardCard from "../components/DashboardCard";
import "./Home.css";

export default function Home({ userProfile }) {
  const [playlists, setPlaylists] = useState([]);
  const [featured, setFeatured] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoryPlaylists, setCategoryPlaylists] = useState({});
  const navigate = useNavigate();

  // 1. User playlists
  useEffect(() => {
    Spotify.getUserPlaylists().then(setPlaylists);
  }, []);

  // 2. Featured ("For you")
 useEffect(() => {
  Spotify.getFeaturedPlaylists().then(setFeatured);
}, []);

  // 3. Categories and their playlists
  useEffect(() => {
    async function fetchCategoriesAndPlaylists() {
      const cats = await Spotify.getCategories();
      setCategories(cats);
      // Fetch playlists for each category (only first 3 for demo)
      for (const c of cats.slice(0, 3)) {
        Spotify.getCategoryPlaylists(c.id).then(pls => {
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

{/* 2. FEATURED (FOR YOU) */}
<div className="dashboard-section">
  <div className="dashboard-section-title">For you
    <button className="dashboard-viewall-btn" onClick={() => navigate("/featured")}>
            View all
          </button>
  </div>
  
  <div className="dashboard-featured-row">
    {featured === null ? (
      <div style={{ color: "#aaa" }}>Loading…</div>
    ) : featured.length === 0 ? (
      <div style={{ color: "#aaa" }}>No featured playlists.</div>
    ) : (
      featured.slice(0, 3).map(pl => (
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


      {/* 3. GENRE/CATEGORY PLAYLISTS */}
      {categories.slice(0, 3).map(cat => (
        <div className="dashboard-section" key={cat.id}>
          <div className="dashboard-section-title">
            {cat.name}
            <button className="dashboard-viewall-btn" onClick={() => navigate(`/category/${cat.id}`)}>
  View all
</button>
          </div>
          <div className="dashboard-playlists-row">
            {(categoryPlaylists[cat.id] || []).slice(0, 3).map(pl => (
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

      <BottomNav />
    </div>
  );
}

