import Controls from "./Controls";
import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import Card from "./Card";
import WinBanner from "./WinBanner";
import { colors } from "./colors";
import DifficultySelect from "./DifficultySelect";
import shuffleItems from "./shuffleItems";
import {
    getMemoryItems,
    getMemoryItemsById,
    postMemoryItems,
} from "./apiFunctions";

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

const allImageIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
];

// blackcat is 1 and 2 -> ids
export default function Game() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [gameState, setGameState] = useState<GameState>(
        GameState.difficultyNotSelected
    );
    const [userMoves, setUserMoves] = useState<number[]>([]);
    const [replayIndex, setReplayIndex] = useState<number>(-1);

    async function pause(milliseconds: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }

    useEffect(() => {
        async function winSequence() {
            if (gameState === GameState.inProgress && determineIfIsWon()) {
                await pause(500);
                await postMemoryItems(
                    findCurrentDifficulty(),
                    userMoves,
                    cards
                );
                setGameState(GameState.isWon);
            }
        }
        winSequence();
    }, [userMoves]);

    useEffect(() => {
        async function simulateUserClick() {
            if (gameState === GameState.isInReplay) {
                await handleUnknownCardClick(userMoves[replayIndex]);

                if (replayIndex < userMoves.length) {
                    setReplayIndex((prev) => prev + 1);
                } else if (replayIndex === userMoves.length) {
                    setGameState(GameState.isWon);
                }
            }
        }
        simulateUserClick();
    }, [replayIndex]);

    function findCurrentDifficulty(): string {
        if (cards.length === 4) {
            return "easiest";
        } else if (cards.length === 12) {
            return "easy";
        } else if (cards.length === 16) {
            return "medium";
        } else if (cards.length === 12) {
            return "hard";
        }
        return "unknown";
    }

    function generateCards(numberofCards = cards.length) {
        const numberOfCardPairs = numberofCards / 2;
        // first it gives me the right number of images
        // then I assign Ids to them

        const imagesInThisRound = shuffleItems(allImages).slice(
            0,
            numberOfCardPairs
        );
        let idCounter = 0;
        const newCards: CardData[] = [];
        imagesInThisRound.forEach((image) => {
            // find what number the image is within the array
            // assign ids after they are shuffled
            const firstImageId = allImages.findIndex((img) => img === image);
            const cardData1 = {
                imageId: firstImageId,
            };
            idCounter++;
            const cardData2 = {
                imageId: firstImageId + 1,
            };
            idCounter++;
            newCards.push(cardData1, cardData2);
        });
        shuffleItems(newCards).map((cardData, i) => {
            cardData.isMatched = false;
            cardData.isSelected = false;
            cardData.positionId = i;
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

    function unmatchAllCards() {
        setCards((prevCards) =>
            prevCards.map((card) => {
                return { ...card, isMatched: false };
            })
        );
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
            await pause(600);

            if (previouslySelectedCards[0].image === currentSelectedImage) {
                await pause(300);
                markPreviousAndCurrentCardsAsMatched(
                    previouslySelectedCards[0].image
                );
                if (gameState === GameState.isInReplay) {
                    await pause(200);
                }
            } else {
                await pause(300);
                unselectAllCards();
                await pause(800);
            }

            if (gameState === GameState.inProgress) {
                setUserMoves((prev) => [...prev, currentCardId]);
            }
        } else {
            markCurrentCardAsSelected(currentCardId);
            await pause(600);
            if (gameState === GameState.inProgress) {
                setUserMoves((prev) => [...prev, currentCardId]);
            }
        }
    }

    async function handleResetGameClick() {
        setUserMoves([]);
        setGameState(GameState.inProgress);
        unmatchAllCards();
        await pause(800);
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

    const handleReplayClick = async () => {
        setGameState(GameState.isInReplay);
        unmatchAllCards();
        await pause(800);
        setReplayIndex(0);
    };

    return (
        <>
            <div
                className={
                    gameState === GameState.isWon ||
                    gameState === GameState.isInReplay
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
                                    isInReplayMode={
                                        gameState === GameState.isInReplay
                                    }
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
            transition: "background-color 0.5s ease",
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
