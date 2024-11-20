import { Component } from "react";
import Card from "./Card";
import { css } from "@emotion/css";

export default class Grid extends Component {
  cardStack: Card[];

  constructor(props: number) {
    super(props);
    this.cardStack = [];
  }
  RandomiseCards = () => {};

  GenerateCardPair = (image: string) => {
    const image1 = "/images/duck.jpg";
  };

  GenerateGrid = (cardImages: string[]) => {
    cardImages.forEach((image) => {
      const card = new Card({ image, id: this.cardStack.length + 1 });
      const identicalCard = new Card({ image, id: this.cardStack.length + 2 });
      this.cardStack.push(card, identicalCard);
    });
  };

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
