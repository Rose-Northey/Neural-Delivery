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
                    <img
                        src={this.props.image}
                        className={
                            this.props.isMatched ? undefined : style.isSelected
                        }
                    />
                ) : (
                    <div className={style.card}>
                        <div className={style.cardInner}>
                            <img
                                onClick={() =>
                                    this.props.onUnknownCardClick(
                                        this.props.id,
                                        this.props.image
                                    )
                                }
                                className={style.isUnknown}
                                src="/images/unknown.jpg"
                                // src={this.props.image}
                            />
                            <img
                                className={style.isSelected}
                                // src="/images/unknown.jpg"
                                src={this.props.image}
                            />
                        </div>
                    </div>
                )}
            </>
        );

        // return (
        //     <>
        //         {this.props.isMatched ? (
        //             <img
        //                 src={this.props.image}
        //                 className={
        //                     this.props.isMatched ? undefined : style.isSelected
        //                 }
        //             />
        //         ) : (
        //             <div className={style.card}>
        //                 <div className={style.cardInner}>
        //                     <img
        //                         onClick={() =>
        //                             this.props.onUnknownCardClick(
        //                                 this.props.id,
        //                                 this.props.image
        //                             )
        //                         }
        //                         className={style.isUnknown}
        //                         src="/images/unknown.jpg"
        //                         // src={this.props.image}
        //                     />
        //                     <img
        //                         className={style.isSelected}
        //                         // src="/images/unknown.jpg"
        //                         src={this.props.image}
        //                     />
        //                 </div>
        //             </div>
        //         )}
        //     </>
        // );
    }
}

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

    isUnknownflip: css({
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

// cards have an imageSource and this also acts as a unique ID
