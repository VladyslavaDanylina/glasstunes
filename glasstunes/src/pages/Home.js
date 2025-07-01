import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./Home.css"; 

export default function Home({ userProfile }) {
  const navigate = useNavigate();

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

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          Pick up where you left off
          <button className="dashboard-viewall-btn" onClick={() => navigate("/library")}>View all</button>
        </div>
        <div className="dashboard-playlists-row">
          <DashboardCard title="Chill Study Beats" subtitle="Chill" img="/cover1.jpg" onClick={() => navigate("/album/1")} />
          <DashboardCard title="Rainy Morning" subtitle="Jazzy" img="/cover2.jpg" onClick={() => navigate("/album/2")} />
          <DashboardCard title="Skate Punk" subtitle="Weekend" img="/cover3.jpg" onClick={() => navigate("/album/3")} />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          For you
          <button className="dashboard-viewall-btn" onClick={() => navigate("/library")}>View all</button>
        </div>
        <div className="dashboard-playlists-row">
          <DashboardCard title="Your Top Artists" subtitle="Your Top" img="/cover4.jpg" onClick={() => navigate("/artist/1")} />
          <DashboardCard title="Best Of Pop Music" subtitle="Best Of" img="/cover5.jpg" onClick={() => navigate("/album/5")} />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">Popular songs</div>
        <div className="dashboard-songs-list">
          <SongRow name="Cali Living" artist="Tom" img="/avatar1.jpg" onClick={() => navigate("/song/101")} />
          <SongRow name="On The Top" artist="Alma" img="/avatar2.jpg" onClick={() => navigate("/song/102")} />
          <SongRow name="Together" artist="Jonas&Jonas" img="/avatar3.jpg" onClick={() => navigate("/song/103")} />
          <SongRow name="Love Is Blind" artist="Sisa Sklovska" img="/avatar4.jpg" onClick={() => navigate("/song/104")} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Карточка подборки
function DashboardCard({ title, subtitle, img, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={img} alt={title} className="dashboard-card-img" />
      <div className="dashboard-card-overlay">
        <div className="dashboard-card-subtitle">{subtitle}</div>
        <div className="dashboard-card-title">{title}</div>
      </div>
    </div>
  );
}

// Одна строка с песней
function SongRow({ name, artist, img, onClick }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="dashboard-song-row" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={img} alt={name} className="dashboard-song-avatar" />
      <div className="dashboard-song-info">
        <div className="dashboard-song-name">{name}</div>
        <div className="dashboard-song-artist">{artist}</div>
      </div>
      <button
        className="dashboard-song-like"
        onClick={e => {
          e.stopPropagation(); // Чтобы не было перехода на song при клике по лайку
          setLiked(l => !l);
        }}
      >
        {liked ? "💜" : "🤍"}
      </button>
      <span className="dashboard-song-play">▶️</span>
    </div>
  );
}
