import { Component } from "react";
import Card from "./Card";
import { css } from "@emotion/css";

export default class Grid extends Component {
  cardStack: { uniqueId: number; cardNumber: number; src: string }[];

  constructor(props: number) {
    super(props);
    this.cardStack = [
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
      { uniqueId: 1, cardNumber: 1, src: ".public/duck.jpg" },
    ];
  }

  render() {
    return (
      <>
        {/* map over all of the cards */}
        <div className={grid}>
          <Card />
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
  gap: "1rem",
  "& img": {
    width: "150px",
  },
});
