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
                <div className={style.card}>
                    <div
                        className={cx(
                            style.cardInner,
                            this.props.isMatched || this.props.isSelected
                                ? style.isFlipped
                                : ""
                        )}
                    >
                        <div>{this.props.image}</div>

                        <img
                            onClick={() =>
                                this.props.isSelected || this.props.isMatched
                                    ? null
                                    : this.props.onUnknownCardClick(
                                          this.props.id,
                                          this.props.image
                                      )
                            }
                            className={style.isUnknownFlip}
                            src="/images/unknown.jpg"
                        />

                        <img
                            className={
                                this.props.isMatched
                                    ? style.isFlipped
                                    : cx(style.isFlipped, style.isSelected)
                            }
                            src={this.props.image}
                        />
                    </div>
                </div>
            </>
        );
    }
}

// cards have an imageSource and this also acts as a unique ID

//     render() {
//         return (
//             <>
//                 <div className={style.card}>
//                     <div
//                         className={cx(
//                             style.cardInner,
//                             this.props.isMatched || this.props.isSelected
//                                 ? style.isFlipped
//                                 : ""
//                         )}
//                     >
//                         <img
//                             onClick={() =>
//                                 this.props.isSelected || this.props.isMatched
//                                     ? null
//                                     : this.props.onUnknownCardClick(
//                                           this.props.id,
//                                           this.props.image
//                                       )
//                             }
//                             className={style.isUnknownFlip}
//                             src="/images/unknown.jpg"
//                         />
//                         <img
//                             className={
//                                 this.props.isSelected
//                                     ? cx(style.isSelected, style.isFlipped)
//                                     : style.isFlipped
//                             }
//                             src={this.props.image}
//                         />
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

const style = {
    isFlipped: css({
        transform: "rotateY(180deg)",
    }),
    card: css({
        width: "150px",
        aspectRatio: "1",
        perspective: "1000px",
    }),
    cardInner: css({
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

    isUnknownFlip: css({
        boxShadow: "0 0 0 2px #0066b2",
        zIndex: "2",
        "&:hover": { boxShadow: "0 0 0 2px #7d90a1" },
        backfaceVisibility: "hidden",
    }),

    isSelected: css({
        opacity: "75%",
        boxShadow: "0 0 0 2px #FEBE10",
    }),
    isUnknown: css({
        "&:hover": { boxShadow: "0 0 0 2px #7d90a1" },
    }),
};
