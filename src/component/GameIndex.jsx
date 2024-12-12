import React, { useEffect, useState } from "react";
import "../css/gameindex.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mahjong.png";

const GameIndex = () => {
  const [userName, setUserName] = useState("");
  const [gameId, setGameId] = useState(""); // 新增 gameId 狀態
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "gameindex-page"; // 設置背景樣式
    return () => {
      document.body.className = "";
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(
          "http://52.79.51.118:8080/api/v1/users/info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          setUserName(data.name);
        } catch (error) {
          console.error("Invalid JSON response:", responseText);
        }
      } catch (error) {
        console.error("Error during fetch request:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleStartGame = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch(
        "http://52.79.51.118:8080/api/v1/games/auto-start",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base_point: "5",
            fann_point: "2",
            dollar_per_point: "10",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start game");
      }

      const data = await response.json();
      console.log("Game started successfully:", data);

      if (data?.game_id) {
        navigate(`/gamestart/${data.game_id}`); // Navigate to game start page with the game_id
      } else {
        console.error("Game ID not received");
      }
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const handleJoinGame = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/current-player-view`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to join game");
      }

      const data = await response.json();
      console.log("Joined game successfully:", data);

      if (data?.game_id) {
        navigate(`/gamestart/${data.game_id}`); // Navigate to game start page with the game_id
      } else {
        console.error("Game ID not found");
      }
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return (
    <div className="gameindex">
      <header className="header">
        <div className="user-info">
          <span className="user-name">Welcome, {userName}!</span>
          <button className="logout-button" onClick={handleLogout}>
            登出
          </button>
        </div>
      </header>
      <main className="game-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="game-title">歡迎來到 AI 麻將網站</h1>
        <p className="game-description">開始你的麻將挑戰，體驗真實感受！</p>
        <button className="play-button" onClick={handleStartGame}>
          開始新遊戲
        </button>
        <div className="join-game-container">
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="輸入遊戲 ID"
            className="game-id-input"
          />
          <button className="join-game-button" onClick={handleJoinGame}>
            加入遊戲
          </button>
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 AI 麻將網站.</p>
      </footer>
    </div>
  );
};

export default GameIndex;
