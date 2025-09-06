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
        onClick={handleDoorClick}
      />
      
      {!isOpen && (
        <button className="knock-button" onClick={handleDoorClick}>
          노크하기
        </button>
      )}

      <div className={`light-overlay ${isLight ? "active" : ""}`} />
    </div>
  );
};

export default Door;
