import { css } from "@emotion/css";
import { Component } from "react";

interface NewCardProps {
  image: string;
  id: number;
}

export default class Card extends Component<NewCardProps> {
  image: string;
  id: number;
  isMatched: boolean;
  isSelected: boolean;

  constructor(props: NewCardProps) {
    super(props);
    this.image = props.image;
    this.id = props.id;
    this.isMatched = true;
    this.isSelected = false;
  }

  render() {
    return (
      <>
        {this.isSelected || this.isMatched ? (
          <img key={this.id} src={this.image} className={this.isMatched ? undefined : style.isSelected} />
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
