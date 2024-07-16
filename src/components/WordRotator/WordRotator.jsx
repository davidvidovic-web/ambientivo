import React, { useEffect, useState } from "react";
import "./WordRotator.css";

const WordRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const words = ["Bonjour", "Привет", "Hello", "Hallo", "Zdravo" ];

  useEffect(() => {
    const totalWordsToRotate = words.length;
    const rotateWords = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalWordsToRotate);
    };

    let timer;
    if (!isPaused) {
      timer = setInterval(rotateWords, 2500);
    }

    return () => clearInterval(timer);
  }, [isPaused, words.length]);

  const handleMouseOver = () => {
    setIsPaused(true);
  };

  const handleMouseOut = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="word-rotate-wrapper"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {words.map((word, index) => (
        <h2 key={index} className={index === currentIndex ? "show" : ""}>
          {word}
        </h2>
      ))}
    </div>
  );
};

export default WordRotator;
