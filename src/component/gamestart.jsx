import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/gamestart.css"; // 引入 CSS
import Pin1 from '../assets/mahjong/Pin1.png';
import Pin2 from '../assets/mahjong/Pin2.png';
import Pin3 from '../assets/mahjong/Pin3.png';
import Pin4 from '../assets/mahjong/Pin4.png';
import Pin5 from '../assets/mahjong/Pin5.png';
import Pin6 from '../assets/mahjong/Pin6.png';
import Pin7 from '../assets/mahjong/Pin7.png';
import Pin8 from '../assets/mahjong/Pin8.png';
import Pin9 from '../assets/mahjong/Pin9.png';
import Sou1 from '../assets/mahjong/Sou1.png';
import Sou2 from '../assets/mahjong/Sou2.png';
import Sou3 from '../assets/mahjong/Sou3.png';
import Sou4 from '../assets/mahjong/Sou4.png';
import Sou5 from '../assets/mahjong/Sou5.png';
import Sou6 from '../assets/mahjong/Sou6.png';
import Sou7 from '../assets/mahjong/Sou7.png';
import Sou8 from '../assets/mahjong/Sou8.png';
import Sou9 from '../assets/mahjong/Sou9.png';
import Man1 from '../assets/mahjong/Man1.png';
import Man2 from '../assets/mahjong/Man2.png';
import Man3 from '../assets/mahjong/Man3.png';
import Man4 from '../assets/mahjong/Man4.png';
import Man5 from '../assets/mahjong/Man5.png';
import Man6 from '../assets/mahjong/Man6.png';
import Man7 from '../assets/mahjong/Man7.png';
import Man8 from '../assets/mahjong/Man8.png';
import Man9 from '../assets/mahjong/Man9.png';
import Chun from '../assets/mahjong/Chun.png';
import Hatsu from '../assets/mahjong/Hatsu.png';
import Ton from '../assets/mahjong/Ton.png';
import Nan from '../assets/mahjong/Nan.png';
import Shaa from '../assets/mahjong/Shaa.png';
import Pei from '../assets/mahjong/Pei.png';

function Gamestart() {
  const { gameId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [gameData, setGameData] = useState(null);  // State for game data
  const [roundWind, setRoundWind] = useState(null);  // State for the current round wind
  const [playerName, setPlayerName] = useState(null);  // State for player name
  useEffect(() => {
    document.body.className = "gamestart-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  useEffect(() => {
    const fetchGameBoard = async () => {
      try {
        if (!gameId) {
          console.error("gameId 未提供");
          return;
        }
  
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token 未找到，請先登入");
          return;
        }
  
        const response = await axios.get(
          `http://52.79.51.118:8080/api/v1/games/${gameId}/boards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          setBoardData(response.data);
        } else {
          console.error("Failed to fetch game board data");
        }
      } catch (error) {
        console.error("Error fetching game board:", error.response?.data || error);
      }
    };
  
    const fetchGameData = async () => {
      try {
        if (!gameId) {
          console.error("gameId 未提供");
          return;
        }
  
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token 未找到，請先登入");
          return;
        }
  
        const response = await axios.get(
          `http://52.79.51.118:8080/api/v1/games/${gameId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          setGameData(response.data);
        } else {
          console.error("Failed to fetch game data");
        }
      } catch (error) {
        console.error("Error fetching game data:", error.response?.data || error);
      }
    };
  
    const fetchRoundWind = async () => {
      try {
        if (!gameId) {
          console.error("gameId 未提供");
          return;
        }
  
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token 未找到，請先登入");
          return;
        }
  
        const response = await axios.get(
          `http://52.79.51.118:8080/api/v1/games/${gameId}/rounds/current`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          setRoundWind(response.data.roundWind);
        } else {
          console.error("Failed to fetch current round wind");
        }
      } catch (error) {
        console.error("Error fetching round wind:", error.response?.data || error);
      }
    };
  
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token 未找到，請先登入");
          return;
        }

        const response = await axios.get(
          `http://52.79.51.118:8080/api/v1/users/info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setPlayerName(response.data.name);  // Set player's name from API
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error fetching user info:", error.response?.data || error);
      }
    };
  
    fetchGameBoard();
    fetchGameData();
    fetchRoundWind();
    fetchUserInfo();  // Fetch user info when the component mounts
  }, [gameId]);
  
  // 根據 tile_id 篩選不同的牌類
  const getAllTiles = (tiles) => {
    return tiles.map((tile) => ({
      id: tile.id,
      name: tile.tile_name,
      tileId: tile.tile_id,
    }));
  };

  // 根據tileId來顯示圖片
  const getTileImage = (tileId) => {
    if (tileId >= 9 && tileId <= 17) { // 筒子牌 (Pin1 to Pin9)
      const pinIndex = tileId - 8; // Map tileId 9 to Pin1, 10 to Pin2, etc.
      return [Pin1, Pin2, Pin3, Pin4, Pin5, Pin6, Pin7, Pin8, Pin9][pinIndex - 1]; // Adjusting for 1-based index
    } else if (tileId >= 18 && tileId <= 26) { // 條子牌 (Sou1 to Sou9)
      const souIndex = tileId - 17; // Map tileId 18 to Sou1, 19 to Sou2, etc.
      return [Sou1, Sou2, Sou3, Sou4, Sou5, Sou6, Sou7, Sou8, Sou9][souIndex - 1]; // Adjusting for 1-based index
    } else if (tileId >= 0 && tileId <= 8) { // 萬子牌 (Man1 to Man9)
      const manIndex = tileId; // Directly map tileId 0 to Man1, 1 to Man2, etc.
      return [Man1, Man2, Man3, Man4, Man5, Man6, Man7, Man8, Man9][manIndex]; // No need for offset
    } else if (tileId === 27) { // 東風 (Ton)
      return Ton;
    } else if (tileId === 28) { // 南風 (Nan)
      return Nan;
    } else if (tileId === 29) { // 西風 (Shaa)
      return Shaa;
    } else if (tileId === 30) { // 北風 (Pei)
      return Pei;
    } else if (tileId === 31) { // 中 (Chun)
      return Chun;
    } else if (tileId === 32) { // 發 (Hatsu)
      return Hatsu;
    } else if (tileId === 33) { // 白 (White Dragon) - Do not show image or text
      return null; // No image for 白 (White Dragon)
    }
    return null; // Default fallback if no image found for other tiles
  };

  return (
    <div className="play">
      <h1>遊戲進行中...</h1>
      {boardData ? (
        <div>
          <p>遊戲狀態: {boardData.status || "未知"}</p>
          <p>等待出牌 ID: {boardData.active_game_player_id || "未知"}</p>
          <p>輪風: {boardData.round_wind || "未知"}</p>
          <p>現存牌組狀態: {boardData.last_discarded_tile?.tile_name || "無"}</p>

          <div className="player-tiles">
            <h2>玩家手牌</h2>
            <div className="tiles-container">
              {getAllTiles(boardData.player_tiles[0]?.hand_tiles?.tiles || []).map((tile) => (
                <div key={tile.id} className={`tile tile-${tile.tileId}`}>
                  <div className="tile-top"></div>
                  <div className="tile-content">
                    {tile.tileId >= 0 && tile.tileId <= 8 ? (
                      // Display image for 萬子 tiles (without text)
                      <img src={getTileImage(tile.tileId)} alt={tile.name} />
                    ) : (
                      // Display image for other tiles (筒子, 條子, 風, 中發白)
                      getTileImage(tile.tileId) ? (
                        <img src={getTileImage(tile.tileId)} alt={tile.name} />
                      ) : (
                        <div className="tile-placeholder"></div> // Empty placeholder for 白 (White Dragon)
                      )
                    )}
                  </div>
                  <div className="tile-bottom"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>載入中...</p>
      )}

      {/* Footer to display the game data values */}
      {gameData && (
        <footer>
          <h2>底{gameData.base_point*gameData.dollar_per_point}/台{gameData.fann_point*gameData.dollar_per_point}</h2>
          <h2>{playerName || "bot"}</h2>
          <h2>當前風圈: {roundWind || "未知"}</h2>
        </footer>
      )}
    </div>
  );
}

export default Gamestart;
