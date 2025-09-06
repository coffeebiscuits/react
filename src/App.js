import React, { useState } from "react";
import "./Door.css"; // CSS 파일에 반응형 스타일 포함

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDoorClick = () => {
    setIsOpen(true); // 클릭하면 문 열림 상태로 전환
  };

  return (
    <div className="door-container">
      <img
        src={isOpen ? "/images/door-open.jpg" : "/images/door-closed.jpg"}
        alt="Door"
        className="door-image"
        onClick={handleDoorClick}
      />
    </div>
  );
};

export default Door;
