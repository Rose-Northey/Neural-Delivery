import { css } from "@emotion/css";
import { Component } from "react";

interface NewCardProps {
  image: string;
  id: number;
  onUnknownCardClick: (cardId: number, image: string) => void;
  isSelected: boolean;
  isMatched: boolean;
}

export default class Card extends Component<NewCardProps> {
  constructor(props: NewCardProps) {
    super(props);
    this.state = {
      isMatched: false,
      isSelected: false,
    };
  }

  render() {
    return (
      <>
        {this.props.isSelected || this.props.isMatched ? (
          <img
            key={this.props.id}
            src={this.props.image}
            className={this.props.isMatched ? undefined : style.isSelected}
          />
        ) : (
          <img
            onClick={() =>
              this.props.onUnknownCardClick(this.props.id, this.props.image)
            }
            className={style.isUnknown}
            src="/images/unknown.jpg"
          />
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
