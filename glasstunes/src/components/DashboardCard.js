import React from "react";
export default function DashboardCard({ title, subtitle, img, onClick }) {
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