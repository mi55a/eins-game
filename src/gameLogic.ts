import { Card, colorType, DeckType, faceType, GameState } from "./types";

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

const playCard = (newCard: Card, state: GameState, desiredColor?: colorType): boolean => {
    const topCard = state.discardPile[state.discardPile.length - 1];



    if (!canBePlayed(newCard, state.currentColor, state.currentFace)) {
        return false;
    }

    state.discardPile.push(newCard);
    if (newCard.color === "wild") {
        state.currentColor = desiredColor!;
    } else {
        state.currentColor = newCard.color;
    }

    state.currentFace = newCard.face;

    return true;
}



// adding cards to the stack:
// if it can't be played, reject it
// otherwise:
//     add it
//     modify current color
//     modify current face

// game can be defined by state: color and face
