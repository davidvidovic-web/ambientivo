import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "./facebook.lottie";
import { Link } from "react-router-dom";

function Facebook() {
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
        <Link to="https://www.facebook.com/profile.php?id=61566416229516">
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

export default Facebook;
