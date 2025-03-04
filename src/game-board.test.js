/* eslint-disable no-undef */
import { GameBoard } from './game-board.js';

describe('GameBoard constructor', () => {
    test('exists', () => {
        expect(GameBoard).toBeDefined();
        expect(GameBoard.prototype).toBeDefined();
    });

    test('initializes the "gridSize" property correctly', () => {
        const gb = new GameBoard(7);
        expect(gb.gridSize).toBe(7);
    });

    test('initializes the "gridSize" to 10x10 if no arg is provided', () => {
        const gb = new GameBoard();
        expect(gb.gridSize).toBe(10);
    });

    describe('initializes the board "property" correctly', () => {
        test('"board" prop is initialized as an array of size gridSize', () => {
            const gb = new GameBoard(6);
            expect(gb.board instanceof Array).toBeTruthy();
            expect(gb.board.length).toBe(gb.gridSize);
        });
        test('every "board" array element is initialized as an array of size gridSize', () => {
            const gb = new GameBoard(6);
            for (let i = 0; i < gb.gridSize; i++) {
                expect(gb.board[i] instanceof Array).toBeTruthy();
                expect(gb.board[i].length).toBe(gb.gridSize);
            }
        });
        test('every element of every "board" inner array is initialized as {ship:null, attacked:false}', () => {
            const gb = new GameBoard(8);
            for (let i = 0; i < gb.gridSize; i++) {
                for (let j = 0; j < gb.gridSize; j++) {
                    expect(gb.board[i][j]).toEqual({
                        ship: null,
                        attacked: false,
                    });
                }
            }
        });
    });
});
