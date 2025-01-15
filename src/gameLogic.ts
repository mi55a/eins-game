import { CardType, colorType, DeckType, faceType, GameState } from "./types";
import _ from "lodash";
import {produce} from "immer"


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
            drawPile.push({color: color, face: i.toString() as faceType})
            i > 0 ? drawPile.push({color: color, face: i.toString() as faceType}) : null;
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
const initializeGameState = (numPlayers: number): GameState => {
    if (numPlayers < 2 || numPlayers > 8) {
        throw new Error("numPlayers must be in between 2 and 8.")
    }

    const players: {id: number, hand: CardType[]}[] = []
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
const canBePlayed = (newCard: CardType, color: colorType, face: faceType): boolean => {
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

const handleSkip = (state: GameState) => {
    state.currentPlayerIndex += 2 * state.direction;
}

const handleReverse = (state: GameState) => {
    state.direction *= -1;
    state.currentPlayerIndex += state.direction;
}

const handleAdd2 = (state: GameState) => {
    drawCard((state.currentPlayerIndex + state.direction + state.players.length) % state.players.length, state, 2);
    state.currentPlayerIndex += 2 * state.direction;
}

const handleAdd4 = (state: GameState) => {
    drawCard((state.currentPlayerIndex + state.direction + state.players.length) % state.players.length, state, 4);
    state.currentPlayerIndex += 2 * state.direction;
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
const placeCardOnDeck = (cardIdx: number, state: GameState, desiredColor?: colorType): GameState => {
    return produce(state, (draftState) => {
        console.log(draftState);
        const currIndex = draftState.currentPlayerIndex;

        const hand = draftState.players[currIndex].hand;
        const newCard = hand[cardIdx];
        hand.splice(cardIdx, 1);

        
        // push to the top of the pile
        draftState.discardPile.push(newCard);

        // this is where card handling should go
        if (newCard.face === "skip") {
            handleSkip(draftState)
        } else if (newCard.face === "reverse") {
            handleReverse(draftState);
        } else if (newCard.face === "add_2") {
            handleAdd2(draftState);
        } else if (newCard.face === "add_4") {
            handleAdd4(draftState);
        } else {
            draftState.currentPlayerIndex += draftState.direction;
        }

        draftState.currentPlayerIndex += draftState.players.length;
        draftState.currentPlayerIndex %= draftState.players.length;

        // if the player empties their hand
        if (hand.length === 0) {
            // remove the player
            draftState.players.splice(currIndex, 1);
            
            // adjust index
            if (draftState.currentPlayerIndex > currIndex) {
                draftState.currentPlayerIndex -= 1;
            }
        }

        // don't allow playing a wild card without telling what color you want
        if (newCard.color === "wild") {
            if (!desiredColor) {
                throw new Error("If playing a wild color, desired color must be supplied");
            }
            draftState.currentColor = desiredColor;
        } else {
            draftState.currentColor = newCard.color;
        }

        draftState.currentFace = newCard.face;
    })
};

// besides placing cards on a deck, the state would also be altered by players drawing!! need to handle that
const drawCard = (playerIdx: number, state: GameState, amount: number): void => {
    // return produce(state, (draftState) => {
    //     draftState.players[playerIdx].hand.push(...draftState.drawPile.splice(-1 * amount));
    // })
    

    for (let i = 0; i < amount; i++) {
        state.players[playerIdx].hand.push(...state.drawPile.splice(-1));

        if (state.drawPile.length === 0) {
            state.drawPile.push(..._.shuffle([...state.discardPile.splice(0, -1)]))
        }
    }
}

const drawCardProduce = (playerIdx: number, state: GameState, amount: number): GameState => {
    return produce(state, (draftState) => {
        draftState.players[playerIdx].hand.push(...draftState.drawPile.splice(-1 * amount));
    })
}

export {initializeGameState, canBePlayed, placeCardOnDeck, drawCardProduce }









