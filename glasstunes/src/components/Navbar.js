import React from 'react';
import { Link } from 'react-router-dom';
import Recommendations from "./pages/Recommendations";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Main page</Link> |{" "}
      <Link to="/recommendations">Рекомендации</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
