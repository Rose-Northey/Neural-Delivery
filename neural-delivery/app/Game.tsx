import { useEffect } from "react";
import Controls from "./Controls";
import { css, cx } from "@emotion/css";
import shuffleCards from "./shuffleCards";
import { useState } from "react";

import Card from "./Card";
import WinBanner from "./WinScreen";

export type CardData = {
    image: string;
    isMatched: boolean;
    isSelected: boolean;
    id: number;
};

function generateCards(cardImages: string[]): CardData[] {
    let idCounter = 0;
    const newStack: CardData[] = [];
    cardImages.forEach((image) => {
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
        newStack.push(cardData1, cardData2);
    });
    return newStack;
}

export default function Game() {
    const easyImages = [
        "/images/blackCat.jpg",
        "/images/horse.jpg",
        "/images/box.jpg",
        "/images/uke.jpg",
        "/images/plant.jpg",
        "/images/duck.jpg",
    ];
    const mediumImages = [
        "/images/blackCat.jpg",
        "/images/horse.jpg",
        "/images/box.jpg",
        "/images/uke.jpg",
        "/images/plant.jpg",
        "/images/duck.jpg",
        "/images/plant.jpg",
        "/images/duck.jpg",
    ];
    const hardImages = [
        "/images/blackCat.jpg",
        "/images/horse.jpg",
        "/images/box.jpg",
        "/images/uke.jpg",
        "/images/plant.jpg",
        "/images/duck.jpg",
        "/images/box.jpg",
        "/images/uke.jpg",
        "/images/plant.jpg",
        "/images/duck.jpg",
    ];
    const [images, setImages] = useState(easyImages);
    const [cards, setCards] = useState<CardData[]>(generateCards(images));
    const [moveCount, setMoveCount] = useState<number>(0);
    const [isGameWon, setIsGameWon] = useState<boolean>(false);
    useEffect(() => {
        setCards((prevCards) => shuffleCards(prevCards));
    }, []);
    useEffect(() => {
        if (determineIfIsWon()) {
            setIsGameWon(true);
        }
    }, cards);

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

    function handleUnknownCardClick(
        currentCardId: number,
        currentCardImage: string
    ) {
        const previouslySelectedCards = cards.filter(
            (card) => card.isSelected === true
        );
        if (previouslySelectedCards.length >= 2) {
            return;
        }
        markCurrentCardAsSelected(currentCardId);

        if (previouslySelectedCards.length === 0) {
            setMoveCount((prev) => prev + 1);
        } else {
            setTimeout(() => {
                if (previouslySelectedCards[0].image === currentCardImage) {
                    markPreviousAndCurrentCardsAsMatched(
                        previouslySelectedCards[0].image
                    );
                } else {
                    unselectAllCards();
                }
            }, 1000);
        }
    }
    function handleResetGameClick() {
        unmatchAllCards();
        setIsGameWon(false);
        setTimeout(() => {
            setMoveCount(0);
            setCards((prev) => shuffleCards(prev));
        }, 800);
    }
    const determineIfIsWon = () => true; //cards.every((card) => card.isMatched);

    return (
        <>
            <div className={styles.gameContainer}>
                <WinBanner
                    onResetGameClick={handleResetGameClick}
                    moveCount={moveCount}
                    isGameWon={isGameWon}
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
                    <div className={isGameWon ? styles.controls.winState : ""}>
                        <Controls
                            onResetGameClick={handleResetGameClick}
                            moveCount={moveCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    gameContainer: css({
        minHeight: "90%",
        width: "100%",
        position: "relative",

        backgroundColor: "#0066b2",
    }),
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
