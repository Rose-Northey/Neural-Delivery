import { Component } from "react";
import Controls from "./Controls";
import { css, cx } from "@emotion/css";
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
};

export default class Game extends Component<GameProps, GameState> {
    images: string[];
    idCounter: number;
    isWon: boolean;
    constructor(props: GameProps) {
        super(props);
        this.images = [
            "/images/blackCat.jpg",
            "/images/horse.jpg",
            "/images/box.jpg",
            "/images/uke.jpg",
            "/images/plant.jpg",
            "/images/duck.jpg",
        ];
        this.idCounter = 0;
        this.isWon = false;
        this.state = {
            moveCount: 0,
            cards: this.generateCards(this.images),
        };
        this.handleResetGameClick = this.handleResetGameClick.bind(this);
    }

    componentDidMount() {
        this.setState((prevState) => ({
            cards: shuffleCards(prevState.cards),
        }));
    }

    handleResetGameClick = () => {
        this.unmatchAllCards();
        setTimeout(() => {
            this.setState({
                moveCount: 0,
                cards: shuffleCards(this.state.cards),
            });
        }, 800);
    };

    generateCards = (cardImages: string[]): CardData[] => {
        const newStack: CardData[] = [];
        cardImages.forEach((image) => {
            const cardData1 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: this.idCounter,
            };
            this.idCounter++;
            const cardData2 = {
                image: image,
                isMatched: false,
                isSelected: false,
                id: this.idCounter,
            };
            this.idCounter++;
            newStack.push(cardData1, cardData2);
        });
        return newStack;
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
                        this.determineIfIsWon();
                    } else {
                        this.unselectAllCards();
                    }
                }, 1000);
            } else {
                this.increaseMoveCount();
            }
        }
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

    unmatchAllCards = () => {
        this.setState((prevState) => {
            const updatedCards = prevState.cards.map((card) => {
                return { ...card, isMatched: false };
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

    determineIfIsWon = () => {
        return this.state.cards.every((card) => card.isMatched);
    };

    render() {
        return (
            <>
                <div className={styles.gameContainer}>
                    <div
                        className={
                            this.determineIfIsWon()
                                ? styles.winBanner.default
                                : cx(
                                      styles.winBanner.default,
                                      styles.winBanner.notWonYet
                                  )
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
                        <div
                            className={
                                this.determineIfIsWon()
                                    ? styles.controls.winState
                                    : ""
                            }
                        >
                            <Controls
                                onResetGameClick={this.handleResetGameClick}
                                moveCount={this.state.moveCount}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const styles = {
    gameContainer: css({
        minHeight: "90%",
        width: "100%",
        position: "relative",

        backgroundColor: "#0066b2",
    }),
    winBanner: {
        default: css({
            display: "absolute",
            zIndex: "4",
        }),
        notWonYet: css({
            display: "none",
        }),
    },
    gridAndControlsContainer: css({
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
            width: "150px",
        },
    }),
    controls: {
        winState: css({
            display: "hidden",
        }),
    },
};
