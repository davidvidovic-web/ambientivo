import React, { useState } from "react";
import styled from "styled-components";
import "./ProjectFlow.css";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import { useTranslation } from "react-i18next";

const ProjectFlow = () => {
  const { t } = useTranslation();
  const [selectedCard, setSelectedCard] = useState("c1");

  return (
    <>
      <div style={{ backgroundColor: "#eeeae0", padding: "20px" }}>
        <section className="project-flow">
          <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
            <h2>{t('projectFlow.title')}</h2>
            <p>{t('projectFlow.description')}</p>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight">
            <Wrapper>
              <Container>
                {t('projectFlow.steps', { returnObjects: true }).map((step, index) => (
                  <React.Fragment key={`c${index + 1}`}>
                    <input
                      type="radio"
                      name="slide"
                      id={`c${index + 1}`}
                      checked={selectedCard === `c${index + 1}`}
                      onChange={() => setSelectedCard(`c${index + 1}`)}
                      style={{ display: "none" }}
                    />
                    <Card
                      htmlFor={`c${index + 1}`}
                      className="card"
                      selected={selectedCard === `c${index + 1}`}
                      background="./images/components/ProjectFlow/bg.jpg"
                    >
                      <Row>
                        <Icon>{index + 1}</Icon>
                        <Description selected={selectedCard === `c${index + 1}`}>
                          <img src={`./images/components/ProjectFlow/${index + 1}.svg`} alt={step.title} />
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </Description>
                      </Row>
                    </Card>
                  </React.Fragment>
                ))}
              </Container>
            </Wrapper>
          </ScrollAnimation>
        </section>
      </div>
    </>
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
  height: 450px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
`;

const Card = styled.label`
  width: ${(props) => (props.selected ? "600px" : "80px")};
  background-size: cover;
  cursor: none;
  overflow: hidden;
  margin: 0 10px;
  display: flex;
  position: relative;
  align-items: flex-end;
  transition: 1s cubic-bezier(0.18, 0.18, 0, 0.98);
  background-image: url(${(props) => props.background});
  background-color: #223;
`;

const Row = styled.div`
  color: #fff;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

const Icon = styled.div`
  // background: #fff;
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
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  gap: 20px;
  color: #111;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 15px;
  opacity: ${(props) => (props.selected ? 1 : 0)};
  transform: ${(props) =>
    props.selected ? "translateY(0)" : "translateY(30px)"};
  transition-delay: 0.3s;
  transition: all 0.15s ease;
  width: calc(100% - 30px);
  height: 100%;
  text-align: center;
  margin-top: -15px;
`;

export default ProjectFlow;
