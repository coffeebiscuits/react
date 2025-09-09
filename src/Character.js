import React, { useState, useEffect } from "react";
import "./Character.css";

const Character = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true); // LLM 답변 대기 상태

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
          setText(prev => prev + char); // 한 글자씩 이어 붙이기
        }
      } catch (err) {
        console.error("스트리밍 에러:", err);
      } finally {
        setLoading(false); // 스트리밍 종료 시 로딩 해제
      }
    };

    fetchStream();
  }, []);

  return (
    <div className="character-container">
      <img
        src="/images/main.png"
        alt="character"
        className="character"
      />
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
