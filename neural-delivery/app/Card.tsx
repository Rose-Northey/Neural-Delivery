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
        this.state = {
            isMatched: false,
            isSelected: false,
        };
    }

    render() {
        return (
            <>
                {this.props.isMatched ? (
                    <img key={this.props.id} src={this.props.image} />
                ) : (
                    <div className={style.card}>
                        <div
                            className={cx(
                                style.cardInner,
                                this.props.isSelected ? style.isFlipped : ""
                            )}
                        >
                            <img
                                onClick={() =>
                                    this.props.onUnknownCardClick(
                                        this.props.id,
                                        this.props.image
                                    )
                                }
                                src="/images/unknown.jpg"
                                // src={image}
                                className={style.isUnknown}
                            />
                            <img
                                key={this.props.id}
                                src={this.props.image}
                                className={style.isSelected}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
}

const style = {
    isFlipped: css({
        transform: "rotateY(180deg)",
    }),
    card: css({
        width: "150px",
        height: "150px",
        perspective: "1000px",
    }),
    cardInner: css({
        width: "100%",
        height: "100%",
        position: "relative",
        transition: "transform 0.8s",
        transformStyle: "preserve-3d",
        "&>img": {
            position: "absolute",
            width: "100%",
            height: "100%",
        },
    }),

    isUnknown: css({
        boxShadow: "0 0 0 2px #0066b2",
        zIndex: "2",
        "&:hover": { boxShadow: "0 0 0 2px #7d90a1" },
        backfaceVisibility: "hidden",
    }),
    isSelected: css({
        opacity: "75%",
        boxShadow: "0 0 0 2px #FEBE10",
        transform: "rotateY(180deg)",
    }),
};
