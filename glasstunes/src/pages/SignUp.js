import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import AuthSocialButtons from "../components/AuthSocialButtons";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h2>Hi!</h2>
        <p>Sign up to start listening to all your favorite artists.</p>
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
        <input
          className="auth-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="main-btn" /* onClick={handleSignup} */>
          Register
        </button>
        {/* Разделитель (аналогично SignIn) */}
        <div className="divider-row">
          <div className="divider-horizontal" />
          <span className="or-line"><p className="continue">or continue with</p></span>
          <div className="divider-horizontal" />
        </div>
        <AuthSocialButtons />
        <div className="text-link-bottom">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Sign in</span>
        </div>
      </div>
    </div>
  );
}
