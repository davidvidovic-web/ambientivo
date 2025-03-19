import React, { useEffect, useRef, useState } from "react";
import "./CompanyInNumbers.css";
import counterUp from "counterup2";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import { gql, useQuery } from "@apollo/client";

// Query matches what works in your GraphQL IDE
const GET_AMBIENTIVO_COUNTERS = gql`
  query GetAmbentivoSettings {
    ambientivo {
      counters {
        text
        number
      }
    }
  }
`;

function CompanyInNumbers() {
  const countersRef = useRef([]);
  const { loading, error, data } = useQuery(GET_AMBIENTIVO_COUNTERS);
  const [animated, setAnimated] = useState([]);

  // FIX: Access the data correctly based on your GraphQL response structure
  const counters = data?.ambientivo?.counters || [];

  // Initialize animated state when data is loaded
  useEffect(() => {
    if (counters.length > 0) {
      setAnimated(new Array(counters.length).fill(false));
    }
  }, [counters]);

  // Set up intersection observer for counter animation
  useEffect(() => {
    if (loading) return;

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
            newAnimated[index] = true;
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
  }, [animated, loading, counters]);

  // Reset refs when counters change
  useEffect(() => {
    countersRef.current = countersRef.current.slice(0, counters.length);
  }, [counters]);

  // If there's an error, use fallback data
  useEffect(() => {
    if (error) {
      console.error("Error fetching counters:", error);
    }
  }, [error]);

  // Show loading state
  if (loading) {
    return (
      <section className="company-in-numbers">
        <div className="loading">Loading counters...</div>
      </section>
    );
  }

  // Use fallback data if there's an error
  const displayCounters = error
    ? [
        { number: 15, text: "Projects" },
        { number: 4, text: "Different purposes" },
        { number: 4, text: "Different countries" },
        { number: 6, text: "Realized projects" },
        { number: 15000, text: "Sqm designed" },
      ]
    : counters;

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
        {displayCounters.map((counter, index) => (
          <ScrollAnimation
            key={index}
            animateIn="fadeInRight"
            animateOut="fadeOutRight"
            delay={`${0.3 + index * 0.3}s`}
          >
            <div className="counter-container">
              <div
                ref={(el) => (countersRef.current[index] = el)}
                className="counter"
              >
                {counter.number}
              </div>
              <span>{counter.text}</span>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}

export default CompanyInNumbers;
