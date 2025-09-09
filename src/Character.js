import React, { useState, useEffect } from "react";
import "./Character.css";
import mainImg from '../public/images/main.png'; // public/images 안에 이미지

const Character = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div
      className="character-container"
      style={{ backgroundImage: `url(${mainImg})` }}
    >
      <div className="speech-bubble">
        {loading ? (
          <p className="typing-dots">
            <span>.</span><span>.</span><span>.</span>
          </p>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Character;
