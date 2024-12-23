import shuffleItems from "./shuffleItems";
import { CardData } from "./Game";

type DifficultySelectProps = {
    onDifficultySelectionClick: (difficulty: number) => void;
};

enum ImagePairsPerDifficulty {
    easy = 6,
    medium = 8,
    hard = 10,
}

export default function DifficultySelect(props: DifficultySelectProps) {
    return (
        <div>
            <button onClick={() => props.onDifficultySelectionClick(12)}>
                Easy
            </button>
            <button onClick={() => props.onDifficultySelectionClick(16)}>
                Medium
            </button>
            <button onClick={() => props.onDifficultySelectionClick(20)}>
                Hard
            </button>
        </div>
    );
}

// difficulty is selected
// number of cards is sent to game
//

// every time newGame is hit the images are randomized
// every time
