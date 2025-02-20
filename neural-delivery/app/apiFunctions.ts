export async function getMemoryItems() {
    const url = "http://localhost:5237/api/MemoryItems";

    try {
        const response = await fetch(url, { mode: "no-cors" });
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`uh oh`);
        }
        const json = await response.json();
        console.log(json);
        console.log("hey");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}
