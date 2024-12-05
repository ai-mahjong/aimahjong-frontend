import { Link } from "react-router-dom";
import "../css/註冊登入/register.css";
import logo from "../assets/mahjong.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("密碼不匹配");
      return;
    }
    try {
      const response = await axios.post(
        "http://52.79.51.118:8080/api/v1/auth/register",
        {
          name,
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registration successful");
      localStorage.setItem("access_token", response.data.access_token); // 假設後端返回的 token 字段是 access_token
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      alert("Registration failed");
    }
  };

  const home = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
        <header className="register-header">
        <img src={logo} alt="Logo" className="logo" onClick={home} />
        <span className="site-title">
            <h3>AI麻將遊戲</h3>
        </span>
      </header>
      <div className="register-box">
        <h1>註冊 | Register</h1>
        <form className="login-form" onSubmit={handleRegister}>
            {/* Top 中間的區域 */}
            <div className="top">
            <div className="form-group">
                <label>用戶名稱</label>
                <input
                type="text"
                placeholder="請輸入您的名稱"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            </div>
            {/* Left 和 Right */}
            <div className="left-right-container">
            <div className="left">
                <div className="form-group">
                <label>使用者帳號</label>
                <input
                    type="text"
                    placeholder="請輸入您的使用者帳號"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label>電子郵件</label>
                <input
                    type="email"
                    placeholder="請輸入您的電子郵件"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            </div>
            <div className="right">
                <div className="form-group">
                <label>密碼</label>
                <input
                    type="password"
                    placeholder="請輸入您的密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label>請再輸入密碼</label>
                <input
                    type="password"
                    placeholder="請再輸入您的密碼"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
            </div>
            </div>
            <button type="submit" className="login-button">
            註冊
            </button>
        </form>
        <div className="register-link">
          <span>You already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
        </div>

    </div>
  );
}

export default Register;
