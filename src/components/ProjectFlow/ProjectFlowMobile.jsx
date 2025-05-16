import React, { useState, useRef } from "react";
import styled from "styled-components";
import "./ProjectFlow.css";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import { useTranslation } from "react-i18next";

const ProjectFlow = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState("c1");
  const cardRefs = useRef([]);

  const handleCardChange = (cardId, index) => {
    setSelectedCard(cardId);
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#eeeae0", padding: "20px" }}>
      <section className="project-flow">
        <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
          <h2>{t('projectFlow.title')}</h2>
          <p>{t('projectFlow.description')}</p>
        </ScrollAnimation>
        <Wrapper>
          <Container>
            {t('projectFlow.steps', { returnObjects: true }).map((step, index) => (
              <React.Fragment key={`c${index + 1}`}>
                <input
                  type="radio"
                  name="slide"
                  id={`c${index + 1}`}
                  checked={selectedCard === `c${index + 1}`}
                  onChange={() => handleCardChange(`c${index + 1}`, index)}
                  style={{ display: "none" }}
                />
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                  <Card
                    ref={(el) => (cardRefs.current[index] = el)}
                    htmlFor={`c${index + 1}`}
                    selected={selectedCard === `c${index + 1}`}
                    background="./images/components/ProjectFlow/bg.jpg"
                  >
                    <Row>
                      <Icon selected={selectedCard === `c${index + 1}`}>{index + 1}</Icon>
                      <Description selected={selectedCard === `c${index + 1}`}>
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={`./images/components/ProjectFlow/${index + 1}.svg`}
                          alt={step.title}
                        />
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </Description>
                      {!selectedCard && <CollapsedIcon></CollapsedIcon>}
                    </Row>
                  </Card>
                </ScrollAnimation>
              </React.Fragment>
            ))}
          </Container>
        </Wrapper>
      </section>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 1em 0;
`;

const Card = styled.label`
  max-width: 100%;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
  margin: 10px 0;
  display: flex;
  position: relative;
  align-items: flex-end;
  transition: height 0.3s, padding 0.3s; // Include padding in transition
  background-image: url(${(props) => props.background});
  background-color: #223;
  margin: 20px;
  height: ${(props) => (props.selected ? "auto" : "100px")};
  padding: ${(props) =>
    props.selected ? "2em 0" : "0"}; // Conditional padding
`;

const Row = styled.div`
  color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

const Icon = styled.div`
  color: #223;
  font-size: 2em;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  border: 1px solid;
  position: absolute;
  left: 0;
  bottom: ${(props) => (props.selected ? "-30px" : "10px")};
  transition: bottom 0.3s;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  color: #111;
  opacity: ${(props) => (props.selected ? 1 : 0)};
  transition: opacity 0.3s;
  height: auto;
  padding: 10px 20px;
  text-align: center;
`;

const CollapsedIcon = styled.div`
  font-size: 3em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`;

export default ProjectFlow;
