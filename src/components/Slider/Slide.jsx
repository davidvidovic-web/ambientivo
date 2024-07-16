import PropTypes from "prop-types";
import Button from "../Button/Button";

function Slide({ sliderItem = [], index }) {
  return (
    <div
      className="slideshow__slide js-slider-home-slide is-current"
      data-slide={index}
    >
      <div
        className="slideshow__slide-background-parallax background-absolute js-parallax"
        data-speed="-1"
        data-position="top"
        data-target="#js-header"
      >
        <div className="slideshow__slide-background-load-wrap background-absolute">
          <div className="slideshow__slide-background-load background-absolute">
            <div className="slideshow__slide-background-wrap background-absolute">
              <div className="slideshow__slide-background background-absolute">
                <div className="slideshow__slide-image-wrap background-absolute">
                  <div
                    className="slideshow__slide-image background-absolute"
                    style={{
                      backgroundImage: `url(${sliderItem[0] || ""})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="slideshow__slide-caption">
        <div className="slideshow__slide-caption-text">
          <div
            className="container js-parallax"
            data-speed="2"
            data-position="top"
            data-target="#js-header"
          >
            <h1 className="slideshow__slide-caption-title">
              {sliderItem[1] || "Loading..."}
            </h1>
            <h4
              style={{ width: "80%", fontSize: '1.3em', margin: '2.2em, 0' }}
              dangerouslySetInnerHTML={{ __html: sliderItem[3] }}
            ></h4>
            <a
              target="_self"
              className="slideshow__slide-caption-subtitle -load o-hsub -link"
              href={sliderItem[2] || "#"}
            >
              <span className="slideshow__slide-caption-subtitle-label">
                <Button text="Read more"></Button>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Slide.propTypes = {
  sliderItem: PropTypes.array,
  index: PropTypes.number,
};

export default Slide;
