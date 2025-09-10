import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false); // 카드 표시 상태

  const handleClick = () => {
    setIsOpened(true);
    setShowCard(true);
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

      {showCard && (
        <div className="card-container">
          <img
            src="/images/curation_card.png"
            alt="큐레이션 카드"
            className="curation-card"
          />
          <button className="card-close-button" onClick={handleCardClose}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
