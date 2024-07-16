import React, { useEffect, useRef, useState } from "react";
import "./CompanyInNumbers.css";
import counterUp from "counterup2";

function CompanyInNumbers() {
  const countersRef = useRef([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting && !animated) {
          counterUp(el, {
            duration: 2000,
            delay: 16,
          });
          setAnimated(true); // Set animated to true after the first animation
        }
      });
    };

    const IO = new IntersectionObserver(callback, { threshold: 1 });

    countersRef.current.forEach((counter) => {
      if (counter) {
        IO.observe(counter);
      }
    });

    return () => {
      countersRef.current.forEach((counter) => {
        if (counter) {
          IO.unobserve(counter);
        }
      });
    };
  }, [animated]); // Add animated to the dependency array

  return (
    <section className="company-in-numbers">
      <div className="meet-the-studio">
        <h2>
          Meet the studio <br /> in numbers
        </h2>
      </div>
      <div className="counters">
        <div className="counter-container">
          <div ref={(el) => (countersRef.current[0] = el)} className="counter">
            15
          </div>
          <span>Projects</span>
        </div>
        <div className="counter-container">
          <div ref={(el) => (countersRef.current[1] = el)} className="counter">
            4
          </div>
          <span>Different purposes</span>
        </div>
        <div className="counter-container">
          <div ref={(el) => (countersRef.current[2] = el)} className="counter">
            4
          </div>
          <span>Different countries</span>
        </div>
        <div className="counter-container">
          <div ref={(el) => (countersRef.current[3] = el)} className="counter">
            6
          </div>
          <span>Realized projects</span>
        </div>
        <div className="counter-container">
          <div ref={(el) => (countersRef.current[4] = el)} className="counter">
            15,000
          </div>
          <span>Sqm designed</span>
        </div>
      </div>
    </section>
  );
}

export default CompanyInNumbers;
