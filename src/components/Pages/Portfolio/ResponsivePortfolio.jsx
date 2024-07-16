import React, { useEffect, useState, Suspense } from "react";

// Dynamic imports for components
const Portfolio = React.lazy(() => import("./Portfolio"));
const PortfolioMobile = React.lazy(() => import("./PortfolioMobile"));

const ResponsivePortfolio = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Suspense fallback={<div></div>}>
      {isMobile ? <PortfolioMobile /> : <Portfolio />}
    </Suspense>
  );
};

export default ResponsivePortfolio;
