import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Card from './Card'
import Deck from './Deck'
import { initializeGameState } from '../../logic/gameLogic'
import Game from './Game'
import { WebSocketProvider } from './WebSocketContext'

const state = initializeGameState(4);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebSocketProvider>
      <Game></Game>
    </WebSocketProvider>
    
    
  </StrictMode>,
)
