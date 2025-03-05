/* eslint-disable no-undef */
import { AIPlayer } from './ai-player.js';
import { Player } from './player.js';

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

describe('getNextAttack method', () => {
    test('exists', () => {
        const ai = new AIPlayer();
        expect(ai.getNextAttack).toBeDefined();
    });
    test('returns a {x:integer, y:integer} object', () => {
        const ai = new AIPlayer();
        expect(Number.isInteger(ai.getNextAttack().x)).toBeTruthy();
        expect(Number.isInteger(ai.getNextAttack().y)).toBeTruthy();
    });
    test('attack.x is in range [0, gameBoard.gridSize]', () => {
        const ai = new AIPlayer();
        for (let i = 0; i < 80; i++) {
            expect(ai.getNextAttack().x).toBeLessThan(ai.gameBoard.gridSize);
        }
    });
    test('attack.y is in range [0, gameBoard.gridSize]', () => {
        const ai = new AIPlayer();
        for (let i = 0; i < 80; i++) {
            expect(ai.getNextAttack().y).toBeLessThan(ai.gameBoard.gridSize);
        }
    });
    test('does NOT return the same move twice', () => {
        const ai = new AIPlayer();
        const attacks = [];
        for (let i = 0; i < 100; i++) {
            const attack = ai.getNextAttack();
            const repeated = !!attacks.find(
                (cell) => cell.x === attack.x && cell.y === attack.y,
            );
            expect(repeated).toBe(false);
            attacks.push(attack);
        }
    });
    test('returns null if all possible moves are played', () => {
        const ai = new AIPlayer();
        for (
            let i = 0;
            i < ai.gameBoard.gridSize * ai.gameBoard.gridSize;
            i++
        ) {
            ai.getNextAttack();
        }
        expect(ai.getNextAttack()).toBe(null);
        expect(ai.getNextAttack()).toBe(null);
        expect(ai.getNextAttack()).toBe(null);
    });
});
