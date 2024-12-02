import { css } from "@emotion/css";
import { Component } from "react";

interface NewCardProps {
  image: string;
  id: number;
}

type CardState = {
  isMatched: boolean;
  isSelected: boolean;
};

export default class Card extends Component<NewCardProps, CardState> {
  image: string;
  id: number;

  constructor(props: NewCardProps) {
    super(props);
    this.image = props.image;
    this.id = props.id;
    this.state = {
      isMatched: false,
      isSelected: false,
    };
  }

  handleCardClick = () => {
    this.setState({ isSelected: true });
  };

  resetCard = () => {
    this.setState({ isSelected: false, isMatched: false });
  };

  render() {
    return (
      <>
        <div onClick={this.handleCardClick}>
          {this.state.isSelected || this.state.isMatched ? (
            <img
              key={this.id}
              src={this.image}
              className={this.state.isMatched ? undefined : style.isSelected}
            />
          ) : (
            <img className={style.isUnknown} src="/images/unknown.jpg" />
          )}
        </div>
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
