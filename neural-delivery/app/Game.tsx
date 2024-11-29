import { Component } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { css } from "@emotion/css";

type GameProps = {};

type GameState = {
  numberOfMoves: number;
  resetGrid: boolean;
};

export default class Game extends Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);
    this.state = {
      numberOfMoves: 0,
      resetGrid: false,
    };
    this.handleResetGameClick = this.handleResetGameClick.bind(this);
  }
  handleResetGameClick = () => {
    this.setState({ resetGrid: true }, () =>
      this.setState({
        resetGrid: false,
      })
    );
  };

  render() {
    const images = [
      "/images/blackCat.jpg",
      "/images/horse.jpg",
      "/images/box.jpg",
      "/images/uke.jpg",
      "/images/plant.jpg",
      "/images/duck.jpg",
    ];
    return (
      <div className={gridAndControlsContainer}>
        <Grid images={images} resetGrid={this.state.resetGrid} />
        <Controls onResetGameClick={this.handleResetGameClick} />
      </div>
    );
  }
}

const gridAndControlsContainer = css({
  minHeight: "90%",
  backgroundColor: "#0066b2",
  display: "flex",
  width: "100%",
  padding: "1rem",
  justifyContent: "center",
  alignItems: "center",
});

//add newGameClick function
