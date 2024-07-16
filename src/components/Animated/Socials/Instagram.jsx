import Lottie from "react-Lottie";
import { useState } from "react";
import animationData from "./instagram.json";

function Instagram() {
  const [stopped, setStopped] = useState(true);
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="animation-container"
        onMouseEnter={() => {
          setStopped(false);
        }}
        onMouseLeave={() => {
          setStopped(true);
        }}
      >
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled
          isStopped={stopped}
        />
      </div>
    </>
  );
}

export default Instagram;
