import { useState, useEffect } from "react";
import "./App.css";
import MobileMenu from "./components/Menu/mobileMenu";
import Slider from "./components/Slider/Slider";
import CompanyInNumbers from "./components/CompanyInNumbers/CompanyInNumbers";
import LineAnimation from "./components/Line/Line";
import Services from "./components/Services/Services";
import HomeCTA from "./components/HomeCTA/HomeCTA";
import ProjectFlow from "./components/ProjectFlow/ProjectFlow";
import Footer from "./components/Footer/Footer";
import LoadingScreen from "./components/Animated/LoadingScreen/LoadingScreen";
import ProjectFlowMobile from "./components/ProjectFlow/ProjectFlowMobile";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingEnd = () => {
    setIsLoading(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Define mobile width

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen onAnimationEnd={handleLoadingEnd} />
      ) : (
        <>
          <MobileMenu></MobileMenu>
          <div id="wrapper">
            <Slider></Slider>
          </div>
          <Services></Services>
          <LineAnimation></LineAnimation>
          {isMobile ? (
            <ProjectFlowMobile></ProjectFlowMobile>
          ) : (
            <ProjectFlow></ProjectFlow>
          )}

          <LineAnimation></LineAnimation>
          <CompanyInNumbers></CompanyInNumbers>
          <LineAnimation></LineAnimation>
          <HomeCTA></HomeCTA>
          <Footer></Footer>
        </>
      )}
    </>
  );
}

export default App;
