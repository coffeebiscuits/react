import React, { useState, useEffect } from "react";
import "./Door.css";

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const handleDoorClick = () => {
    if (!isOpen) {
      setIsOpen(true); // 문 열림
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 문 열리면 바로 확대 + 흰빛 레이어
      const timer = setTimeout(() => {
        setIsZoomed(true);
        setIsLight(true);
      }, 300); // 문 열림 애니메이션 후 잠깐 지연 가능
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="door-container">
      <img
        src={isOpen ? "/images/door-open.JPG" : "/images/door-closed.JPG"}
        className={`door-image ${isZoomed ? "zoomed" : ""}`}
        onClick={handleDoorClick}
      />
      <div className={`light-overlay ${isLight ? "active" : ""}`} />
    </div>
  );
};

export default Door;
