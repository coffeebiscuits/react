import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./Character.css";

const Character = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch("https://port-0-working-task-madmcado69392982.sel4.cloudtype.app/greeting/stream");
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const char = decoder.decode(value, { stream: true });
          setText(prev => prev + char);
        }
      } catch (err) {
        console.error("스트리밍 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStream();
  }, []);

  const handleClick = () => {
    navigate("/home"); // 버튼 클릭 시 이동
  };
      
  return (
    <div className="character-container">
      <img
        src="/images/welcome_01.png"
        alt="character"
        className="character"
      />
      <div className="speech-bubble">
        {loading ? (
          <div
            className="typing-dots"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 0,
            }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>

      {!loading && (
        <button className="center-button" onClick={handleClick}>
          다음
        </button>
      )}
    </div>
  );
};

export default Character;
