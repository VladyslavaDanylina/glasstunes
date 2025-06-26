// components/ProfileMenu.js
import React from "react";
export default function ProfileMenu({ userProfile, onLogout }) {
  if (!userProfile) return null;
  return (
    <div className="profile-menu">
      <img
        src={userProfile.avatar}
        alt="Профиль"
        style={{ width: 40, height: 40, borderRadius: "50%" }}
        title={userProfile.display_name}
      />
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}