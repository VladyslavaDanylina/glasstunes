import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="dashboard-bottom-nav">
      <span className={`nav-icon ${pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>🏠</span>
      <span className={`nav-icon ${pathname === "/search" ? "active" : ""}`} onClick={() => navigate("/search")}>🔍</span>
      <span className={`nav-icon ${pathname === "/library" ? "active" : ""}`} onClick={() => navigate("/library")}>📖</span>
      <span className={`nav-icon ${pathname === "/profile" ? "active" : ""}`} onClick={() => navigate("/profile")}>
        <img src="/your-avatar.png" alt="profile" width={28} style={{ borderRadius: "50%" }} />
      </span>
    </nav>
  );
}