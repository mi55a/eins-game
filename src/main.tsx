import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './Card'
import Deck from './Deck'
import { initializeGameState } from './gameLogic'
import Game from './Game'

const state = initializeGameState(4);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game state={state}></Game>
    
  </StrictMode>,
)
