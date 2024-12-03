import { css } from "@emotion/css";
import { Component } from "react";

type ControlsProps = {
  onResetGameClick: () => void;
  moveCount: number;
};
export default class Controls extends Component<ControlsProps> {
  constructor(props: ControlsProps) {
    super(props);
  }
  render() {
    return (
      <div className={style.controlsContainer}>
        <div className={style.moveCountContainer}>
          MoveCount:
          <div className={style.countContainer}>{this.props.moveCount}</div>
        </div>
        <button onClick={this.props.onResetGameClick}>New Game</button>
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
