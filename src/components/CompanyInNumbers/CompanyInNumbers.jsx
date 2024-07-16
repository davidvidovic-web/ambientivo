import React, { useEffect, useRef, useState } from "react";
import "./CompanyInNumbers.css";
import counterUp from "counterup2";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

function CompanyInNumbers() {
  const countersRef = useRef([]);
  const [animated, setAnimated] = useState(
    new Array(5).fill(false) // Create an array of false values for each counter
  );

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const index = countersRef.current.indexOf(el);

        if (entry.isIntersecting && !animated[index]) {
          counterUp(el, {
            duration: 2000,
            delay: 16,
          });
          setAnimated((prevAnimated) => {
            const newAnimated = [...prevAnimated];
            newAnimated[index] = true; // Set animated state for this counter to true
            return newAnimated;
          });
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
      <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
        <div className="meet-the-studio">
          <h2>
            Meet the studio <br /> in numbers
          </h2>
        </div>
      </ScrollAnimation>

      <div className="counters">
        <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" delay='0.3s'>
          <div className="counter-container">
            <div
              ref={(el) => (countersRef.current[0] = el)}
              className="counter"
            >
              15
            </div>
            <span>Projects</span>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="fadeInRight"
          animateOut="fadeOutRight"
          delay="0.6s"
        >
          <div className="counter-container">
            <div
              ref={(el) => (countersRef.current[1] = el)}
              className="counter"
            >
              4
            </div>
            <span>Different purposes</span>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="fadeInRight"
          animateOut="fadeOutRight"
          delay="0.9s"
        >
          <div className="counter-container">
            <div
              ref={(el) => (countersRef.current[2] = el)}
              className="counter"
            >
              4
            </div>
            <span>Different countries</span>
          </div>{" "}
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="fadeInRight"
          animateOut="fadeOutRight"
          delay="1.2s"
        >
          <div className="counter-container">
            <div
              ref={(el) => (countersRef.current[3] = el)}
              className="counter"
            >
              6
            </div>
            <span>Realized projects</span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="fadeInRight"
          animateOut="fadeOutRight"
          delay="1.5s"
        >
          <div className="counter-container">
            <div
              ref={(el) => (countersRef.current[4] = el)}
              className="counter"
            >
              15,000
            </div>
            <span>Sqm designed</span>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

export default CompanyInNumbers;
