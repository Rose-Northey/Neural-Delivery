import { CardData } from "./Grid";

export default function shuffleCards(
  cards: CardData[],
  iPivot = 0,
  iLastInSortRange = cards.length - 1
): CardData[] {
  const iLastLower = findIndexOfLowerFromRight(cards, iPivot, iLastInSortRange);
  const iFirstHigher = findIndexOfHigherFromLeft(
    cards,
    iPivot,
    iLastInSortRange
  );
  if (!iLastLower) {
    iPivot++;
  } else if (!iFirstHigher) {
    swapCards(cards, iPivot, iLastInSortRange);
    iLastInSortRange--;
  } else if (iFirstHigher > iLastLower) {
    swapCards(cards, iPivot, iLastLower);
  } else if (iFirstHigher < iLastLower) {
    swapCards(cards, iFirstHigher, iLastLower);
  }

  if (iPivot < iLastInSortRange) {
    return shuffleCards(cards, iPivot, iLastInSortRange);
  }
  return cards;
}
function findIndexOfLowerFromRight(
  cardData: CardData[],
  iPivot: number,
  iLastInSortRange: number
): number | undefined {
  for (let i = iLastInSortRange; i > iPivot; i--)
    if (cardData[i].randomization < cardData[iPivot].randomization) {
      return i;
    }
}
function findIndexOfHigherFromLeft(
  cardData: CardData[],
  iPivot: number,
  iLastInSortRange: number
): number | undefined {
  for (let i = iPivot + 1; i <= iLastInSortRange; i++) {
    if (cardData[i].randomization > cardData[iPivot].randomization) {
      return i;
    }
  }
}
function swapCards(cardData: CardData[], iOne: number, iTwo: number): void {
  const oldOne = cardData[iOne];
  cardData[iOne] = cardData[iTwo];
  cardData[iTwo] = oldOne;
}
