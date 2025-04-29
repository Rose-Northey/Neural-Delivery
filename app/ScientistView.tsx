import { css } from "@emotion/css";
import { getGames } from "./apiFunctions";
import { useQuery } from "@tanstack/react-query";
import Game from "./Game";
import { CardData, GameState } from "./models";
import { allImagesAndIds } from "./allImagesAndIds";
import { colors } from "./colors";

export default function ScientistView() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["previousGames"],
        queryFn: getGames,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleViewThisGameClick = () => {};

    function generateCardData(cardIds: number[]): CardData[] {
        return cardIds.map((pictureId) => {
            const imageFile = allImagesAndIds.find((imageAndIdObject) => {
                return (
                    imageAndIdObject.imageIds[0] === pictureId ||
                    imageAndIdObject.imageIds[1] === pictureId
                );
            })!.image;
            return {
                image: imageFile,
                imageId: pictureId,
                isMatched: true,
                isSelected: false,
            };
        });
    }

    return (
        <div className={gameGridContainer}>
        <div className={gameGrid}>
            {data?.map((game) => {
                const cards = generateCardData(game.pictureIdLayout);
                return (
                    <div className={gameCard(game.difficulty)} key={game.id}>
                        <div>{`Game ${game.id}`}</div>
                        <div>{`difficulty: ${game.difficulty}`}</div>
                        <div>{`total moves:${game.userMoves.length / 2}`}</div>
                        <button onClick={handleViewThisGameClick}>
                            replay this game
                        </button>
                        <Game
                            initialCards={cards}
                            initialGameState={GameState.isInStaticScientistView}
                            isScientistView={true}
                        />
                    </div>
                );
            })}
        </div>
        </div>
    );
}

const gameGridContainer=css({
    display:"flex",
    justifyContent:"center",
    width:"100%"
   })

const gameGrid = css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent:"space-between",
    gap: "1rem",
    margin: "1rem",
    width: "70%",
});

const gameCard = (difficulty: string)=>css({
    "&&": {
        border: "solid green 1pt",
        padding: "0.5rem",
        width: difficulty === "easiest"? "10rem":"20rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignSelf: "center",
        alignItems:"center"

    },
    "&& > button": {
        margin: "0.5rem",
        maxWidth: "10rem",
        backgroundColor: colors.lightBlue,
        borderColor:colors.darkBlue,
        padding: "0.5rem",
    },
    "&&&> button:hover":{
        backgroundColor: colors.orange,
    },
    "&&&> button:active":{
        borderColor: colors.orange,
    }

})


/*when you click view this game you see a replay pop up just underneth
view the game box. 
instead of generate cards, another funtion is created - assemblePastDeck
*/
