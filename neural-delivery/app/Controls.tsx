import { css } from "@emotion/css";
import { Component } from "react";

export default class Controls extends Component {
  moveCount: number;
  constructor(props: number) {
    super(props);
    this.moveCount = 3;
  }
  render() {
    return (
      <div className={controlsContainer}>
        MoveCount:{this.moveCount}
        <button>New Game</button>
      </div>
    );
  }
}

const controlsContainer = css({
  display: "flex",
  flexDirection: "column",
});
