export type CardData = {
    image: string;
    imageId: number;
    isMatched: boolean;
    isSelected: boolean;
};
export type emptyCardData = {
    imageId: number;
};

export enum GameState {
    difficultyNotSelected,
    inProgress,
    isWon,
    isInReplay,
    isInStaticScientistView,
}
