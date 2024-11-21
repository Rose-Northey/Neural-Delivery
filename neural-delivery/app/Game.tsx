import { Component } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { css } from "@emotion/css";

export default class Game extends Component {
  render() {
    const images = ["/images/blackCat.jpg", "/images/horse.jpg", "/images/box.jpg", "/images/uke.jpg", "/images/plant.jpg", "/images/duck.jpg"];
    return (
      <div className={gridAndControlsContainer}>
        <Grid images={images} />
        <Controls />
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
