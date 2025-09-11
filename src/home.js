import React, { useState } from "react";
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
        src={isOpened ? "/images/envelope_closed.png" : "/images/envelope_opened.png"}
        alt="편지봉투"
        className="envelope"
        onClick={handleClick}
        style={{ cursor: "pointer", marginTop: "20px" }}
      />

      {/* 큐레이션 카드 */}
      {showCard && curation && (
        <div className="curation-card">
          <button className="close-card" onClick={handleCloseCard}>
            ×
          </button>
          <img src="/images/curation_card_white.png" alt="큐레이션 카드" />
          
          {/* 카드 내용 텍스트 */}
          <div className="curation-text">
            <h2 className="curation-title">{curation.title}</h2>
            <p className="curation-content">{curation.content.join(" ")}</p>
            <p className="curation-author">
              작가: <a href={curation.link} target="_blank" rel="noopener noreferrer">{curation.author}</a>
            </p>
            <p className="curation-date">Created at: {curation.created_at}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
