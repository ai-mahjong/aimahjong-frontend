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
import ActionModal from "./ActionModal"; // 引入 ActionModal
import DiscardAdviceModal from "./DiscardAdviceModal.jsx";
function Gamestart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [advice, setAdvice] = useState(null);
  const { gameId } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [playerName, setPlayerName] = useState(null);


  useEffect(() => {
    document.body.className = "gamestart-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !gameId) {
          console.error("Token 或 gameId 未找到");
          return;
        }

        const [boardRes, gameRes, userRes] = await Promise.all([
          axios.get(`http://52.79.51.118:8080/api/v1/games/${gameId}/current-player-view`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://52.79.51.118:8080/api/v1/games/${gameId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://52.79.51.118:8080/api/v1/users/info`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBoardData(boardRes.data);
        setGameData(gameRes.data);
        setPlayerName(userRes.data.name);
        // 當狀態為 "THINKING_FOR_CALL" 時自動打開 ActionModal
        if (boardRes.data.hand_status === "WAITING_FOR_CALL") {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error);
      }
    };
    fetchGameData();
    const interval = setInterval(fetchGameData, 1000);

    // 清除定時器
    return () => clearInterval(interval);
  }, [gameId]);

  
  const handleDiscard = async (tileId, tileName) => {//丟牌
    const confirmDiscard = window.confirm(`確定要丟棄這張牌嗎？ (${tileName})`);
    if (!confirmDiscard) {
      return; // 如果使用者取消丟牌，直接結束函數
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }
  
      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/discard/${tileId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        console.log("出牌成功", response.data);
        setBoardData(response.data); // 更新遊戲狀態
      }
    } catch (error) {
      console.error("出牌失敗:", error.response?.data || error);
    }
  };
  const handleDrawTile = async () => {//抽牌
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }
      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/draw-tile`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        console.log("抓牌成功", response.data);
        setBoardData(response.data); // 更新遊戲狀態
      }
    } catch (error) {
      console.error("抓牌失敗:", error.response?.data || error);
    }
  };
  const handleCancelCall = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }

      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/cancel-for-call`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("取消叫牌成功", response.data);
        setBoardData(response.data); // 更新遊戲狀態
        setIsModalOpen(false); // 關閉 modal
      }
    } catch (error) {
      console.error("取消叫牌失敗:", error.response?.data || error);
    }
  };
  
  const handleDiscardAdvice = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }
  
      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/generate-discard-advice`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        setAdvice(response.data); // 儲存建議
        setIsAdviceModalOpen(true); // 開啟建議 Modal
      }
    } catch (error) {
      console.error("取得出牌建議失敗:", error.response?.data || error);
    }
  };
  const handleChowTile = async (combinationIndex) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }
  
      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/chow-tile/${combinationIndex}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        console.log("吃牌成功", response.data);
        setBoardData(response.data); // 更新遊戲狀態
      }
    } catch (error) {
      console.error("吃牌失敗:", error.response?.data || error);
    }
  };
  
  const handlePongTile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !gameId) {
        console.error("Token 或 gameId 未找到");
        return;
      }
  
      const response = await axios.post(
        `http://52.79.51.118:8080/api/v1/games/${gameId}/pong-tile`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        console.log("碰牌成功", response.data);
        setBoardData(response.data); // 更新遊戲狀態
      }
    } catch (error) {
      console.error("碰牌失敗:", error.response?.data || error);
    }
  };
  
  const renderDiscardedTiles = (discardedTiles) => {
    if (!discardedTiles || !discardedTiles.tiles) return null;
    return (
      <div className="discarded-tiles-container">
        {discardedTiles.tiles.map((tile) => (
          <div key={tile.id} className={`discarded-tile tile-${tile.tile_id}`}>
            <div className="discarded-tile-content">
              {tile.tile_id === 33 ? (
                <div className="discarded-tile-placeholder"></div> // 替代白板樣式
              ) : (
                <img
                  src={getTileImage(tile.tile_id)}
                  alt={tile.tile_name}
                  className="discarded-tile-image"
                />
              )}
            </div>
            <div className="discarded-tile-bottom"></div>
          </div>
        ))}
      </div>
    );
  };
  const renderExposedTiles = (exposedTileList) => {
    if (!exposedTileList || exposedTileList.length === 0) return null;
  
    return exposedTileList.map((meld, index) => (
      <div key={index} className="exposed-group">
        {meld.tiles.map((tile) => (
          <div key={tile.id} className="exposed-tile">
            <div className="exposed-tile-content">
              {tile.tile_id === 33 ? (
                <div className="exposed-tile-placeholder">白板</div>
              ) : (
                <img
                  src={getTileImage(tile.tile_id)}
                  alt={tile.tile_name}
                  className="exposed-tile-image"
                />
              )}
            </div>
            <div className="exposed-tile-bottom"></div>
          </div>
        ))}
      </div>
    ));
  };
  
  
  const handleAction = (action) => {
    console.log(`選擇的行動: ${action}`);
    if (action === "吃") {
      // 如果有多個吃牌組合，可以提示玩家選擇組合
      const chowCombinations = boardData?.chow_combinations || [];
      if (chowCombinations.length === 1) {
        handleChowTile(0); // 自動選擇唯一的吃牌組合
      } else if (chowCombinations.length > 1) {
        // 顯示選擇菜單讓玩家選擇組合
        console.log("多個吃牌組合，請選擇:");
        chowCombinations.forEach((combo, index) => {
          console.log(`組合 ${index + 1}:`, combo);
        });
      }
    } else if (action === "碰") {
      handlePongTile();
    }
    setIsModalOpen(false);
  };
  
  const getTileImage = (tileId) => {
    const tiles = {
      9: Pin1, 10: Pin2, 11: Pin3, 12: Pin4, 13: Pin5, 14: Pin6, 15: Pin7, 16: Pin8, 17: Pin9,
      18: Sou1, 19: Sou2, 20: Sou3, 21: Sou4, 22: Sou5, 23: Sou6, 24: Sou7, 25: Sou8, 26: Sou9,
      0: Man1, 1: Man2, 2: Man3, 3: Man4, 4: Man5, 5: Man6, 6: Man7, 7: Man8, 8: Man9,
      27: Ton, 28: Nan, 29: Shaa, 30: Pei, 31: Chun, 32: Hatsu
    };
    return tiles[tileId] || null;
  };

  return (
    <div className="play">
      {boardData ? (
        <div>
          <DiscardAdviceModal
            isOpen={isAdviceModalOpen}
            onClose={() => setIsAdviceModalOpen(false)}
            advice={advice}
          />
          <ActionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAction={handleAction}
            acceptableOperations={boardData?.acceptable_operations || []}
            chowCombinations={boardData?.chow_combinations || []}
            handleChowTile={handleChowTile}
            onCancelCall={handleCancelCall}
          />

            {/* 抓牌邏輯 */}
            <div className="player-tiles">
              
          <div className="tiles-container">
          {renderExposedTiles(boardData.player_tile?.exposed_tile_list)}
            {boardData.player_tile?.hand_tiles?.tiles.map((tile) => (
              <div
                key={tile.id}
                className={`tile tile-${tile.tile_id}`}
                onClick={() => handleDiscard(tile.id, tile.tile_name)}
              >
                <div className="tile-top"></div>
                <div className="tile-content">
                  {tile.tile_id === 33 ? (
                    <div className="tile-placeholder"></div>
                  ) : (
                    <img src={getTileImage(tile.tile_id)} alt={tile.tile_name} />
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>

       
          <div className="top-player">
          {renderExposedTiles(boardData.opposite_player_tile?.exposed_tile_list)}
            {[...Array(boardData.opposite_player_tile?.hand_tiles?.tile_count || 0)].map((_, index) => (
              <div key={index} className="tile-back"></div>
            ))}

          </div>

          {/* 上家手牌 */}
          <div className="left-player">
          {renderExposedTiles(boardData.upwind_player_tile?.exposed_tile_list)}
            {[...Array(boardData.upwind_player_tile?.hand_tiles?.tile_count || 0)].map((_, index) => {
              const translateX = -10 * index;
              const style = {
                transform: `rotate(-15deg) translateX(${translateX}px)`,
              };
              return <div key={index} className="tile-left" style={style}></div>;
            })}
          </div>

          {/* 下家手牌 */}
          <div className="right-player">
          {renderExposedTiles(boardData.downwind_player_tile?.exposed_tile_list)}
            {[...Array(boardData.downwind_player_tile?.hand_tiles?.tile_count || 0)].map((_, index) => {
              const translateX = 10 * index;
              const style = {
                transform: `rotate(15deg) translateX(${translateX}px)`,
              };
              return <div key={index} className="tile-right" style={style}></div>;
            })}
          </div>
          
          <div className="discarded-areas">
  {/* 上家棄牌區 */}
  <div className="discarded-area top-player">
    {renderDiscardedTiles(boardData.opposite_player_tile?.discarded_tiles)}
    
  </div>

  {/* 左家棄牌區 */}
  <div className="discarded-area left-player">
    {renderDiscardedTiles(boardData.upwind_player_tile?.discarded_tiles)}
   
  </div>

  {/* 右家棄牌區 */}
  <div className="discarded-area right-player">
    {renderDiscardedTiles(boardData.downwind_player_tile?.discarded_tiles)}
    
  </div>

  {/* 下家棄牌區 */}
  <div className="discarded-area bottom-player">
    {renderDiscardedTiles(boardData.player_tile?.discarded_tiles)}
    
  </div>
</div>

        </div>
      ) : (
        <p>載入中...</p>
      )}

      {gameData && (
        <footer>
          <h2>底 {gameData.base_point * gameData.dollar_per_point} / 台 {gameData.fann_point * gameData.dollar_per_point}</h2>
          <h2>{playerName || "bot"}</h2>
          <button className="advice-button" onClick={handleDiscardAdvice}>獲取出牌建議</button>
           {/* 抓牌按鈕 */}
        {boardData.hand_status === "WAITING_FOR_DRAW" && (
          <button onClick={handleDrawTile} className="draw-button ">抓牌</button>
        )}
        <p className="remaining-tiles">剩餘牌數: {boardData?.wall_tiles?.tile_count || "未知"}</p>
        <p>{boardData.hand_status || "未知"}</p>
        <p>下位出牌玩家 ID: {boardData.active_game_player_id || "未知"}</p>
        </footer>
      )}
    </div>
  );
}

export default Gamestart;