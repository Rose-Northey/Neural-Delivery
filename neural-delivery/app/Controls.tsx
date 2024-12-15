import { css } from "@emotion/css";
import { Component } from "react";

type ControlsProps = {
    onResetGameClick: () => void;
    moveCount: number;
};

export default function Controls({
    onResetGameClick,
    moveCount,
}: ControlsProps) {
    return (
        <div className={style.controlsContainer}>
            <div className={style.moveCountContainer}>
                MoveCount:
                <div className={style.countContainer}>{moveCount}</div>
            </div>
            <button onClick={onResetGameClick}>New Game</button>
        </div>
    );
}

export class ControlsClass extends Component<ControlsProps> {
    constructor(props: ControlsProps) {
        super(props);
    }
    render() {
        return (
            <div className={style.controlsContainer}>
                <div className={style.moveCountContainer}>
                    MoveCount:
                    <div className={style.countContainer}>
                        {this.props.moveCount}
                    </div>
                </div>
                <button onClick={this.props.onResetGameClick}>New Game</button>
            </div>
        );
    }
}

const style = {
    controlsContainer: css({
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#B9D9EB",
        padding: "1rem",
        gap: "1rem",
        height: "100%",
        margin: "1rem",
    }),
    countContainer: css({
        fontSize: "2rem",
        color: "#008E97",
        width: "4rem",
        textAlign: "center",
    }),
    moveCountContainer: css({
        display: "flex",
        alignItems: "center",
    }),
};
