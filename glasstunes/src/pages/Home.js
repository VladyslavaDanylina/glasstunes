import React from "react";
import "./Home.css"; 

export default function Home({ userProfile }) {
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
            src={userProfile?.avatar || "/default-avatar.png"}
            alt="profile"
          />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          Pick up where you left off
          <button className="dashboard-viewall-btn">View all</button>
        </div>
        <div className="dashboard-playlists-row">
          <DashboardCard title="Chill Study Beats" subtitle="Chill" img="/cover1.jpg" />
          <DashboardCard title="Rainy Morning" subtitle="Jazzy" img="/cover2.jpg" />
          <DashboardCard title="Skate Punk" subtitle="Weekend" img="/cover3.jpg" />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">
          For you
          <button className="dashboard-viewall-btn">View all</button>
        </div>
        <div className="dashboard-playlists-row">
          <DashboardCard title="Your Top Artists" subtitle="Your Top" img="/cover4.jpg" />
          <DashboardCard title="Best Of Pop Music" subtitle="Best Of" img="/cover5.jpg" />
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-section-title">Popular songs</div>
        <div className="dashboard-songs-list">
          <SongRow name="Cali Living" artist="Tom" img="/avatar1.jpg" />
          <SongRow name="On The Top" artist="Alma" img="/avatar2.jpg" />
          <SongRow name="Together" artist="Jonas&Jonas" img="/avatar3.jpg" />
          <SongRow name="Love Is Blind" artist="Sisa Sklovska" img="/avatar4.jpg" />
        </div>
      </div>

      {/* Навигация снизу */}
      <div className="dashboard-bottom-nav">
        <span className="nav-icon active">🏠</span>
        <span className="nav-icon">🔍</span>
        <span className="nav-icon">📖</span>
      </div>
    </div>
  );
}

// Карточка подборки
function DashboardCard({ title, subtitle, img }) {
  return (
    <div className="dashboard-card">
      <img src={img} alt={title} className="dashboard-card-img" />
      <div className="dashboard-card-overlay">
        <div className="dashboard-card-subtitle">{subtitle}</div>
        <div className="dashboard-card-title">{title}</div>
      </div>
    </div>
  );
}

// Одна строка с песней
function SongRow({ name, artist, img }) {
  return (
    <div className="dashboard-song-row">
      <img src={img} alt={name} className="dashboard-song-avatar" />
      <div className="dashboard-song-info">
        <div className="dashboard-song-name">{name}</div>
        <div className="dashboard-song-artist">{artist}</div>
      </div>
      <span className="dashboard-song-play">▶️</span>
    </div>
  );
}
