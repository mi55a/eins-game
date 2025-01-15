import { colorType, GameState, faceType, CardType } from "../../logic/types";

const colorToColor = {
    "blue": "blue",
    "red": "red",
    "green": "green",
    "yellow": "yellow",
    "wild": "black"
};

// main component should correspond to the game state
// only the current player's card should be visible

// pass in a callback that, when played:
// * removes the card from the deck
// * 

function Card(props: {card: CardType, visible: boolean, onClick: () => any}) {
    return (<>
        <div
            style={{
                backgroundColor: props.visible ? colorToColor[props.card.color] : "gray",
                color: props.card.color === "yellow" ? "black" : "white"
            }}
            className="uno-card"

            onClick={() => props.onClick()}
        >
                {props.visible ? props.card.face : null}
        </div>
    </>)
}

// when the card is clicked, we check the gameState (or the obscured, either one) to see if it can be played.
// if so, we send a message to the server (for now we just update the game state.)
// otherwise, 

export default Card;