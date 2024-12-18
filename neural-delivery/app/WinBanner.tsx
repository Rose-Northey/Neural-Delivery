import { css } from "@emotion/css";

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
            <button onClick={onResetGameClick}>New Game</button>
            <div>
                <div>YOU WIN!</div>
                <div>{`And it only took you ${moveCount} moves!`}</div>
            </div>
        </div>
    );
}

const styles = {
    gameWon: css({
        width: "100%",
        height: "90%",
        position: "absolute",
        zIndex: "4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffFFdd",
    }),
    notWonYet: css({
        display: "none",
    }),
};
