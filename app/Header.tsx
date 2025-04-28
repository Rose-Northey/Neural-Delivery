import { css } from "@emotion/css";
import { Component } from "react";
import { colors } from "./colors";

export default class Header extends Component {
    render() {
        return (
            <div className={headerContainer}>
                <h1>Neural Delivery</h1>
                <p>
                    Train your memory and never embarrass yourself at a potluck
                    again
                </p>
            </div>
        );
    }
}

const headerContainer = css({
    height: "15%",
    backgroundColor: colors.darkBlue,
    color: colors.lightBlue,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    gap: "1rem",
});
