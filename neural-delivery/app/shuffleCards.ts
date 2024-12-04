import { CardData } from "./Game";

// this function takes all of the cards and sorts them according to a
// randomization number it internally creates

// data structure for sorting looks like:

type CardWithRandomization = {
    randomization: number;
    card: CardData;
};
// map though all cards and create an associated randomization number
// perform swap functions on both the cards and the randomization numbers

//create a function which takes in any array of values and shuffles them,
// returning only an array of the values

// create a function which

export default function shuffleCards(cards: CardData[]): CardData[] {
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
