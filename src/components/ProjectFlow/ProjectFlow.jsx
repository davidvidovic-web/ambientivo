import React, { useState } from "react";
import styled from "styled-components";
import "./ProjectFlow.css";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

const ProjectFlow = () => {
  const [selectedCard, setSelectedCard] = useState("c1");

  return (
    <>
      <div style={{ backgroundColor: "#eeeae0", padding: "20px" }}>
        <section className="project-flow">
          <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft">
            <h2>Project Flow</h2>
            <p>
              Our Project Flow ensures a seamless and efficient interior design
              experience, encompassing:
            </p>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight">
            <Wrapper>
              <Container>
                {cards.map((card, index) => (
                  <React.Fragment key={card.id}>
                    <input
                      type="radio"
                      name="slide"
                      id={card.id}
                      checked={selectedCard === card.id}
                      onChange={() => setSelectedCard(card.id)}
                      style={{ display: "none" }}
                    />
                    <Card
                      htmlFor={card.id}
                      className="card"
                      selected={selectedCard === card.id}
                      background={card.background}
                    >
                      <Row>
                        <Icon>{index + 1}</Icon>
                        <Description selected={selectedCard === card.id}>
                          <img src={card.icon}></img>
                          <h4>{card.title}</h4>
                          <p>{card.description}</p>
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

const cards = [
  {
    id: "c1",
    title: "First meeting",
    description:
      "Getting to know the client, his needs, wishes, aesthetic aspirations, coordinating the timeline of the potential projec",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/1.svg",
  },
  {
    id: "c2",
    title: "Plan delivery",
    description:
      "Presenting the floor plan and discussing it, presenting the mood board and aesthetics in which direction the project would go",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/2.svg",
  },
  {
    id: "c3",
    title: "First 3D input",
    description:
      "Correction of the conclusions from the last meeting and the first 3d input (draft visualisation)",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/3.svg",
  },
  {
    id: "c4",
    title: "Delivery of realistic visualisations (Render image)",
    description:
      "Realistic visualisations show how the space could look with respect to the client's guidelines, discussions about the client's opinion",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/4.svg",
  },
  {
    id: "c5",
    title: "Final visualisation and presentation",
    description:
      "Changes according to the client's input and finalisation of the 3D appearance",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/5.svg",
  },
  {
    id: "c6",
    title: "Technical drawings",
    description:
      "Delivery of technical drawings and detailed preparation with craftsmen for the creation of the project",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/6.svg",
  },
  {
    id: "c7",
    title: "Project realization and supervision",
    description:
      "The best result is certainly when the architect supervises the work of the craftsman and controls the delivered quality",
    background: "./images/components/ProjectFlow/bg.jpg",
    icon: "./images/components/ProjectFlow/7.svg",
  },
];

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
