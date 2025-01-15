import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './Card'
import { canBePlayed, initializeGameState, placeCardOnDeck } from './gameLogic'
import { CardType, DeckType, GameState } from './types'

const state = initializeGameState(4);

function Deck(props: {cards: DeckType, visible: boolean, onCardClick: (card: CardType, cardIndex: number) => any}) {
    return (<div className='deck'>
        {props.cards.map((card, idx) => {
            return <Card card={card} visible={props.visible} onClick={() => {
                // the state would be provided by whatever we pass in from the state component
                // it should just be a function of the card i guess
                props.onCardClick(card, idx);
            }}></Card>
        })}
    </div>)
}

export default Deck;