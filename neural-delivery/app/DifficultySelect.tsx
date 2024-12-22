enum ImagePairsPerDifficulty {
    easy = 6,
    medium = 8,
    hard = 10,
}

const allImages = [
    "/images/blackCat.jpg",
    "/images/horse.jpg",
    "/images/box.jpg",
    "/images/uke.jpg",
    "/images/plant.jpg",
    "/images/duck.jpg",
    "/images/capybara.jpg",
    "/images/.midnight.jpg",
    "/images/.tomato.jpg",
    "/images/.toothbrush.jpg",
    "/images/.boredomjpg",
    "/images/alligator.jpg",
];

function selectImagePairs(
    difficulty: keyof typeof ImagePairsPerDifficulty
): string[] {
    const numberOfPairs = ImagePairsPerDifficulty[difficulty];
}
function selectImages(allImages: string[]): string[] {}

function generateCards(cardImages: string[]): CardData[] {
    let idCounter = 0;
    const newStack: CardData[] = [];
    cardImages.forEach((image) => {
        const cardData1 = {
            image: image,
            isMatched: false,
            isSelected: false,
            id: idCounter,
        };
        idCounter++;
        const cardData2 = {
            image: image,
            isMatched: false,
            isSelected: false,
            id: idCounter,
        };
        idCounter++;
        newStack.push(cardData1, cardData2);
    });
    return newStack;
}

type DifficultySelectProps = {
    areCardImagesSelected: boolean;
    onDifficultySelectionClick: (images: string[]) => {};
};
export default function DifficultySelect(props: DifficultySelectProps) {
    return (
        <div>
            <button>Easy</button>
            <button>Medium</button>
            <button>Hard</button>
        </div>
    );
}
