import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './Card'
import { initializeGameState } from './gameLogic'
import { CardType, colorType, DeckType, GameState } from './types'
import Deck from './Deck'
import { canBePlayed, placeCardOnDeck } from './gameLogic'
import { useState } from 'react'


// add interactivity, drill listeners down to the card

// when card is clicked:
//     if it's the current turn, and
//     if the card can be played:
//     play the card
//     remove it from the deck
//     otherwise, do nothing

// // the state would be provided by whatever we pass in from the state component
// // it should just be a function of the card i guess
    // if (canBePlayed(card, state.currentColor, state.currentFace)) {
    //     placeCardOnDeck(props.cards, idx, state);
    // }

function Game(props: {state: GameState}) {
    const [gameState, setGameState] = useState(props.state)
    
    
    return (
        <>
            <div>
                {/* for each player in the game: */}
                {gameState.players.map((player, idx) => {
                    const deck = player.hand;
                    // return a deck component
                    return <Deck 
                        cards={deck} 
                        visible={idx === gameState.currentPlayerIndex} 
                        onCardClick={
                            // callback function that accepts the card and its index in the deck.
                            (card: CardType, cardIndex: number) => {
                                // if the card is a valid card to play
                                if (idx === gameState.currentPlayerIndex && canBePlayed(card, gameState.currentColor, gameState.currentFace)) {
                                    // if it's a wild or +4, then prompt the user for the color
                                    if (card.color === "wild") {
                                        const desiredColor = prompt("what color do you want to play?");
                                        setGameState(s => placeCardOnDeck(cardIndex, gameState, desiredColor as colorType));
                                    } else {
                                        setGameState(s => placeCardOnDeck(cardIndex, gameState));
                                    }
                                    console.log("placed");
                                } else {
                                    console.log("did not place");
                                }
                            }
                        }
                    >
                    </Deck>
                })
                }
            </div>

            {/* show the top of the discard pile */}
            <Card card={gameState.discardPile.at(-1)!} visible={true} onClick={() => {console.log(gameState)}}></Card>
        </>
    )


}

export default Game;