import { Card, colorType, DeckType, faceType, GameState } from "./types";
import _ from "lodash";


/**
 * Creates a standard draw pile of 108 cards, as described in the
 * Uno rules. The draw pile consists of 25 of each color, with 2 of
 * each number card (0-9) and 2 of each special non-wild card
 * (add_2, reverse, skip). Additionally, the draw pile contains 8
 * wild cards, with 4 plain wild cards and 4 add_4 wild cards.
 * @returns {DeckType} the draw pile
 */
const createDrawPile = (): DeckType => {
    const drawPile: DeckType = [];

    const colors: colorType[] = ["blue", "red", "green", "yellow"]
    const specialNonWildCardFaces: faceType[] = ["add_2", "reverse", "skip"]

    for (const color of colors) {
        for (let i = 0; i < 10; i++) {
            drawPile.push({color: color, face: i})
            i > 0 ? drawPile.push({color: color, face: i}) : null;
        }
        for (let face of specialNonWildCardFaces) {
            drawPile.push({color: color, face: face});
            drawPile.push({color: color, face: face});
        }
    }

    for (let i = 0; i < 4; i++) {
        drawPile.push({color: "wild", face: "add_4"});
        drawPile.push({color: "wild", face: "plain"});
    }

    return drawPile;
}



/**
 * Initializes a game state with the given number of players.
 * @param {number} numPlayers the number of players to initialize the game with
 * @returns {GameState} the initialized game state
 */
const initializeGameState = (numPlayers: number) => {
    if (numPlayers < 2 || numPlayers > 8) {
        throw new Error("numPlayers must be in between 2 and 8.")
    }

    const players: {id: number, hand: Card[]}[] = []
    const drawPile: DeckType = _.shuffle(createDrawPile());

    for (let i = 0; i < numPlayers; i++) {
        players.push({id: i, hand: drawPile.splice(-7)})
    }

    const discardPile = drawPile.splice(-1);    

    const currentColor = discardPile[0].color === "wild" ? ["blue", "red", "green", "yellow"][Math.floor(Math.random() * 4)] : discardPile[0].color;
    const currentFace = discardPile[0].face;

    const gameState: GameState = {
        players,
        drawPile,
        discardPile,
        currentPlayerIndex: 0,
        currentColor: currentColor as colorType, // Initial color could be null
        currentFace,
        direction: 1
    };

    return gameState;
}

/**
 * Given a base card and a new card, determine if the new card can be played
 * on top of the base card. Cards can be played if they have the same color or
 * face as the base card, or if the new card is a wild card. If the base card is
 * a wild card that has had its color set, the new card can only be played if
 * its color matches the set color of the base card.
 * @param {CardType} baseCard the base card
 * @param {CardType} newCard the new card
 * @returns {boolean} true if the new card can be played
 */
const canBePlayed = (newCard: Card, color: colorType, face: faceType): boolean => {
    if (newCard.color === color) {
        return true;
    }

    if (newCard.face === face) {
        return true;
    }

    if (newCard.color === "wild") {
        return true;
    }

    return false;
}

/**
 * Play a card on top of the current state. If the card can be played, add it to
 * the discard pile and update the current color and face accordingly. If the
 * card is a wild card, the desiredColor parameter can be used to set the color
 * of the wild card. If the card can't be played, return false. Otherwise, return
 * true.
 * @param {CardType} newCard the card to play
 * @param {GameState} state the current state of the game
 * @param {colorType} [desiredColor] the desired color of the wild card
 * @returns {boolean} true if the card can be played
 */
const placeCardOnDeck = (hand: DeckType, cardIdx: number, state: GameState, desiredColor?: colorType): boolean => {
    const newCard = hand[cardIdx];
    if (!canBePlayed(newCard, state.currentColor, state.currentFace)) {
        throw new Error("Card cannot be played");
    }

    state.discardPile.push(newCard);

    state.currentPlayerIndex += state.direction;

    if (state.currentPlayerIndex < 0) {
        state.currentPlayerIndex += state.players.length;
    } else if (state.currentPlayerIndex > 0) {
        state.currentPlayerIndex -= state.players.length;
    }

    if (newCard.color === "wild") {
        if (!desiredColor) {
            throw new Error("If playing a wild color, desired color must be supplied");
        }
        state.currentColor = desiredColor;
    } else {
        state.currentColor = newCard.color;
    }

    state.currentFace = newCard.face;

    return true;
};

const numPlayers = 4;
const gameState = initializeGameState(numPlayers);









