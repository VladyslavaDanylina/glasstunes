import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const playlists = [
    { id: 1, title: "Art Techno", likes: 120, img: "/cover1.jpg" },
    // ...
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/avatar1.jpg" alt="avatar" className="profile-avatar" />
        <div className="profile-name">username</div>
        <button className="edit-profile-btn">Edit profile</button>
        <div className="profile-stats">556 Following • 929 Followers</div>
      </div>
      <div className="profile-tabs">
        <span className="tab active">Playlists</span>
        <span className="tab">Downloaded</span>
        <span className="tab">Liked</span>
      </div>
      <div className="profile-playlists-list">
        {playlists.map(p => (
          <div key={p.id} className="profile-playlist-row" onClick={() => navigate(`/album/${p.id}`)}>
            <img src={p.img} alt={p.title} className="profile-playlist-img" />
            <div className="profile-playlist-info">
              <div className="profile-playlist-title">{p.title}</div>
              <div className="profile-playlist-likes">{p.likes} likes</div>
            </div>
            <span className="profile-row-arrow">›</span>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
