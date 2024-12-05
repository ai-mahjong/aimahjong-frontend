import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/註冊登入/Login.css";
import logo from "../assets/mahjong.png";
import axios from "axios";
function Login() {
  const [username_or_email, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://52.79.51.118:8080/api/v1/auth/login",
        { username_or_email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.headers["access-token"];
      if (token) {
        localStorage.setItem("token", token);
        alert("Login successful");
        navigate("/gameIndex");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed");
    }
  };

  const home = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
         <header className="login-header">
            <img src={logo} alt="Logo" className="logo" onClick={home} />
            <span className="site-title">
            <h3>AI麻將遊戲</h3>
            </span>
        </header>
        <div className="login-box">
        <h1>登入 | Sign in</h1>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
            <label>使用者帳號或電子郵件</label>
            <input
                type="text"
                placeholder="請輸入您的使用者帳號或電子郵件"
                value={username_or_email}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label>密碼</label>
            <input
                type="password"
                placeholder="請輸入您的密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="login-button">
            登入
            </button>
        </form>
        <div className="register-link">
            <span>Don&apos;t have an account?</span>
            <Link to="/register">Register</Link>
        </div>
        </div>
    </div>
  );
}

export default Login;
