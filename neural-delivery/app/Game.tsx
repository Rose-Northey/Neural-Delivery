import { Component } from "react";
import Controls from "./Controls";
import { css } from "@emotion/css";
import shuffleCards from "./shuffleCards";

import Card from "./Card";

type GameProps = {};

export type CardData = {
  image: string;
  randomization: number;
  id: number;
  isMatched: boolean;
  isSelected: boolean;
};

type GameState = {
  numberOfMoves: number;
  cards: CardData[];
};

export default class Game extends Component<GameProps, GameState> {
  images: string[];
  constructor(props: GameProps) {
    super(props);
    this.images = [
      "/images/blackCat.jpg",
      "/images/horse.jpg",
      "/images/box.jpg",
      "/images/uke.jpg",
      "/images/plant.jpg",
      "/images/duck.jpg",
    ];
    this.state = {
      numberOfMoves: 0,
      cards: this.generateCards(this.images),
    };
    this.handleResetGameClick = this.handleResetGameClick.bind(this);
  }
  handleResetGameClick = () => {};

  generateCards = (cardImages: string[]): CardData[] => {
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

  //change function of this to be about changing the state of the cards?
  // state should ideally flow down and only talk up to parents through events
  // if you find you're trying to send other things up, try removing the middleman? handle in parent

  handleCardClick = () => {
    this.setState({ cards: this.generateCards(this.images) });
  };

  render() {
    return (
      <div className={styles.gridAndControlsContainer}>
        <div className={styles.grid}>
          {this.state.cards.map((cardData) => {
            return (
              <Card key={cardData.id} id={cardData.id} image={cardData.image} />
            );
          })}
        </div>
        <Controls onResetGameClick={this.handleResetGameClick} />
      </div>
    );
  }
}

const styles = {
  gridAndControlsContainer: css({
    minHeight: "90%",
    backgroundColor: "#0066b2",
    display: "flex",
    width: "100%",
    padding: "1rem",
    justifyContent: "center",
    alignItems: "center",
  }),
  grid: css({
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "40rem",
    gap: "0.5rem",
    "& img": {
      width: "150px",
    },
  }),
};

//add newGameClick function
