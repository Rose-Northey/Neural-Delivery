import { Component } from "react";
import Card from "./Card";
import { css } from "@emotion/css";

type CardData = {
  card: Card;
  randomization: number;
};

type GridProps = {
  images: string[];
};

export default class Grid extends Component<GridProps> {
  cardStack: CardData[];

  constructor(props: GridProps) {
    super(props);
    this.cardStack = [];
    this.cardStack = this.generateGrid(props.images);
  }

  generateGrid = (cardImages: string[]): CardData[] => {
    const newStack: CardData[] = [];
    cardImages.forEach((image) => {
      const card1 = new Card({ image, id: this.cardStack.length + 1 });
      const card2 = new Card({ image, id: this.cardStack.length + 2 });
      const cardData1 = { card: card1, randomization: Math.random() };
      const cardData2 = { card: card2, randomization: Math.random() };
      newStack.push(cardData1, cardData2);
    });
    return this.orderCardsByRandomizationNumber(newStack);
  };

  orderCardsByRandomizationNumber(cards: CardData[], iPivot = 0, iLastInSortRange = cards.length - 1): CardData[] {
    const iLastLower = this.findIndexOfLowerFromRight(cards, iPivot, iLastInSortRange);
    const iFirstHigher = this.findIndexOfHigherFromLeft(cards, iPivot, iLastInSortRange);
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
      return this.orderCardsByRandomizationNumber(cards, iPivot, iLastInSortRange);
    }
    return cards;
  }
  findIndexOfLowerFromRight(cardData: CardData[], iPivot: number, iLastInSortRange: number): number | undefined {
    for (let i = iLastInSortRange; i > iPivot; i--)
      if (cardData[i].randomization < cardData[iPivot].randomization) {
        return i;
      }
  }
  findIndexOfHigherFromLeft(cardData: CardData[], iPivot: number, iLastInSortRange: number): number | undefined {
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
    return (
      <>
        <div className={grid}>
          {this.cardStack.map((cardInStack) => {
            return cardInStack.card.render();
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
