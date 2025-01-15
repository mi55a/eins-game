import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { GameState } from '../../logic/types';


interface Action {
    type: string;
    [key: string]: any;
}

interface WebSocketContextType {
    gameState: GameState | null;
    playerIndex: number | null;
    sendPlayerAction: (action: Action) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [playerIndex, setPlayerIndex] = useState<number | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000'); // Ensure the port matches your server port

        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'INITIAL_STATE') {
                setPlayerIndex(message.playerIndex);
                setGameState(message.gameState);
            } else if (message.type === 'UPDATE_STATE') {
                setGameState(message.gameState);
            }
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendPlayerAction = (action: Action) => {
        if (ws) {
            ws.send(JSON.stringify(action));
        }
    };

    return (
        <WebSocketContext.Provider value={{ gameState, playerIndex, sendPlayerAction }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};