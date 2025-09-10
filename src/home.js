import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false); // 카드 표시 상태

  const handleClick = () => {
    setIsOpened(true);

    // 봉투 열리고 0.5초 후에 카드 등장
    setTimeout(() => {
      setShowCard(true);
    }, 500);
  };
  
  const handleCardClose = () => {
    setShowCard(false);
    setIsOpened(false);
  };

  return (
    <div className="home-container">
      <p>버튼을 눌러 이동 성공!</p>
      
      <img
        src={isOpened ? "/images/envelope_closed.png" : "/images/envelope_opened.png"}
        alt="편지봉투"
        className="envelope"
        onClick={handleClick}
        style={{ cursor: "pointer", marginTop: "20px" }}
      />

      {/* 큐레이션 카드 */}
      {showCard && (
        <div className="curation-card">
          <button className="close-card" onClick={handleCloseCard}>
            ×
          </button>
          <img src="/images/curation_card.png" alt="큐레이션 카드" />
        </div>
      )}
    </div>
  );
};

export default Home;
