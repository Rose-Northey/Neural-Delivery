type DifficultySelectProps = {
    onDifficultySelectionClick: (numberOfCards: number) => void;
};

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
