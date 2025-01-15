import express from "express";
import http from "http";
import WebSocket from "ws";
import {produce} from "immer"

import {canBePlayed, initializeGameState, placeCardOnDeck, drawCard, drawCardProduce} from "../logic/gameLogic"
import { GameState } from "../logic/types";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

let gameState = initializeGameState(4);

let playerConnections: WebSocket[] = [];

wss.on('connection', (ws) => {
    console.log("connection initialized!")
    const playerIndex = playerConnections.length;
    playerConnections.push(ws);

    ws.send(JSON.stringify({type: 'INITIAL_STATE', gameState, playerIndex}));

    ws.on('message', (message) => {
        console.log("message received!")
        const action = JSON.parse(message.toString());
        handlePlayerAction(action, playerIndex);
    })

    ws.on('close', () => {
        playerConnections = playerConnections.filter(client => client !== ws);
    })
})

function handlePlayerAction(action: any, playerIndex: number) {
    switch (action.type) {
        case 'PLAY_CARD':
            console.log("placing card");
            gameState = placeCardOnDeck(action.cardIdx, gameState, action.desiredColor);
            break;
        case 'DRAW_CARD':
            console.log("drawing card");
            gameState = drawCardProduce(playerIndex, gameState, action.amount);
            break;
    }
    
    broadcastGameState();
}

function broadcastGameState() {
    const gameStateMessage = JSON.stringify({ type: 'UPDATE_STATE', gameState });
    playerConnections.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(gameStateMessage);
        }
    });
}

app.get('/', (req, res) => {
    res.send('Hello World! Express and WebSocket server are running.');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});