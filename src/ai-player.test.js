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
        const aiPlayer = new AIPlayer('AmooAi');
        expect(aiPlayer.name).toBe('AmooAi');
    });
    test('constructor initializes the player "name" prop to "AI", if no arg is given', () => {
        const aiPlayer = new AIPlayer();
        expect(aiPlayer.name).toBe('AI');
    });
});
