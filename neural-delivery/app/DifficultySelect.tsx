import { css } from "@emotion/css";
import { colors } from "./colors";
import { GameState } from "./Game";

type DifficultySelectProps = {
    gameState: GameState;
    onDifficultySelectionClick: (numberOfCards: number) => void;
};
// only display if
export default function DifficultySelect({
    gameState,
    onDifficultySelectionClick,
}: DifficultySelectProps) {
    return (
        <div
            className={
                gameState === GameState.difficultyNotSelected
                    ? styles.difficultyNotSelected
                    : styles.difficultySelected
            }
        >
            <button onClick={() => onDifficultySelectionClick(4)}>
                Easiest
            </button>
            <button onClick={() => onDifficultySelectionClick(12)}>Easy</button>
            <button onClick={() => onDifficultySelectionClick(16)}>
                Medium
            </button>
            <button onClick={() => onDifficultySelectionClick(20)}>Hard</button>
        </div>
    );
}

const styles = {
    difficultyNotSelected: css({
        display: "flex",
        gap: "1rem",
        "&>button": {
            backgroundColor: colors.lightBlue,
            padding: "1rem",
            width: "7rem",
        },
    }),
    difficultySelected: css({
        display: "none",
    }),
};
