import "./AssistantAnswer.css";
import React, { useState, useEffect, useRef } from "react";

const logoStyle = {
  display: "inline-block",
  border: "1px solid #C5C3C6",
  padding: "7px",
  borderRadius: "50%",
  width: "1rem",
  height: "1rem",
  textAlign: "center",
  backgroundColor: "#1985A1",
  color: "#C5C3C6",
};

const textStyle = {
  position: "relative",
  left: "calc(1rem + 20px)",
  top: "calc(-1rem - 7px)",
};

const deepThinking = {
  color: "#767676ff",
  borderLeft: "2px solid #767676ff",
  paddingLeft: "0.5rem",
};

export default function AssistantAnswer({
  text,
  messageId,
  isAnimated,
  onAnimationComplete,
}) {
  const analysis = text.split("assistantfinal")[0]?.slice(8) || "";
  const answer = text.split("assistantfinal")[1] || "";

  const [displayText, setDisplayText] = useState(isAnimated ? analysis : "");
  const [showAnswer, setShowAnswer] = useState(isAnimated);

  useEffect(() => {
    if (isAnimated) {
      setDisplayText(analysis);
      return;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < analysis.length) {
        setDisplayText(analysis.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setShowAnswer(true);
        onAnimationComplete?.();
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [analysis, isAnimated, onAnimationComplete]);

  return (
    <>
      <div style={logoStyle}>N</div>
      <div style={textStyle}>
        <div style={deepThinking}>{displayText}</div>
        <div>{showAnswer ? answer : null}</div>
      </div>
    </>
  );
}
