import React, { useState, useEffect } from "react";
import "./home.css";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false); // 카드 표시 상태
  const [curation, setCuration] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태
  const [isNewCard, setIsNewCard] = useState(false); // 새로운 카드 여부 상태

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 체크
    checkMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkMobile);

    // 클린업
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Bonitabueno/0331project/refs/heads/main/instatoons.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];
        const todayData = data.find((item) => item.created_at === today);
        
        if (todayData) {
          setCuration(todayData);
          setIsNewCard(true); // 오늘 날짜의 카드가 있으면 새로운 카드
        } else {
          setCuration(data[data.length - 1]);
          setIsNewCard(false); // 오늘 날짜의 카드가 없으면 기본 상태
        }
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

  // 메시지 생성 함수
  const getDisplayMessage = () => {
    if (isMobile) {
      return isNewCard 
        ? "새로운 큐레이션 카드가 도착했어요. 아래 편지를 눌러보세요."
        : "아래 편지를 누르고, 큐레이션 카드를 확인해보세요.";
    } else {
      return isNewCard 
        ? "새로운 큐레이션 카드가 도착했어요. 아래 편지를 클릭해보세요."
        : "아래 편지를 클릭하고 큐레이션 카드를 확인해보세요.";
    }
  };

  return (
    <div className="home-container">
      <p>{getDisplayMessage()}</p>
      
      <img
        src={isOpened ? "/images/envelope_opened.png" : "/images/envelope_closed.png"}
        alt="편지봉투"
        className="envelope"
        onClick={handleClick}
        style={{ cursor: "pointer", marginTop: "20px" }}
      />

      {/* 큐레이션 카드 */}
      {showCard && curation && (
        <>
          {isMobile ? (
            // 모바일 전용 카드
            <div className="curation-card mobile-card">
              <img src="/images/curation_card_mobile.png" alt="큐레이션 카드 모바일" />
              <div className="curation-text">
                <button className="close-card" onClick={handleCloseCard}>
                  ×
                </button>
                <p className="curation-title">{curation.title}</p>
                <p className="curation-content">{curation.content.join(" ")}</p>
                <p className="curation-footer">
                  발행일: {curation.created_at} {" "}
                  <a href={curation.link} target="_blank" rel="noopener noreferrer">작품보러가기</a>
                </p>
              </div>
            </div>
          ) : (
            // PC 전용 카드
            <div className="curation-card desktop-card">
              <img src="/images/curation_card_white.png" alt="큐레이션 카드" />
              <div className="curation-text">
                <button className="close-card" onClick={handleCloseCard}>
                  ×
                </button>
                <p className="curation-title">{curation.title}</p>
                <p className="curation-content">{curation.content.join(" ")}</p>
                <p className="curation-footer">
                  발행일: {curation.created_at} {" "}
                  <a href={curation.link} target="_blank" rel="noopener noreferrer">작품보러가기</a>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
