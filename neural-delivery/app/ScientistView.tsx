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

    return (
        <div className={previousGameButtons}>
            {data?.map((game) => {
                return (
                    <div key={game.id}>
                        <div>{`game${game.id}`}</div>
                        <div>{`difficulty: ${game.difficulty}`}</div>
                        <div>{`total moves:${game.userMoves.length / 2}`}</div>
                        <button>Replay this game</button>
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
    "&& > button": {
        padding: "0.5rem",
        maxWidth: "5rem",
    },
});
