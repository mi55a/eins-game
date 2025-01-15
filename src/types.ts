export type colorType = "red" | "yellow" | "green" | "blue"
export type faceType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "reverse" | "add_2" | "skip" | "add_4" | "plain"

export type CardType = {
    color: colorType | "wild",
    face: faceType,
}

export type DeckType = CardType[];

export interface GameState {
    players: { id: number; hand: CardType[] }[];
    drawPile: CardType[];
    discardPile: CardType[];
    currentPlayerIndex: number;
    currentColor: colorType;
    currentFace: faceType;
    direction: 1 | -1;
}

