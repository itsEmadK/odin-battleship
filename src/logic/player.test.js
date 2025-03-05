/* eslint-disable no-undef */
import { Player } from './player.js';
import { GameBoard } from './game-board.js';

describe('Player constructor', () => {
    test('exists', () => {
        expect(Player).toBeDefined();
        expect(Player.prototype).toBeDefined();
    });
    test('initializes the "gameBoard" prop to GameBoard(10)', () => {
        const gb = new GameBoard();
        const p = new Player();
        expect(p.gameBoard).toEqual(gb);
    });
    test('initializes the "score" prop to 0', () => {
        const p = new Player();
        expect(p.score).toBe(0);
    });
    test('initializes the "name" prop to the given arg', () => {
        const p = new Player('Zoleikha');
        expect(p.name).toBe('Zoleikha');
    });
    test('initializes the "name" prop to "Player", if no arg is given', () => {
        const p = new Player();
        expect(p.name).toBe('Player');
    });
});
