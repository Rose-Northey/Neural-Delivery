import { css } from "@emotion/css";
import { Component } from "react";

type ControlsProps = {
  onResetClick: () => void;
};
export default class Controls extends Component<ControlsProps> {
  moveCount: number;
  constructor(props: ControlsProps) {
    super(props);
    this.moveCount = 3;
  }
  render() {
    return (
      <div className={style.controlsContainer}>
        <div className={style.moveCountContainer}>
          MoveCount:<div className={style.countContainer}>{this.moveCount}</div>
        </div>
        <button onClick={this.props.onResetClick}>New Game</button>
      </div>
    );
  }
}

const style = {
  controlsContainer: css({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#B9D9EB",
    padding: "1rem",
    gap: "1rem",
    height: "100%",
  }),
  countContainer: css({
    fontSize: "2rem",
    color: "#008E97",
  }),
  moveCountContainer: css({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  }),
};
