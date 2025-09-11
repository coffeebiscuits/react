import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false); // 카드 표시 상태
  const [curation, setCuration] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Bonitabueno/0331project/refs/heads/main/instatoons.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];
        const todayData = data.find((item) => item.created_at === today);
        setCuration(todayData || data[data.length - 1]);
      });
  }, []);

  const handleClick = () => {
    setIsOpened(true);

    // 봉투 열리고 0.5초 후에 카드 등장
    setTimeout(() => {
      setShowCard(true);
    }, 500);
  };
  
  const handleCloseCard = () => {
    setShowCard(false);
    setIsOpened(false);
  };

  return (
    <div className="home-container">
      <p>버튼을 눌러 이동 성공!</p>
      
      <img
        src={isOpened ? "/images/envelope_opened.png" : "/images/envelope_closed.png"}
        alt="편지봉투"
        className="envelope"
        onClick={handleClick}
        style={{ cursor: "pointer", marginTop: "20px" }}
      />

      {/* 큐레이션 카드 */}
      {showCard && curation && (
        <div className="curation-card">
          <img src="/images/curation_card_white.png" alt="큐레이션 카드" />
          
          {/* 카드 내용 텍스트 - 닫기 버튼도 여기 안에 포함 */}
          <div className="curation-text">
            <button className="close-card" onClick={handleCloseCard}>
              ×
            </button>
            {/* 위: 제목 */}
            <p className="curation-title">{curation.title}</p>
            {/* 중: 내용 */}
            <p className="curation-content">{curation.content.join(" ")}</p>
            {/* 아래: 날짜 + 링크 */}
            <p className="curation-footer">
              발행일: {curation.created_at} {" "}
              <a href={curation.link} target="_blank" rel="noopener noreferrer">인스타그램</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
