import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav>
      <Link to="/">Main page</Link> |{" "}
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
