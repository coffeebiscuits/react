import React, { useState } from "react";
import "./Door.css";

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const handleDoorClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsZoomed(true);
      setIsLight(true);
    }
  };

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
