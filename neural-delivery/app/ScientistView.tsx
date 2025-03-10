import { css } from "@emotion/css";
import { getMemoryItems } from "./apiFunctions";
import { useQuery } from "@tanstack/react-query";

export default function ScientistView() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["previousGames"],
        queryFn: getMemoryItems,
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const handleViewThisGameClick = () => {};
    return (
        <div className={previousGameButtons}>
            {data?.map((game) => {
                return (
                    <div key={game.id}>
                        <div>{`game${game.id}`}</div>
                        <div>{`difficulty: ${game.difficulty}`}</div>
                        <div>{`total moves:${game.userMoves.length / 2}`}</div>
                        <button onClick={handleViewThisGameClick}>
                            View This Game
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

const previousGameButtons = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem",
    "&& > div": {
        border: "solid green 1pt",
        padding: "0.5rem",
    },
    "&& > button": {
        padding: "0.5rem",
        maxWidth: "5rem",
    },
});
