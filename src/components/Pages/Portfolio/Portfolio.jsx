import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery, gql } from "@apollo/client";
import "./Portfolio.css";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import LineAnimation from "../../Line/Line";
import { Line } from "three";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const GET_POST = gql`
  query Slider {
    projects(
      where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
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

const Portfolio = () => {
  const { loading, error, data } = useQuery(GET_POST);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingEnd = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      const handleLoad = () => {
        const panels = gsap.utils.toArray(".card__content");

        panels.forEach((item, i) => {
          const contentElements = item.querySelectorAll(".card__inner > *");

          gsap.set(contentElements, {
            y: 0,
            opacity: 0,
          });

          ScrollTrigger.create({
            trigger: item,
            // markers: true, // Comment or remove this line to disable debug markers
            pin: true,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: ({ progress, direction, isActive }) => {
              gsap.fromTo(
                contentElements,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05 }
              );
            },
            onLeave: ({ progress, direction, isActive }) => {
              if (i !== panels.length - 1) {
                gsap.fromTo(
                  contentElements,
                  { y: 0, opacity: 1 },
                  { y: -80, opacity: 0, stagger: 0.05 }
                );
              }
            },
            onLeaveBack: ({ progress, direction, isActive }) => {
              if (i !== 0) {
                gsap.fromTo(
                  contentElements,
                  { y: 0, opacity: 1 },
                  { y: -80, opacity: 0, stagger: 0.05 }
                );
              }
            },
            onEnterBack: ({ progress, direction, isActive }) => {
              gsap.fromTo(
                contentElements,
                { y: -80, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.05 }
              );
            },
          });
        });
      };

      // Call handleLoad only when isLoading is false and data is available
      handleLoad();
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onAnimationEnd={handleLoadingEnd} />
      ) : (
        <>
          <MobileMenu></MobileMenu>
          <section className="container portfolio">
            <ul className="list">
              {data.projects.nodes.map((project, index) => (
                <li key={project.index} className="list__item">
                  <article className="card">
                    <section className="card__content">
                      <section className="card__inner">
                        <h1 className="card__title">
                          {index + 1}. {project.title}
                        </h1>
                        <p
                          className="card__text"
                          dangerouslySetInnerHTML={{ __html: project.excerpt }}
                        ></p>
                        <Link
                          className="nav__link portflio_link"
                          target="_self"
                          to={`/projects/${project.slug}`} 
                        >
                          See more
                        </Link>
                      </section>
                    </section>
                    <aside className="card__aside">
                      <img
                        className="js-image"
                        src={project.featuredImage.node.sourceUrl}
                        alt={`Card ${index + 1}`}
                      />
                    </aside>
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <section className="outer"></section>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default Portfolio;
