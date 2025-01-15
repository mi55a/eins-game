export type colorType = "red" | "yellow" | "green" | "blue"
export type faceType = number | "reverse" | "add_2" | "skip" | "add_4" | "plain"

export type Card = {
    color: colorType | "wild",
    face: faceType,
}

export type DeckType = Card[];

export interface GameState {
    players: { id: string; hand: Card[] }[];
    drawPile: Card[];
    discardPile: Card[];
    currentPlayerIndex: number;
    currentColor: colorType;
    currentFace: faceType;
    direction: 1 | -1; // 1 for clockwise, -1 for counterclockwise
  }
