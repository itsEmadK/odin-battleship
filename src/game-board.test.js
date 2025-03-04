/* eslint-disable no-undef */
import { GameBoard } from './game-board.js';
import { Ship } from './ship.js';

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

describe('placeShipHorizontally Method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.placeShipHorizontally).toBeDefined();
    });
    test('places a ship of length 1 on x:3, y:5', () => {
        const gb = new GameBoard();
        const ship = new Ship(1);
        const x = 3;
        const y = 5;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
    });
    test('places a ship of length 3 on x:0, y:2', () => {
        const gb = new GameBoard();
        const ship = new Ship(3);
        const x = 0;
        const y = 2;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
        expect(gb.board[y][x + 1].ship).toBe(ship);
        expect(gb.board[y][x + 2].ship).toBe(ship);
    });
    test('places a ship of length 5 on x:1, y:0', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
        expect(gb.board[y][x + 1].ship).toBe(ship);
        expect(gb.board[y][x + 2].ship).toBe(ship);
        expect(gb.board[y][x + 3].ship).toBe(ship);
        expect(gb.board[y][x + 4].ship).toBe(ship);
    });
    test('returns true if the ship was placed on the board', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        expect(gb.placeShipHorizontally(ship, x, y)).toBeTruthy();
    });
    test('throws error if coordinate is outside the board', () => {
        const gb = new GameBoard();
        const ship = new Ship(2);
        const x = 10;
        const y = 10;
        expect(() => gb.placeShipHorizontally(ship, x, y)).toThrow(
            'coordinate should be inside the board',
        );
    });
    test('throws error if the ship is too long for the board', () => {
        const gb = new GameBoard(5);
        const ship = new Ship(6);
        const x = 0;
        const y = 0;
        expect(() => gb.placeShipHorizontally(ship, x, y)).toThrow(
            'ship is too large for the board',
        );
    });
    test('does not place ship if cell is occupied', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship1, x, y);
        const ship2 = new Ship(3);
        gb.placeShipHorizontally(ship2, x, y);
        expect(gb.board[y][x].ship).toBe(ship1);
        expect(gb.board[y][x + 1].ship).toBe(ship1);
        expect(gb.board[y][x + 2].ship).toBe(ship1);
    });
    test('does not place ship if any of ship cells is occupied by another ship', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 4;
        const y = 0;
        gb.placeShipHorizontally(ship1, x, y);
        const ship2 = new Ship(3);
        gb.placeShipHorizontally(ship2, 2, 0);
        expect(gb.board[0][2].ship).toBe(null);
        expect(gb.board[0][3].ship).toBe(null);
        expect(gb.board[0][4].ship).toBe(ship1);
    });
    test('returns false if coordinate is inside the board but any of the cells is occupied', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 4;
        const y = 0;
        gb.placeShipHorizontally(ship1, x, y);
        const ship2 = new Ship(3);
        expect(gb.placeShipHorizontally(ship2, 2, 0)).toBe(false);
    });
});

describe('placeShipVertically Method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.placeShipVertically).toBeDefined();
    });
    test('places a ship of length 1 on x:3, y:5', () => {
        const gb = new GameBoard();
        const ship = new Ship(1);
        const x = 3;
        const y = 5;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
    });
    test('places a ship of length 3 on x:0, y:2', () => {
        const gb = new GameBoard();
        const ship = new Ship(3);
        const x = 0;
        const y = 2;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
        expect(gb.board[y + 1][x].ship).toBe(ship);
        expect(gb.board[y + 2][x].ship).toBe(ship);
    });
    test('places a ship of length 5 on x:1, y:0', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].ship).toBe(ship);
        expect(gb.board[y + 1][x].ship).toBe(ship);
        expect(gb.board[y + 2][x].ship).toBe(ship);
        expect(gb.board[y + 3][x].ship).toBe(ship);
        expect(gb.board[y + 4][x].ship).toBe(ship);
    });
    test('returns true if the ship was placed on the board', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        expect(gb.placeShipVertically(ship, x, y)).toBeTruthy();
    });
    test('throws error if coordinate is outside the board', () => {
        const gb = new GameBoard();
        const ship = new Ship(2);
        const x = 0;
        const y = 10;
        expect(() => gb.placeShipVertically(ship, x, y)).toThrow(
            'coordinate should be inside the board',
        );
    });
    test('throws error if the ship is too long for the board', () => {
        const gb = new GameBoard(5);
        const ship = new Ship(6);
        const x = 4;
        const y = 0;
        expect(() => gb.placeShipVertically(ship, x, y)).toThrow(
            'ship is too large for the board',
        );
    });
    test('does not place the ship if cell is occupied', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 0;
        const y = 0;
        gb.placeShipVertically(ship1, x, y);
        const ship2 = new Ship(3);
        gb.placeShipVertically(ship2, x, y);
        expect(gb.board[y][x].ship).toBe(ship1);
        expect(gb.board[y + 1][x].ship).toBe(ship1);
        expect(gb.board[y + 2][x].ship).toBe(ship1);
    });
    test('does not place ship if any of ship cells is occupied by another ship', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 0;
        const y = 4;
        gb.placeShipVertically(ship1, x, y);
        const ship2 = new Ship(3);
        gb.placeShipVertically(ship2, 0, 2);
        expect(gb.board[2][0].ship).toBe(null);
        expect(gb.board[3][0].ship).toBe(null);
        expect(gb.board[4][0].ship).toBe(ship1);
    });
    test('returns false if coordinate is inside the board but any of the cells are occupied', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 0;
        const y = 4;
        gb.placeShipVertically(ship1, x, y);
        const ship2 = new Ship(3);
        expect(gb.placeShipVertically(ship2, 0, 2)).toBe(false);
    });
});
