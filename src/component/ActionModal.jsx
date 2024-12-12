import React from "react";
import "../css/ActionModal.css";

const ActionModal = ({
  isOpen,
  onClose,
  onAction,
  onCancelCall,
  acceptableOperations,
  chowCombinations,
  handleChowTile,
}) => {
  if (!isOpen) return null; // 如果 modal 關閉，返回 null

  const handleCancel = () => {
    if (onCancelCall) {
      onCancelCall(); // 執行取消叫牌
    }
    onClose(); // 同時關閉 modal
  };

  const renderChowOptions = () => {
    if (chowCombinations.length > 0) {
      return (
        <div className="chow-options">
          {chowCombinations.map((combo, index) => (
            <button
              key={index}
              className="modal-button"
              onClick={() => handleChowTile(index)}
            >
              組合 {index + 1}: {combo.map((tile) => tile.tile_name).join(", ")}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-buttons-row">
          {acceptableOperations.includes("CALL_FOR_CHOW") && (
            <>
              <button
                className="modal-button"
                onClick={() => onAction("吃")}
              >
                吃
              </button>
              {renderChowOptions()}
            </>
          )}
          {acceptableOperations.includes("CALL_FOR_PONG") && (
            <button
              className="modal-button"
              onClick={() => onAction("碰")}
            >
              碰
            </button>
          )}
          {acceptableOperations.includes("CALL_FOR_KONG") && (
            <button
              className="modal-button"
              onClick={() => onAction("槓")}
            >
              槓
            </button>
          )}
          {acceptableOperations.includes("CALL_FOR_WIN") && (
            <button
              className="modal-button"
              onClick={() => onAction("胡")}
            >
              胡
            </button>
          )}
          <button className="modal-button cancel" onClick={handleCancel}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
