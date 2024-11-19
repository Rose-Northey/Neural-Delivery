import { css } from "@emotion/css";
import { Component } from "react";

export default class Card extends Component {
  image: string;
  isMatched: boolean;
  isSelected: boolean;
  constructor(props: number, image: string) {
    super(props);
    // this.image = image;
    this.image = "/images/duck.jpg";
    this.isMatched = true;
    this.isSelected = false;
  }

  render() {
    return (
      <>
        {this.isSelected || this.isMatched ? (
          <img src={this.image} className={this.isMatched ? undefined : style.isSelected} />
        ) : (
          <img src="/images/unknown.jpg" />
        )}
      </>
    );
  }
}
const style = {
  isSelected: css({
    opacity: "75%",
    boxShadow: "0 0 0 2px #FEBE10",
  }),
};

// cards have an imageSource and this also acts as a unique ID
