import { css, cx } from "@emotion/css";

interface NewCardProps {
    image: string;
    imageId: number;
    onUnknownCardClick: (cardId: number, image: string) => void;
    isSelected: boolean;
    isMatched: boolean;
    isInReplayMode: boolean;
}

export default function Card({
    image,
    imageId,
    onUnknownCardClick,
    isSelected,
    isMatched,
    isInReplayMode,
}: NewCardProps) {
    const cardStyling = style(isInReplayMode);
    return (
        <>
            <div className={cardStyling.outerContainer.default}>
                <div
                    className={cx(
                        cardStyling.innerContainer.default,
                        isMatched || isSelected
                            ? cardStyling.innerContainer.isFlipped
                            : ""
                    )}
                >
                    <img
                        onClick={() =>
                            isSelected || isMatched || isInReplayMode
                                ? null
                                : onUnknownCardClick(imageId, image)
                        }
                        className={cardStyling.frontOfCard.default}
                        src="/images/unknown.jpg"
                    />

                    <img
                        className={
                            isMatched
                                ? cardStyling.backOfCard.default
                                : cx(
                                      cardStyling.backOfCard.default,
                                      cardStyling.backOfCard.isSelected
                                  )
                        }
                        src={image}
                    />
                </div>
            </div>
        </>
    );
}

const style = (isInReplayMode: boolean) => {
    return {
        outerContainer: {
            default: css({
                maxWidth: "150px",
                minWidth: "20px",
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
                "&:hover": {
                    boxShadow: isInReplayMode ? "none" : "0 0 0 2px #7d90a1",
                },
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
};
