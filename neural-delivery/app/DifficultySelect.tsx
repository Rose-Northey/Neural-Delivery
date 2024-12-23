import shuffleItems from "./shuffleItems";
import { CardData } from "./Game";

type DifficultySelectProps = {
    onDifficultySelectionClick: (
        difficulty: "easy" | "medium" | "hard"
    ) => void;
};

export default function DifficultySelect(props: DifficultySelectProps) {
    return (
        <div>
            <button onClick={() => props.onDifficultySelectionClick("easy")}>
                Easy
            </button>
            <button onClick={() => props.onDifficultySelectionClick("medium")}>
                Medium
            </button>
            <button onClick={() => props.onDifficultySelectionClick("hard")}>
                Hard
            </button>
        </div>
    );
}
