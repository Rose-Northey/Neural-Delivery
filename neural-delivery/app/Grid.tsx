import { Component } from "react";
import Card from "./Card";
import { css } from "@emotion/css";

export default class Grid extends Component {
  cardStack: { uniqueId: number; cardNumber: number; src: string }[];

  constructor(props: number) {
    super(props);
    this.cardStack = [
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 2, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 3, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 4, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 5, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 6, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 7, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 8, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 9, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 10, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 11, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 12, cardNumber: 1, src: ".public/duck.jpg" },
    ];
  }
  RandomiseCards = () => {};

  GenerateCards = () => {};

  render() {
    return (
      <>
        {/* map over all of the cards */}
        <div className={grid}>
          {this.cardStack.map((cardInStack) => {
            return <Card />;
          })}
        </div>
      </>
    );
  }
}

const grid = css({
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "40rem",
  gap: "0.5rem",
  "& img": {
    width: "150px",
  },
});
