import { Component } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { css } from "@emotion/css";

export default class Game extends Component {
  render() {
    return (
      <div className={gridAndControlsContainer}>
        <Grid />
        <Controls />
      </div>
    );
  }
}

const gridAndControlsContainer = css({
  display: "flex",
  width: "100%",
});
