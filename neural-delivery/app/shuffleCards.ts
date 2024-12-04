import { CardData } from "./Game";

type CardWithRandomization = {
    randomization: number;
    card: CardData;
};

export default function shuffleCards(cards: CardData[]): CardData[] {
    console.log(`here are the cards:`);
    console.log(cards);
    const cardsWithRandomization = cards.map((card) => {
        const randomization = Math.random();
        return { card, randomization };
    });
    quickSort(cardsWithRandomization);
    const shuffledCards = cardsWithRandomization.map(
        (cardWithRandomization) => {
            return cardWithRandomization.card;
        }
    );
    console.log(`here are the shuffled cards:`);
    console.log(shuffledCards);
    return shuffledCards;
}

function quickSort(
    cardsWithRandomization: CardWithRandomization[],
    iPivot = 0,
    iLastInSortRange = cardsWithRandomization.length - 1
): CardWithRandomization[] {
    const iLastLower = findIndexOfLowerFromRight(
        cardsWithRandomization,
        iPivot,
        iLastInSortRange
    );
    const iFirstHigher = findIndexOfHigherFromLeft(
        cardsWithRandomization,
        iPivot,
        iLastInSortRange
    );
    if (!iLastLower) {
        iPivot++;
    } else if (!iFirstHigher) {
        swapCards(cardsWithRandomization, iPivot, iLastInSortRange);
        iLastInSortRange--;
    } else if (iFirstHigher > iLastLower) {
        swapCards(cardsWithRandomization, iPivot, iLastLower);
    } else if (iFirstHigher < iLastLower) {
        swapCards(cardsWithRandomization, iFirstHigher, iLastLower);
    }

    if (iPivot < iLastInSortRange) {
        return quickSort(cardsWithRandomization, iPivot, iLastInSortRange);
    }
    return cardsWithRandomization;
}
function findIndexOfLowerFromRight(
    cardsWithRandomization: CardWithRandomization[],
    iPivot: number,
    iLastInSortRange: number
): number | undefined {
    for (let i = iLastInSortRange; i > iPivot; i--)
        if (
            cardsWithRandomization[i].randomization <
            cardsWithRandomization[iPivot].randomization
        ) {
            return i;
        }
}
function findIndexOfHigherFromLeft(
    cardsWithRandomization: CardWithRandomization[],
    iPivot: number,
    iLastInSortRange: number
): number | undefined {
    for (let i = iPivot + 1; i <= iLastInSortRange; i++) {
        if (
            cardsWithRandomization[i].randomization >
            cardsWithRandomization[iPivot].randomization
        ) {
            return i;
        }
    }
}
function swapCards(
    cardsWithRandomization: CardWithRandomization[],
    iOne: number,
    iTwo: number
): void {
    const oldOne = cardsWithRandomization[iOne];
    cardsWithRandomization[iOne] = cardsWithRandomization[iTwo];
    cardsWithRandomization[iTwo] = oldOne;
}
