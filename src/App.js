import React, { useState, useEffect } from "react";
import "./Door.css";
import Character from "./Character";

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLight, setIsLight] = useState(false);

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
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

      {showCharacter && <Character />}   {/* ✅ 캐릭터 표시 */}
    </div>
  );
};

export default Door;
