import shuffleItems from "./shuffleItems";
import { CardData } from "./Game";

type DifficultySelectProps = {
    areCardImagesSelected: boolean;
    onDifficultySelectionClick: (difficulty: string) => {};
};

export default function DifficultySelect(props: DifficultySelectProps) {
    return (
        <div>
            <button onClick={() => props.onDifficultySelectionClick("easy")}>
                Easy
            </button>
            <button>Medium</button>
            <button>Hard</button>
        </div>
    );
}
