import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useQuery, gql } from "@apollo/client";
import "./Portfolio.css";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";

// No need to import or register ScrollTrigger

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

const PortfolioMobile = () => {
  const { loading, error, data } = useQuery(GET_POST);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingEnd = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      const handleLoad = () => {
        const panels = gsap.utils.toArray(".card__content");

        panels.forEach((item) => {
          const contentElements = item.querySelectorAll(".card__inner > *");

          gsap.set(contentElements, {
            y: 80,
            opacity: 0,
          });

          gsap.to(contentElements, {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            delay: 0.2,
          });
        });
      };

      handleLoad();
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onAnimationEnd={handleLoadingEnd} />
      ) : (
        <>
          <MobileMenu />
          <section className="container portfolio">
            <ul className="list">
              {data.projects.nodes.map((project, index) => (
                <li key={index} className="list__item">
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
                          className="nav__link portfolio_link"
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
          <Footer />
        </>
      )}
    </>
  );
};

export default PortfolioMobile;
