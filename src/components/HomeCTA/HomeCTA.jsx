import Button from "../Button/Button";
import { Link } from "react-router-dom";
import "./HomeCTA.css";
import WordRotator from "../WordRotator/WordRotator";

import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
function HomeCTA() {
  return (
    <div className="home-cta">
      <section>
        <div className="ambientivo-dark-shortcode ambientivo-dark-m  ambientivo-dark-button ambientivo-dark-layout--outlined   ambientivo-dark-html--link">
          <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
            <h3>Have a project in mind?</h3>
            <h5>
              <span>Don't hesitate to say: </span>
              <WordRotator></WordRotator>
            </h5>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
            <Link to="/contact">
              <Button text="Let's talk"></Button>
            </Link>
          </ScrollAnimation>
          <span className="ambientivo-dark-m-corner ambientivo-dark--top-left"></span>
          <span className="ambientivo-dark-m-corner ambientivo-dark--top-right"></span>
          <span className="ambientivo-dark-m-corner ambientivo-dark--bottom-left"></span>
          <span className="ambientivo-dark-m-corner ambientivo-dark--bottom-right"></span>
          <span className="ambientivo-dark-m-btn-line ambientivo-dark-btn-line--top"></span>
          <span className="ambientivo-dark-m-btn-line ambientivo-dark-btn-line--right"></span>
          <span className="ambientivo-dark-m-btn-line ambientivo-dark-btn-line--bottom"></span>
          <span className="ambientivo-dark-m-btn-line ambientivo-dark-btn-line--left"></span>
        </div>
      </section>
    </div>
  );
}

export default HomeCTA;
