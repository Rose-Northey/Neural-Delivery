import { Component } from "react";
import Card from "./Card";
import { css } from "@emotion/css";

type CardData = {
  image: string;
  randomization: number;
  id: number;
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
    this.state = {
      cardStackData: this.generateGrid(this.props.images),
    };
  }

  componentDidUpdate(prevProps: GridProps): void {
    if (this.props.resetGrid) {
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
      };
      const cardData2 = {
        image: image,
        id: newStack.length + 1,
        randomization: Math.random(),
      };
      newStack.push(cardData1, cardData2);
    });
    return this.orderCardsByRandomizationNumber(newStack);
  };

  orderCardsByRandomizationNumber(
    cards: CardData[],
    iPivot = 0,
    iLastInSortRange = cards.length - 1
  ): CardData[] {
    const iLastLower = this.findIndexOfLowerFromRight(
      cards,
      iPivot,
      iLastInSortRange
    );
    const iFirstHigher = this.findIndexOfHigherFromLeft(
      cards,
      iPivot,
      iLastInSortRange
    );
    if (!iLastLower) {
      iPivot++;
    } else if (!iFirstHigher) {
      this.swapCards(cards, iPivot, iLastInSortRange);
      iLastInSortRange--;
    } else if (iFirstHigher > iLastLower) {
      this.swapCards(cards, iPivot, iLastLower);
    } else if (iFirstHigher < iLastLower) {
      this.swapCards(cards, iFirstHigher, iLastLower);
    }

    if (iPivot < iLastInSortRange) {
      return this.orderCardsByRandomizationNumber(
        cards,
        iPivot,
        iLastInSortRange
      );
    }
    return cards;
  }
  findIndexOfLowerFromRight(
    cardData: CardData[],
    iPivot: number,
    iLastInSortRange: number
  ): number | undefined {
    for (let i = iLastInSortRange; i > iPivot; i--)
      if (cardData[i].randomization < cardData[iPivot].randomization) {
        return i;
      }
  }
  findIndexOfHigherFromLeft(
    cardData: CardData[],
    iPivot: number,
    iLastInSortRange: number
  ): number | undefined {
    for (let i = iPivot + 1; i <= iLastInSortRange; i++) {
      if (cardData[i].randomization > cardData[iPivot].randomization) {
        return i;
      }
    }
  }
  swapCards(cardData: CardData[], iOne: number, iTwo: number): void {
    const oldOne = cardData[iOne];
    cardData[iOne] = cardData[iTwo];
    cardData[iTwo] = oldOne;
  }
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
