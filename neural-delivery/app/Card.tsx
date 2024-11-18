import { Component } from "react";

export default class Card extends Component {
  moveCount: number;
  constructor(props: number) {
    super(props);
    this.moveCount = 3;
  }
  render() {
    return (
      <>
        <img src="/images/unknown.jpg" />
      </>
    );
  }
}
