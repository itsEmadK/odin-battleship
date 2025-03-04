/* eslint-disable no-undef */
import { Player } from './player.js';
import { GameBoard } from './game-board.js';

describe('Player constructor', () => {
    test('exists', () => {
        expect(Player).toBeDefined();
        expect(Player.prototype).toBeDefined();
    });
    test('initializes the "gameBoard" prop with the given gameBoard arg', () => {
        const gb = new GameBoard();
        const p = new Player(gb);
        expect(p.gameBoard).toEqual(gb);
    });
    test('initializes the "score" prop to 0', () => {
        const gb = new GameBoard();
        const p = new Player(gb);
        expect(p.score).toBe(0);
    });
});
