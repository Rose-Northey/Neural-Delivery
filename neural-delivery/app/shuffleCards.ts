import { CardData } from "./Game";

type ItemWithRandomization<T> = {
    randomization: number;
    item: T;
};

export default function shuffleItems<T>(items: T[]): T[] {
    const itemsWithRandomization = items.map((item) => {
        const randomization = Math.random();
        return { item, randomization };
    });
    const shuffledItemsWithRandomization = quickSort(itemsWithRandomization);
    const shuffledItems = shuffledItemsWithRandomization.map(
        (itemWithRandomization) => itemWithRandomization.item
    );
    return shuffledItems;
}

function quickSort<T>(
    itemsWithRandomization: ItemWithRandomization<T>[],
    iPivot = 0,
    iLastInSortRange = itemsWithRandomization.length - 1
): ItemWithRandomization<T>[] {
    const iLastLower = findIndexOfLowerFromRight(
        itemsWithRandomization,
        iPivot,
        iLastInSortRange
    );
    const iFirstHigher = findIndexOfHigherFromLeft(
        itemsWithRandomization,
        iPivot,
        iLastInSortRange
    );
    if (!iLastLower) {
        iPivot++;
    } else if (!iFirstHigher) {
        swapCards(itemsWithRandomization, iPivot, iLastInSortRange);
        iLastInSortRange--;
    } else if (iFirstHigher > iLastLower) {
        swapCards(itemsWithRandomization, iPivot, iLastLower);
    } else if (iFirstHigher < iLastLower) {
        swapCards(itemsWithRandomization, iFirstHigher, iLastLower);
    }

    if (iPivot < iLastInSortRange) {
        return quickSort(itemsWithRandomization, iPivot, iLastInSortRange);
    }
    return itemsWithRandomization;
}
function findIndexOfLowerFromRight<T>(
    itemsWithRandomization: ItemWithRandomization<T>[],
    iPivot: number,
    iLastInSortRange: number
): number | undefined {
    for (let i = iLastInSortRange; i > iPivot; i--)
        if (
            itemsWithRandomization[i].randomization <
            itemsWithRandomization[iPivot].randomization
        ) {
            return i;
        }
}
function findIndexOfHigherFromLeft<T>(
    itemsWithRandomization: ItemWithRandomization<T>[],
    iPivot: number,
    iLastInSortRange: number
): number | undefined {
    for (let i = iPivot + 1; i <= iLastInSortRange; i++) {
        if (
            itemsWithRandomization[i].randomization >
            itemsWithRandomization[iPivot].randomization
        ) {
            return i;
        }
    }
}
function swapCards<T>(
    itemsWithRandomization: ItemWithRandomization<T>[],
    iOne: number,
    iTwo: number
): void {
    const oldOne = itemsWithRandomization[iOne];
    itemsWithRandomization[iOne] = itemsWithRandomization[iTwo];
    itemsWithRandomization[iTwo] = oldOne;
}
