import "./Services.css";

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

export default function Services() {
  return (
    <section className="services">
      <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
        <h2>Our services</h2>
        <p>
          Our interior design agency offers personalized and innovative design
          solutions, transforming spaces into stylish, functional, and inspiring
          environments tailored to each client's unique vision and needs.
        </p>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight">
        <ul>
          <li>Consultation with the architect</li>
          <li>Floor plans with furniture positions and dimensions</li>
          <li>
            Floor plan with furniture position, dimensions and moodboard
            proposition
          </li>
          <li>
            Floor plan basis with furniture positions and draft version of 3D
            visualization
          </li>
          <li>
            Complete project (different type of floor plans, realistic 3D
            visualisation as well as executive drawings)
          </li>
          <li>Complete project with architect supervision of site works</li>
        </ul>
      </ScrollAnimation>
    </section>
  );
}
