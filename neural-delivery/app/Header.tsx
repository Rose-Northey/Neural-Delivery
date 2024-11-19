import { css } from "@emotion/css";
import { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className={headerContainer}>
        <h1>Neural Delivery</h1>
        <p>Train your memory and never embarrass yourself at a potluck again</p>
      </div>
    );
  }
}

const headerContainer = css({
  backgroundColor: "#002244",
  color: "#B9D9EB",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  gap: "1rem",
});
