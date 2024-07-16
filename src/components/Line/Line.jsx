import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);


const LineAnimation = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;

    gsap.set(line, { transformOrigin: "center top", opacity: 0, scaleY: 0 });

    gsap.fromTo(
      line,
      { opacity: 0, scaleY: 0 },
      {
        opacity: 1,
        scaleY: 1,
        scrollTrigger: {
          trigger: line,
          start: "top 80%", // Adjust the start position
          end: "top 10%", // Adjust the end position
          markers: false, // Set to false in production
          scrub: true,
          toggleActions: "play reverse play reverse", // Defines the actions for different scroll directions
        },
      }
    );
  }, []);

  return (
    <PageWrapper>
      <Wrapper>
        <Line ref={lineRef} />
      </Wrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: 600px; /* Entire scrollable area is 800px */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 5px;
  height: 600px;
  background-color: black;
  transform-origin: center top;
`;

export default LineAnimation;
