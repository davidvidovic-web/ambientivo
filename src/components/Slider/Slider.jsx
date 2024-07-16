import { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import Slide from "./Slide.jsx";
import "./slider.css";
import "./sliderJQuery.js";

const GET_POST = gql`
  query Slider {
    projects(
      where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
      first: 5
    ) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        slug
        title
        excerpt
      }
    }
  }
`;

function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideShowRef = useRef(null);
  const intervalRef = useRef(null);
  const { loading, error, data } = useQuery(GET_POST);

  const maxSlide = sliderData.length;
  const animationDuration = 1200;
  const autoplaySpeed = 9000;

  useEffect(() => {
    if (!loading && !error && data) {
      const nodes = data.projects.nodes;
      const formattedData = nodes.map((node) => [
        node.featuredImage.node.sourceUrl,
        node.title,
        "/projects/" + node.slug,
        node.excerpt,
      ]);
      setSliderData(formattedData);
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (maxSlide > 1) {
      goToSlide(1); // Ensure we start at the first slide
      startAutoplay();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [maxSlide]);

  useEffect(() => {
    if (!slideShowRef.current) return;

    const newCurrent = slideShowRef.current.querySelector(
      `.js-slider-home-slide[data-slide="${currentSlide}"]`
    );
    const newPrev =
      currentSlide === 1
        ? slideShowRef.current.querySelector(".js-slider-home-slide:last-child")
        : newCurrent?.previousElementSibling;
    const newNext =
      currentSlide === maxSlide
        ? slideShowRef.current.querySelector(
            ".js-slider-home-slide:first-child"
          )
        : newCurrent?.nextElementSibling;

    const slides = slideShowRef.current.querySelectorAll(
      ".js-slider-home-slide"
    );
    slides.forEach((slide) => {
      slide.classList.remove("is-prev", "is-next", "is-current");
    });

    const paginationItems = slideShowRef.current.querySelectorAll(
      ".js-pagination-item"
    );
    paginationItems.forEach((item) => {
      item.classList.remove("is-current");
    });

    if (maxSlide > 1) {
      if (newPrev) newPrev.classList.add("is-prev");
      if (newNext) newNext.classList.add("is-next");
    }
    if (newCurrent) newCurrent.classList.add("is-current");

    const currentPaginationItem = slideShowRef.current.querySelector(
      `.js-pagination-item[data-slide="${currentSlide}"]`
    );
    if (currentPaginationItem) {
      currentPaginationItem.classList.add("is-current");
    }
  }, [currentSlide, maxSlide]);

  const preventClick = () => {
    setIsAnimating(true);
    clearInterval(intervalRef.current);

    setTimeout(() => {
      setIsAnimating(false);
      startAutoplay();
    }, animationDuration);
  };

  const goToSlide = (index) => {
    setCurrentSlide((prevSlide) => {
      const newSlide = parseInt(index);
      return newSlide > maxSlide ? 1 : newSlide === 0 ? maxSlide : newSlide;
    });
  };

  const nextSlide = () => {
    preventClick();
    setCurrentSlide((prevSlide) => (prevSlide % maxSlide) + 1);
  };

  const prevSlide = () => {
    preventClick();
    setCurrentSlide((prevSlide) =>
      prevSlide === 1 ? maxSlide : prevSlide - 1
    );
  };

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, autoplaySpeed);
  };

  const createPagination = () => {
    const paginationItems = Array.from({ length: maxSlide }, (_, i) => (
      <span
        key={i + 1}
        className={`pagination__item js-pagination-item ${
          i === 0 ? "is-current" : ""
        }`}
        data-slide={i + 1}
        onClick={(e) => {
          if (!isAnimating) {
            preventClick();
            goToSlide(e.target.dataset.slide);
          }
        }}
      >
        {i + 1}
      </span>
    ));
    return (
      <div className="pagination">
        <div className="container">{paginationItems}</div>
      </div>
    );
  };

  if (loading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    // return <div>Error: {error.message}</div>;
  }

  return (
    <div ref={slideShowRef} className="slideshow-ref">
      <div className="slideshow" id="js-header">
        {sliderData.map((sliderItem, index) => (
          <Slide
            key={index}
            sliderItem={sliderItem}
            index={index + 1}
            className="js-slider-home-slide"
            data-slide={index + 1}
          />
        ))}
      </div>
      {maxSlide > 1 && createPagination()}
    </div>
  );
}

export default Slider;
