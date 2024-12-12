import React from "react";
import "../css/DiscardAdviceModal.css";

const DiscardAdviceModal = ({ isOpen, onClose, advice }) => {
  if (!isOpen) return null; // 如果 modal 關閉，返回 null

  return (
    <div className="DiscardAdviceModal-modal-overlay">
      <div className="DiscardAdviceModal-modal-content">
        <h2>出牌建議</h2>
        {advice ? (
          <>
            <p><strong>建議丟棄牌：</strong> {advice.discard_tile}</p>
            <p><strong>理由：</strong> {advice.discard_reason}</p>
          </>
        ) : (
          <p>正在載入建議...</p>
        )}
        <button className="modal-button-cancel" onClick={onClose}>
          關閉
        </button>
      </div>
    </div>
  );
};

export default DiscardAdviceModal;
