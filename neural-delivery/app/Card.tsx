import { css, cx } from "@emotion/css";
import { Component } from "react";

interface NewCardProps {
    image: string;
    id: number;
    onUnknownCardClick: (cardId: number, image: string) => void;
    isSelected: boolean;
    isMatched: boolean;
}

export default class Card extends Component<NewCardProps> {
    constructor(props: NewCardProps) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={style.outerContainer.default}>
                    <div
                        className={cx(
                            style.innerContainer.default,
                            this.props.isMatched || this.props.isSelected
                                ? style.innerContainer.isFlipped
                                : ""
                        )}
                    >
                        <img
                            onClick={() =>
                                this.props.isSelected || this.props.isMatched
                                    ? null
                                    : this.props.onUnknownCardClick(
                                          this.props.id,
                                          this.props.image
                                      )
                            }
                            className={style.frontOfCard.default}
                            src="/images/unknown.jpg"
                        />

                        <img
                            className={
                                this.props.isMatched
                                    ? style.backOfCard.default
                                    : cx(
                                          style.backOfCard.default,
                                          style.backOfCard.isSelected
                                      )
                            }
                            src={this.props.image}
                        />
                    </div>
                </div>
            </>
        );
    }
}

const style = {
    outerContainer: {
        default: css({
            width: "150px",
            aspectRatio: "1",
            perspective: "1000px",
        }),
    },
    innerContainer: {
        default: css({
            width: "100%",
            aspectRatio: "1",
            position: "relative",
            transition: "transform 0.8s",
            transformStyle: "preserve-3d",
            "&>img": {
                position: "absolute",
                width: "100%",
                aspectRatio: "1",
            },
        }),
        isFlipped: css({
            transform: "rotateY(180deg)",
        }),
    },
    frontOfCard: {
        default: css({
            boxShadow: "0 0 0 2px #0066b2",
            zIndex: "2",
            "&:hover": { boxShadow: "0 0 0 2px #7d90a1" },
            backfaceVisibility: "hidden",
        }),
    },
    backOfCard: {
        default: css({
            transform: "rotateY(180deg)",
        }),
        isSelected: css({
            opacity: "75%",
            boxShadow: "0 0 0 2px #FEBE10",
        }),
    },
};
