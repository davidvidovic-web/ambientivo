import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./PortfolioMobile.css";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

const GET_POST = gql`
  query Portfolio {
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
    if (!isLoading) {
      // Perform any additional logic after loading
    }
  }, [isLoading, data]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onAnimationEnd={handleLoadingEnd} />
      ) : (
        <>
          <MobileMenu />
          <section className="container portfolio portfolio-mobile">
            <ul className="list">
              {data.projects.nodes.map((project, index) => (
                <li key={index} className="list__item">
                  {" "}
                  <article className="card">
                    <section className="card__content">
                      <ScrollAnimation
                        animateIn="fadeInLeft"
                        animateOut="fadeOutLeft"
                      >
                        <section className="card__inner">
                          <h1 className="card__title">
                            {index + 1}. {project.title}
                          </h1>
                          <p
                            className="card__text"
                            dangerouslySetInnerHTML={{
                              __html: project.excerpt,
                            }}
                          ></p>
                          <Link
                            className="nav__link portflio_link"
                            target="_self"
                            to={`/projects/${project.slug}`}
                          >
                            See more
                          </Link>
                        </section>
                      </ScrollAnimation>
                    </section>
                    <aside className="card__aside">
                      <ScrollAnimation
                        animateIn="fadeInRight"
                        animateOut="fadeOutRight"
                      >
                        <img
                          className="js-image"
                          src={project.featuredImage.node.sourceUrl}
                          alt={`Card ${index + 1}`}
                        />
                      </ScrollAnimation>
                    </aside>
                  </article>
                </li>
              ))}
            </ul>
          </section>
          <section className="outer"></section>
          <Footer />
        </>
      )}
    </>
  );
};

export default PortfolioMobile;
