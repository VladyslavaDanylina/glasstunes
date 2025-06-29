import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthSocialButtons from "../components/AuthSocialButtons";
import "./SignIn.css";



export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h2>Welcome back!</h2>
        <p>Sign in to discover, stream, and enjoy millions of songs.</p>
        <input
          className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="main-btn">
          Sign in
        </button>
        <div className="text-link">
  <button
    type="button"
    className="link-btn"
    onClick={() => {/* showForgotPasswordModal(); */}}
    style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, font: "inherit" }}
  >
    Forgot your password?
  </button>
</div>

        {/* Разделитель */}
        <div className="divider-row">
          <div className="divider-horizontal" />
          <span className="or-line"><p className="continue">or continue with</p></span>
          <div className="divider-horizontal" />
        </div>
        <AuthSocialButtons />
        <div className="text-link-bottom">
          Need an account?{" "}
          <span onClick={() => navigate("/signup")}>Register</span>
        </div>
      </div>
    </div>
  );
}
