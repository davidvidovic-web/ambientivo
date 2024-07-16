import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframe animations
const draw = keyframes`
  0% {
    stroke-dasharray: 0 100;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  100% {
    stroke-dasharray: 100 0;
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const shine = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #282c34;
  animation: ${(props) => (props.loading ? "none" : `${fadeOut} 1s forwards`)};
`;

const SvgText = styled.svg`
  width: 80%;
  font-size: 4rem;
  overflow: visible;
  margin-top: -10vh;
`;

const SvgLetter = styled.text`
  fill: none;
  stroke: white;
  stroke-width: 1px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  opacity: 0;
  animation: ${draw} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

const ShiningSpan = styled.span`
  color: #fff;
  animation: ${shine} 2s infinite;
`;

const LoadingScreen = ({ onAnimationEnd }) => {
  const [loading, setLoading] = useState(true);
  const text = "ambientivo";

  useEffect(() => {
    const totalAnimationTime = text.length * 0.2 + 1;
    const timer = setTimeout(() => {
      onAnimationEnd();
      setLoading(false);
    }, totalAnimationTime * 1000);
    return () => clearTimeout(timer);
  }, [onAnimationEnd, text.length]);

  return (
    <LoadingContainer loading={loading.toString()}>
      <SvgText
        viewBox={`0 0 ${text.length * 40} 100`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {text.split("").map((letter, index) => (
          <SvgLetter key={index} delay={index * 0.2} x={index * 40} y="80">
            {letter}
          </SvgLetter>
        ))}
      </SvgText>
      <ShiningSpan>Interior design & architecture atelier</ShiningSpan>
    </LoadingContainer>
  );
};

export default LoadingScreen;
