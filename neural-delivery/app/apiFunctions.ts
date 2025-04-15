import { CardData } from "./models";

export interface MemoryItem {
    id: number;
    difficulty: string;
    userMoves: number[];
    pictureIdLayout: number[];
}

export async function getGames(): Promise<MemoryItem[] | undefined> {
    const url = "https://localhost:7230/api/Games";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`uh oh`);
        }
        const json = await response.json();
        const items = json as MemoryItem[];
        return items;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function getGamesById(id: number) {
    const url = `https://localhost:7230/api/Games/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`uh oh`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

export async function postGames(
    Difficulty: string,
    UserMoves: number[],
    Cards: CardData[]
) {
    const url = `https://localhost:7230/api/Games`;
    const postObject = {
        Difficulty,
        UserMoves,
        PictureIdLayout: findIdLayout(Cards),
    };
    try {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(postObject),
        });
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`uh oh`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

function findIdLayout(Cards: CardData[]) {
    return Cards.map((card) => {
        return card.imageId;
    });
}
