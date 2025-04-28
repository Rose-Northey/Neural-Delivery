import { css, cx } from "@emotion/css";
import { colors } from "./colors";
import { GameState } from "./models";

type WinBannerProps = {
    onResetGameClick: () => void;
    onReplayClick: () => void;
    moveCount: number;
};

export default function WinBanner({
    onResetGameClick,
    onReplayClick,
    moveCount,
}: WinBannerProps) {
    return (
        <div className={styles.gameWon}>
            <div className={styles.buttonContainer}>
                <button
                    className={cx(styles.newGameButton, styles.defaultButton)}
                    onClick={onResetGameClick}
                >
                    New Game
                </button>
                <button
                    className={cx(styles.replayButton, styles.defaultButton)}
                    onClick={onReplayClick}
                >
                    Replay
                </button>
            </div>

            <div>
                <div className={styles.winText}>YOU WIN!</div>
                <div
                    className={styles.subHeader}
                >{`And it only took you ${moveCount} moves!`}</div>
            </div>
        </div>
    );
}

const styles = {
    buttonContainer: css({
        display: "flex",
        flexDirection: "column",
        maxWidth: "16rem",
        margin: "2rem",
        gap: "1rem",
    }),
    defaultButton: css({
        width: "100%",
        padding: "2rem",
        "&&:hover": {
            backgroundColor: colors.orange,
        },
    }),
    newGameButton: css({
        fontSize: "3rem",

        border: `5px solid ${colors.lightBlue}`,
        backgroundColor: colors.lightBlue,
    }),
    replayButton: css({
        fontSize: "1rem",
    }),
    gameWon: css({
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `${colors.blackBlue}bb`,
        color: colors.lightBlue,
        fontWeight: "bold",
    }),
    winText: css({
        fontSize: "10rem",
        color: colors.orange,
    }),

    subHeader: css({
        fontSize: "3.15rem",
        marginTop: "1rem",
    }),
};
