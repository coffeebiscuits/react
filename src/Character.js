import React, { useEffect, useState } from "react";
import "./Character.css";

const Character = () => {
  const [streamedText, setStreamedText] = useState("");

  useEffect(() => {
    const message = "안녕하세요, 반가워요!";
    let i = 0;
    const typing = setInterval(() => {
      setStreamedText((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(typing);
    }, 100); // 글자당 100ms
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="character-container">
      <img
        src="/images/character.png"
        alt="character"
        className="character"
      />
      <div className="typing-text">
        {streamedText}
        <span className="cursor">|</span>
      </div>
    </div>
  );
};

export default Character;
