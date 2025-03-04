/* eslint-disable no-undef */
import { AIPlayer } from './ai-player.js';
import { Player } from './player.js';
import { GameBoard } from './game-board.js';

describe('AIPlayer class', () => {
    test('exists', () => {
        expect(AIPlayer).toBeDefined();
        expect(AIPlayer.prototype).toBeDefined();
    });
    test('inherits Player class', () => {
        expect(
            Object.getPrototypeOf(AIPlayer.prototype) === Player.prototype,
        ).toBeTruthy();
    });
    test('constructor initializes the player props', () => {
        const gameBoard = new GameBoard();
        const aiPlayer = new AIPlayer(gameBoard);
        expect(aiPlayer.gameBoard).toBe(gameBoard);
    });
});
