import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './Card'
import { drawCardProduce, initializeGameState } from '../../logic/gameLogic'
import { CardType, colorType, DeckType, GameState } from '../../logic/types'
import Deck from './Deck'
import { canBePlayed, placeCardOnDeck } from '../../logic/gameLogic'
import { useState } from 'react'
import { useWebSocket } from './WebSocketContext'

function Game() {
    const {gameState, playerIndex, sendPlayerAction} = useWebSocket();
    
    if (!gameState || playerIndex === null) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <p>{playerIndex}</p>
            <div>
                {/* for each player in the game: */}
                {gameState.players.map((player, idx) => {
                    const deck = player.hand;
                    // return a deck component
                    return <Deck 
                        cards={deck} 
                        visible={idx === playerIndex} 
                        onCardClick={
                            // callback function that accepts the card and its index in the deck.
                            (card: CardType, cardIndex: number) => {
                                console.log(gameState);
                                // if the card is a valid card to play
                                if (idx === gameState.currentPlayerIndex && playerIndex === gameState.currentPlayerIndex && canBePlayed(card, gameState.currentColor, gameState.currentFace)) {
                                    // if it's a wild or +4, then prompt the user for the color
                                    if (card.color === "wild") {
                                        const desiredColor = prompt("what color do you want to play?");
                                        if (desiredColor) {
                                            sendPlayerAction({
                                                type: 'PLAY_CARD',
                                                cardIdx: cardIndex,
                                                desiredColor: desiredColor as colorType,
                                            });
                                        }
                                    } else {
                                        sendPlayerAction({ type: 'PLAY_CARD', cardIdx: cardIndex });
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
            <button onClick={
                () => {
                    if (gameState.players[gameState.currentPlayerIndex].hand.some(card => canBePlayed(card, gameState.currentColor, gameState.currentFace)) || playerIndex !== gameState.currentPlayerIndex) {
                        return;
                    }
                    sendPlayerAction({ type: 'DRAW_CARD', amount: 1 });
                }
            }>draw</button>
        </>
    )


}

export default Game;