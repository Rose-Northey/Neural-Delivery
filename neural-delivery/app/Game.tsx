import Controls from "./Controls";
import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import Card from "./Card";
import WinBanner from "./WinBanner";
import { colors } from "./colors";
import DifficultySelect from "./DifficultySelect";
import shuffleItems from "./shuffleItems";
import { postGames } from "./apiFunctions";
import { CardData, GameState } from "./models";
import { allImagesAndIds } from "./allImagesAndIds";

interface GameProps {
    initialGameState?: GameState;
    initialCards?: CardData[];
    initialUserMoves?: number[];
    isScientistView?: boolean;
}

export default function Game({
    initialGameState = GameState.difficultyNotSelected,
    initialUserMoves = [],
    initialCards = [],
    isScientistView = false,
}: GameProps) {
    const [cards, setCards] = useState<CardData[]>(initialCards);
    const [gameState, setGameState] = useState<GameState>(initialGameState);
    const [userMoves, setUserMoves] = useState<number[]>(initialUserMoves);
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
            if (gameState === GameState.isInStaticScientistView) {
                revealAllCards();
            }
        }
        winSequence();
    }, [gameState]);

    useEffect(() => {
        async function winSequence() {
            if (gameState === GameState.inProgress && determineIfIsWon()) {
                await pause(500);
                await postGames(findCurrentDifficulty(), userMoves, cards);
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
        } else if (cards.length === 20) {
            return "hard";
        }
        return "unknown";
    }

    function generateCards(numberofCards = cards.length) {
        const numberOfCardPairs = numberofCards / 2;

        const imagesInThisRound = shuffleItems(allImagesAndIds).slice(
            0,
            numberOfCardPairs
        );
        let idCounter = 0;
        const newCards: CardData[] = [];
        imagesInThisRound.forEach((imageData) => {
            const cardData1 = {
                image: imageData.image,
                imageId: imageData.imageIds[0],
                isMatched: false,
                isSelected: false,
            };
            idCounter++;
            const cardData2 = {
                image: imageData.image,
                imageId: imageData.imageIds[1],
                isMatched: false,
                isSelected: false,
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
                if (card.imageId === cardId) {
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

    function revealAllCards() {
        setCards((prevCards) =>
            prevCards.map((card) => {
                return { ...card, isMatched: true };
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
            (card) => card.imageId === currentCardId
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
                              styles(gameState, isScientistView).gameContainer
                                  .winState,
                              styles(gameState, isScientistView).gameContainer
                                  .default
                          )
                        : styles(gameState, isScientistView).gameContainer
                              .default
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
                <div
                    className={
                        styles(gameState, isScientistView)
                            .gridAndControlsContainer
                    }
                >
                    <div
                        className={
                            styles(gameState, isScientistView).grid.default
                        }
                    >
                        {cards.map((cardData) => {
                            return (
                                <Card
                                    key={cardData.imageId}
                                    onUnknownCardClick={handleUnknownCardClick}
                                    imageId={cardData.imageId}
                                    image={cardData.image}
                                    isSelected={cardData.isSelected}
                                    isMatched={cardData.isMatched}
                                    isInReplayMode={
                                        gameState === GameState.isInReplay
                                    }
                                    numberInDeck={cards.length}
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

const styles = (gameState: GameState, isScientistView: boolean) => {
    return {
        gameContainer: {
            default: css({
                height: "85%",
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
                    display: isScientistView ? "" : "none",
                },
            }),
        },

        gridAndControlsContainer: css({
            display:
                gameState === GameState.difficultyNotSelected ? "none" : "flex",
            padding: isScientistView ? "0.2rem" : "1rem",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
            width: "100%",
        }),
        grid: {
            default: css({
                display: "flex",
                flexWrap: "wrap",
                gap: isScientistView ? "0.1rem" : "0.5rem",
                justifyContent: "center",
                maxHeight: "100%",
                minWidth: isScientistView ? "100%" : "40%",
            }),
        },
    };
};
