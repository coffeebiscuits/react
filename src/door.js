import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Door.css";

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const navigate = useNavigate(); // navigate 훅

  const handleKnockClick = () => {
    if (!isOpen) {
      setIsOpen(true); // 버튼 클릭으로 문 열림
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsZoomed(true);
        setIsLight(true);

        // 문 열림 + 확대 + 조명 완료 후 캐릭터 페이지로 이동
        setTimeout(() => {
          navigate("/character");
        }, 1000); // 1초 후 이동
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  return (
    <div className="door-container">
      <img
        src={isOpen ? "/images/door-open.JPG" : "/images/door-closed.JPG"}
        className={`door-image ${isZoomed ? "zoomed" : ""}`}
        alt="door"
      />

      {!isOpen && (
        <button className="knock-button" onClick={handleKnockClick}>
          노크하기
        </button>
      )}

      <div className={`light-overlay ${isLight ? "active" : ""}`} />
    </div>
  );
};

export default Door;
