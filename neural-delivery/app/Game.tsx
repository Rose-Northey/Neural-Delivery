import Controls from "./Controls";
import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import Card from "./Card";
import WinBanner from "./WinBanner";
import { colors } from "./colors";
import DifficultySelect from "./DifficultySelect";
import shuffleItems from "./shuffleItems";

export type CardData = {
    image: string;
    isMatched: boolean;
    isSelected: boolean;
    id: number;
};

export enum GameState {
    difficultyNotSelected,
    inProgress,
    isWon,
    isInReplay,
}

const allImages = [
    "/images/blackCat.jpg",
    "/images/horse.jpg",
    "/images/box.jpg",
    "/images/uke.jpg",
    "/images/plant.jpg",
    "/images/duck.jpg",
    "/images/capybara.jpg",
    "/images/midnight.jpg",
    "/images/tomato.jpg",
    "/images/toothbrush.jpg",
    "/images/boredom.jpg",
    "/images/alligator.jpg",
];

export default function Game() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [gameState, setGameState] = useState<GameState>(
        GameState.difficultyNotSelected
    );
    const [userMoves, setUserMoves] = useState<number[]>([]);
    const [replayIndex, setReplayIndex] = useState<number | undefined>();

    async function pause(milliseconds: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }

    useEffect(() => {
        if (gameState === GameState.inProgress && determineIfIsWon()) {
            setGameState(GameState.isWon);
        }
    }, [userMoves]);

    useEffect(() => {
        async function simulateUserClick() {
            if (
                typeof replayIndex === "number" &&
                replayIndex < userMoves.length
            ) {
                if (replayIndex === 0) {
                    await pause(1000);
                }
                await handleUnknownCardClick(userMoves[replayIndex]);
                if (replayIndex % 2 != 0) {
                    await pause(1000);
                }
                setReplayIndex((prev) => prev! + 1);
            }
        }
        simulateUserClick();
    }, [replayIndex]);
    // maybe look into useQuery or something???

    function generateCards(numberofCards = cards.length) {
        const numberOfCardPairs = numberofCards / 2;
        const imagesInThisRound = shuffleItems(allImages).slice(
            0,
            numberOfCardPairs
        );
        let idCounter = 0;
        const newCards: CardData[] = [];
        imagesInThisRound.forEach((image) => {
            const cardData1 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: idCounter,
            };
            idCounter++;
            const cardData2 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: idCounter,
            };
            idCounter++;
            newCards.push(cardData1, cardData2);
        });
        setCards(shuffleItems(newCards));
    }

    function markPreviousAndCurrentCardsAsMatched(matchedImage: string) {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.image === matchedImage) {
                    return { ...card, isMatched: true, isSelected: false };
                }
                return card;
            })
        );
    }

    function markCurrentCardAsSelected(cardId: number) {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.id === cardId) {
                    return { ...card, isSelected: true };
                }
                return card;
            })
        );
    }

    async function unmatchAllCards(): Promise<void> {
        setCards((prevCards) =>
            prevCards.map((card) => {
                return { ...card, isMatched: false };
            })
        );
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 800);
        });
    }
    function unselectAllCards() {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.isSelected === true) {
                    return { ...card, isSelected: false };
                }
                return card;
            })
        );
    }

    async function handleUnknownCardClick(currentCardId: number) {
        const currentSelectedImage = cards.find(
            (card) => card.id === currentCardId
        )?.image;
        const previouslySelectedCards = cards.filter(
            (card) => card.isSelected === true
        );
        if (previouslySelectedCards.length >= 2) {
            return;
        }

        if (previouslySelectedCards.length === 1) {
            markCurrentCardAsSelected(currentCardId);
            await pause(1000);

            if (previouslySelectedCards[0].image === currentSelectedImage) {
                markPreviousAndCurrentCardsAsMatched(
                    previouslySelectedCards[0].image
                );
            } else {
                unselectAllCards();
            }

            if (gameState === GameState.inProgress) {
                setUserMoves((prev) => [...prev, currentCardId]);
            }
            if (gameState === GameState.isInReplay) {
                setReplayIndex((prev) => prev ?? 0 + 1);
            }
        } else {
            markCurrentCardAsSelected(currentCardId);
            await pause(300);
            if (gameState === GameState.inProgress) {
                setUserMoves((prev) => [...prev, currentCardId]);
            }
            if (gameState === GameState.isInReplay) {
                setReplayIndex((prev) => prev ?? 0 + 1);
            }
        }
    }

    async function handleResetGameClick() {
        setUserMoves([]);
        setGameState(GameState.inProgress);
        await unmatchAllCards();
        generateCards();
    }

    function onDifficultySelectionClick(numberOfCards: number) {
        setGameState(GameState.inProgress);
        generateCards(numberOfCards);
    }
    const determineIfIsWon = () => {
        if (cards.length) {
            return cards.every((card) => card.isMatched);
        }
        return false;
    };

    const finishGamePrematurely = () => {
        setUserMoves([]);
        setCards([]);
    };

    const handleChangeDifficultyClick = () => {
        finishGamePrematurely();
        setGameState(GameState.difficultyNotSelected);
    };

    const handleReplayClick = () => {
        setGameState(GameState.isInReplay);
        unmatchAllCards();
        setReplayIndex(0);
    };

    return (
        <>
            <div
                className={
                    determineIfIsWon()
                        ? cx(
                              styles.gameContainer.winState,
                              styles.gameContainer.default
                          )
                        : styles.gameContainer.default
                }
            >
                <DifficultySelect
                    onDifficultySelectionClick={onDifficultySelectionClick}
                    gameState={gameState}
                />
                <WinBanner
                    onResetGameClick={handleResetGameClick}
                    onReplayClick={handleReplayClick}
                    moveCount={Math.floor(userMoves.length / 2)}
                    gameState={gameState}
                />
                <div className={styles.gridAndControlsContainer}>
                    <div className={styles.grid.default}>
                        {cards.map((cardData) => {
                            return (
                                <Card
                                    key={cardData.id}
                                    onUnknownCardClick={handleUnknownCardClick}
                                    id={cardData.id}
                                    image={cardData.image}
                                    isSelected={cardData.isSelected}
                                    isMatched={cardData.isMatched}
                                />
                            );
                        })}
                    </div>

                    <Controls
                        onChangeDifficultyClick={handleChangeDifficultyClick}
                        onResetGameClick={handleResetGameClick}
                        moveCount={Math.floor(userMoves.length / 2)}
                        gameState={gameState}
                    />
                </div>
            </div>
        </>
    );
}

const styles = {
    gameContainer: {
        default: css({
            minHeight: "90%",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.midBlue,
        }),
        winState: css({
            "&&": {
                backgroundColor: colors.blackBlue,
            },
        }),
    },

    gridAndControlsContainer: css({
        display: "flex",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
        height: "90%",
    }),
    grid: {
        default: css({
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            maxWidth: "630px",
        }),
    },
    controls: {
        winState: css({
            display: "hidden",
        }),
    },
};

// offer the replay button when the user has won
