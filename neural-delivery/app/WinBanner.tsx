import { css } from "@emotion/css";
import { colors } from "./colors";

type WinBannerProps = {
    onResetGameClick: () => void;
    moveCount: number;
    isGameWon: boolean;
};

export default function WinBanner({
    onResetGameClick,
    moveCount,
    isGameWon,
}: WinBannerProps) {
    return (
        <div className={isGameWon ? styles.gameWon : styles.notWonYet}>
            <button className={styles.newGameButton} onClick={onResetGameClick}>
                New Game
            </button>
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
    newGameButton: css({
        height: "12rem",
        width: "16rem",
        margin: "2rem",
        fontSize: "3rem",
        padding: "2rem",
        border: `5px solid ${colors.lightBlue}`,
        backgroundColor: colors.lightBlue,
        "&&:hover": {
            backgroundColor: colors.orange,
        },
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
    notWonYet: css({
        display: "none",
        fontSize: "9rem",
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
