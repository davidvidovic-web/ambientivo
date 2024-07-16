import React, { useState, useRef } from "react";
import styled from "styled-components";
import "./ProjectFlow.css";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

const ProjectFlow = () => {
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
          <h2>Project Flow</h2>
          <p>
            Our Project Flow ensures a seamless and efficient interior design
            experience, encompassing:
          </p>
        </ScrollAnimation>
        <Wrapper>
          <Container>
            {cards.map((card, index) => (
              <React.Fragment key={card.id}>
                <input
                  type="radio"
                  name="slide"
                  id={card.id}
                  checked={selectedCard === card.id}
                  onChange={() => handleCardChange(card.id, index)}
                  style={{ display: "none" }}
                />
                <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
                <Card
                  ref={(el) => (cardRefs.current[index] = el)}
                  htmlFor={card.id}
                  selected={selectedCard === card.id}
                  background={card.background}
                >
                  <Row>
                    <Icon selected={selectedCard === card.id}>{index + 1}</Icon>
                    <Description selected={selectedCard === card.id}>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={card.icon}
                        alt={card.title}
                      />
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
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
