import { css } from "@emotion/css";
import { Component } from "react";

interface NewCardProps {
  image: string;
  id: number;
  onCardClick: (cardId: number) => void;
  isSelected: boolean;
  isMatched: boolean;
}

export default class Card extends Component<NewCardProps> {
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

  resetCard = () => {
    this.setState({ isSelected: false, isMatched: false });
  };

  render() {
    return (
      <>
        <div onClick={() => this.props.onCardClick(this.id)}>
          {this.props.isSelected || this.props.isMatched ? (
            <img
              key={this.id}
              src={this.image}
              className={this.props.isMatched ? undefined : style.isSelected}
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
