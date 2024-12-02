import { Component } from "react";
import shuffleCards from "./shuffleCards";
import Card from "./Card";
import { css } from "@emotion/css";

export type CardData = {
  image: string;
  randomization: number;
  id: number;
  isMatched: boolean;
  isSelected: boolean;
};

type GridProps = {
  images: string[];
  resetGrid: boolean;
};
type GridState = {
  cardStackData: CardData[];
};

export default class Grid extends Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);

    this.state = { cardStackData: this.generateGrid(props.images) };
  }
  componentDidUpdate(prevProps: GridProps): void {
    if (this.props.resetGrid === true) {
      this.setState({ cardStackData: this.generateGrid(this.props.images) });
    }
  }

  generateGrid = (cardImages: string[]): CardData[] => {
    const newStack: CardData[] = [];
    cardImages.forEach((image) => {
      const cardData1 = {
        image: image,
        id: newStack.length,
        randomization: Math.random(),
        isMatched: false,
        isSelected: false,
      };
      const cardData2 = {
        image: image,
        id: newStack.length + 1,
        randomization: Math.random(),
        isMatched: false,
        isSelected: false,
      };
      newStack.push(cardData1, cardData2);
    });
    return shuffleCards(newStack);
  };

  render() {
    if (!this.state.cardStackData) {
      return null;
    }
    return (
      <>
        <div className={grid}>
          {this.state.cardStackData.map((cardData) => {
            return (
              <Card key={cardData.id} id={cardData.id} image={cardData.image} />
            );
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
