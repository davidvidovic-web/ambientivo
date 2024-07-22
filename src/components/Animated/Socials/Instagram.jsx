import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "./instagram.json";
import { Link } from "react-router-dom";

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
      <div
        className="animation-container"
        onMouseEnter={() => {
          setStopped(false);
        }}
        onMouseLeave={() => {
          setStopped(true);
        }}
      >
        <Link to="https://www.instagram.com/ambientivo">
          <Lottie
            options={defaultOptions}
            isClickToPauseDisabled
            isStopped={stopped}
          />
        </Link>
      </div>
    </>
  );
}

export default Instagram;
