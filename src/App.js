import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Character from "./Character";

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const navigate = useNavigate();

  const handleKnockClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsZoomed(true);
        setIsLight(true);

        // 문 열림 + 확대 + 조명 후 캐릭터 화면으로 이동
        setTimeout(() => {
          navigate("/character");
        }, 1000);
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Door />} />
        <Route path="/character" element={<Character />} />
      </Routes>
    </Router>
  );
};

export default App;
