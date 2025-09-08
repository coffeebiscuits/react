import React, { useState, useEffect } from "react";
import "./Character.css";

const Character = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchStream = async () => {
      const response = await fetch("https://port-0-working-task-madmcado69392982.sel4.cloudtype.app/greeting/stream"); // LLM 백엔드 스트리밍 엔드포인트
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // 토큰 단위로 업데이트
        setText((prev) => prev + buffer);
        buffer = "";
      }
    };

    fetchStream();
  }, []);

  return (
    <div className="character-container">
      <img src="/images/character.png" alt="character" className="character" />
      <div className="speech-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Character;
