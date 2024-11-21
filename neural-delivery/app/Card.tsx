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
    this.isMatched = false;
    this.isSelected = true;
  }

  render() {
    return (
      <>
        {this.isSelected || this.isMatched ? (
          <img key={this.id} src={this.image} className={this.isMatched ? undefined : style.isSelected} />
        ) : (
          <img className={style.isUnknown} src="/images/unknown.jpg" />
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
  isUnknown: css({
    "&:hover": { boxShadow: "0 0 0 2px #7d90a1" },
  }),
};

// cards have an imageSource and this also acts as a unique ID
