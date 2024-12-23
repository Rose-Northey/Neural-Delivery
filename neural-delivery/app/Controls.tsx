import { css } from "@emotion/css";
import { colors } from "./colors";
import { GameState } from "./Game";

type ControlsProps = {
    onChangeDifficultyClick: () => void;
    onResetGameClick: () => void;
    moveCount: number;
    gameState: GameState;
};

export default function Controls({
    onChangeDifficultyClick,
    onResetGameClick,
    moveCount,
    gameState,
}: ControlsProps) {
    return (
        <div
            className={
                gameState === GameState.inProgress
                    ? styles.gameInProgress
                    : styles.gameNotInProgress
            }
        >
            <div className={styles.moveCountContainer}>
                MoveCount:
                <div className={styles.countContainer}>{moveCount}</div>
            </div>
            <button onClick={onResetGameClick}>New Game</button>
            <button onClick={onChangeDifficultyClick}>Change Difficulty</button>
        </div>
    );
}

const styles = {
    gameNotInProgress: css({
        display: "none",
    }),
    gameInProgress: css({
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
