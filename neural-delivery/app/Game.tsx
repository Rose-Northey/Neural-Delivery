import { Component } from "react";
import Controls from "./Controls";
import { css } from "@emotion/css";
import shuffleCards from "./shuffleCards";

import Card from "./Card";

type GameProps = {};

export type CardData = {
    image: string;
    isMatched: boolean;
    isSelected: boolean;
    id: number;
};

type GameState = {
    moveCount: number;
    cards: CardData[];
    winConditionMet: boolean;
};

export default class Game extends Component<GameProps, GameState> {
    images: string[];
    cards: CardData[];
    constructor(props: GameProps) {
        super(props);
        this.images = [
            "/images/blackCat.jpg",
            "/images/horse.jpg",
            // "/images/box.jpg",
            // "/images/uke.jpg",
            // "/images/plant.jpg",
            // "/images/duck.jpg",
        ];
        this.cards = this.generateCards(this.images);
        console.log(this.cards);
        this.state = {
            moveCount: 0,
            cards: this.cards,
            winConditionMet: false,
        };
        this.handleResetGameClick = this.handleResetGameClick.bind(this);
    }

    handleResetGameClick = () => {
        const newCards = this.generateCards(this.images);
        console.log(newCards);
        this.setState({
            winConditionMet: false,
            moveCount: 0,
            cards: newCards,
        });
    };

    generateCards = (cardImages: string[]): CardData[] => {
        const newStack: CardData[] = [];
        cardImages.forEach((image) => {
            const cardData1 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: newStack.length,
            };
            const cardData2 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: newStack.length + 1,
            };
            newStack.push(cardData1, cardData2);
        });

        return shuffleCards(newStack);
    };

    handleUnknownCardClick = (
        currentCardId: number,
        currentCardImage: string
    ) => {
        const allSelectedCards = this.state.cards.filter(
            (card) => card.isSelected === true
        );

        if (allSelectedCards.length < 2) {
            const previousCard = allSelectedCards[0];
            this.markCurrentCardAsSelected(currentCardId);
            if (previousCard) {
                setTimeout(() => {
                    if (previousCard.image === currentCardImage) {
                        this.markPreviousAndCurrentCardsAsMatched(
                            previousCard.image
                        );
                    } else {
                        this.unselectAllCards();
                    }
                }, 1000);
            } else {
                this.increaseMoveCount();
            }
        }
        this.checkIfWinConditionMet();
    };

    markCurrentCardAsSelected = (cardId: number) => {
        this.setState((prevState) => {
            const updatedCards = prevState.cards.map((card) => {
                if (card.id === cardId) {
                    return { ...card, isSelected: true };
                }
                return card;
            });
            return { ...prevState, cards: updatedCards };
        });
    };

    checkIfWinConditionMet = () => {
        const winConditionMet =
            this.state.cards.filter((card) => {
                return !card.isMatched;
            }).length === 0;

        if (winConditionMet) {
            this.setState((prevState) => ({
                ...prevState,
                winConditionMet: true,
            }));
        }
    };

    unselectAllCards = () => {
        this.setState((prevState) => {
            const updatedCards = prevState.cards.map((card) => {
                if (card.isSelected === true) {
                    return { ...card, isSelected: false };
                }
                return card;
            });
            return {
                ...prevState,
                cards: updatedCards,
            };
        });
    };

    markPreviousAndCurrentCardsAsMatched = (matchedImage: string) => {
        this.setState((prevState) => {
            const updatedCards = prevState.cards.map((card) => {
                if (card.image === matchedImage) {
                    return { ...card, isMatched: true, isSelected: false };
                }
                return card;
            });
            return {
                ...prevState,
                cards: updatedCards,
            };
        });
    };

    increaseMoveCount = () => {
        this.setState((prevState) => {
            return { ...prevState, moveCount: prevState.moveCount + 1 };
        });
    };

    render() {
        return (
            <>
                <div
                    className={
                        this.state.winConditionMet ? "" : styles.notWonYet
                    }
                >
                    YOU WIN!
                </div>
                <div className={styles.gridAndControlsContainer}>
                    <div className={styles.grid}>
                        {this.state.cards.map((cardData) => {
                            return (
                                <Card
                                    key={cardData.id}
                                    onUnknownCardClick={
                                        this.handleUnknownCardClick
                                    }
                                    id={cardData.id}
                                    image={cardData.image}
                                    isSelected={cardData.isSelected}
                                    isMatched={cardData.isMatched}
                                />
                            );
                        })}
                    </div>
                    <Controls
                        onResetGameClick={this.handleResetGameClick}
                        moveCount={this.state.moveCount}
                    />
                </div>
            </>
        );
    }
}

const styles = {
    notWonYet: css({
        display: "none",
    }),
    gridAndControlsContainer: css({
        minHeight: "90%",
        backgroundColor: "#0066b2",
        display: "flex",
        width: "100%",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
    }),
    grid: css({
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "50%",
        gap: "0.5rem",
        "& img": {
            // width: "100%",
            width: "150px",
        },
    }),
};
