import React, { useState } from "react";
import "./home.css";

const Home = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(true);
  };

  return (
    <div className="home-container">
      <p>버튼을 눌러 이동 성공!</p>
      
      <img
        src={isOpened ? "/images/envelope_opened.png" : "/images/envelope_closed.png"}
        alt="편지봉투"
        className="envelope"
        onClick={handleClick}
        style={{ cursor: "pointer", width: "150px", marginTop: "20px" }}
      />
    </div>
  );
};

export default Home;
