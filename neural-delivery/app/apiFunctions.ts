import { CardData } from "./Game";

export async function getMemoryItems() {
    const url = "https://localhost:7230/api/MemoryItems";
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

export async function getMemoryItemsById(id: number) {
    const url = `https://localhost:7230/api/MemoryItems/${id}`;
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

export async function postMemoryItems(
    Difficulty: string,
    UserMoves: number[],
    Cards: CardData[]
) {
    const url = `https://localhost:7230/api/MemoryItems`;
    const postObject = {
        Difficulty,
        UserMoves,
        CardIdLayout: findIdLayout(Cards),
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
