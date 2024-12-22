import { css } from "@emotion/css";
import { colors } from "./colors";

type ControlsProps = {
    onResetGameClick: () => void;
    moveCount: number;
    isGameWon: boolean;
};

export default function Controls({
    onResetGameClick,
    moveCount,
    isGameWon,
}: ControlsProps) {
    return (
        <div className={isGameWon ? styles.winState : styles.controlsContainer}>
            <div className={styles.moveCountContainer}>
                MoveCount:
                <div className={styles.countContainer}>{moveCount}</div>
            </div>
            <button onClick={onResetGameClick}>New Game</button>
        </div>
    );
}

const styles = {
    winState: css({
        visibility: "hidden",
    }),
    controlsContainer: css({
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.lightBlue,
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
