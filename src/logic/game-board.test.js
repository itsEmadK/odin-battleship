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
        test('every element of every "board" inner array is initialized as {ship:null, shipID:null, attacked:false}', () => {
            const gb = new GameBoard(8);
            for (let i = 0; i < gb.gridSize; i++) {
                for (let j = 0; j < gb.gridSize; j++) {
                    expect(gb.board[i][j]).toEqual({
                        ship: null,
                        shipID: null,
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

    test('sets the shipID prop of the cell to "{{cell.x}{cell.y}}"', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('10');
    });

    test('sets the shipID prop of the cell to "{{cell.x}{cell.y}}"(ex2)', () => {
        const gb = new GameBoard();
        const ship = new Ship(2);
        const x = 7;
        const y = 5;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('75');
    });

    test('sets the shipID prop of all the cells occupied by ship to "{{specifiedCell.x}{specifiedCell.y}}"', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('10');
        expect(gb.board[y][x + 1].shipID).toBe('10');
        expect(gb.board[y][x + 2].shipID).toBe('10');
        expect(gb.board[y][x + 3].shipID).toBe('10');
        expect(gb.board[y][x + 4].shipID).toBe('10');
    });

    test('sets the shipID prop of all the cells occupied by ship to "{{specifiedCell.x}{specifiedCell.y}}"(ex2)', () => {
        const gb = new GameBoard();
        const ship = new Ship(3);
        const x = 2;
        const y = 7;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('27');
        expect(gb.board[y][x + 1].shipID).toBe('27');
        expect(gb.board[y][x + 2].shipID).toBe('27');
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

    test('sets the shipID prop of the cell to "{{cell.x}{cell.y}}"', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('10');
    });

    test('sets the shipID prop of the cell to "{{cell.x}{cell.y}}"(ex2)', () => {
        const gb = new GameBoard();
        const ship = new Ship(2);
        const x = 7;
        const y = 5;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('75');
    });

    test('sets the shipID prop of all the cells occupied by ship to "{{specifiedCell.x}{specifiedCell.y}}"', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 1;
        const y = 0;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('10');
        expect(gb.board[y + 1][x].shipID).toBe('10');
        expect(gb.board[y + 2][x].shipID).toBe('10');
        expect(gb.board[y + 3][x].shipID).toBe('10');
        expect(gb.board[y + 4][x].shipID).toBe('10');
    });

    test('sets the shipID prop of all the cells occupied by ship to "{{specifiedCell.x}{specifiedCell.y}}"(ex2)', () => {
        const gb = new GameBoard();
        const ship = new Ship(3);
        const x = 2;
        const y = 7;
        gb.placeShipVertically(ship, x, y);
        expect(gb.board[y][x].shipID).toBe('27');
        expect(gb.board[y + 1][x].shipID).toBe('27');
        expect(gb.board[y + 2][x].shipID).toBe('27');
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

describe('receiveAttack method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.receiveAttack).toBeDefined();
    });
    test('calls the "hit" method of the ship in the attacked cell(0,2)', () => {
        const gb = new GameBoard();
        const ship = new Ship(3);
        const x = 0;
        const y = 0;
        gb.placeShipVertically(ship, x, y);
        const mockedHit = jest.fn();
        gb.board[y][x].ship.hit = mockedHit;
        gb.receiveAttack(x, y + 2);
        expect(mockedHit).toBeCalledTimes(1);
    });
    test('calls the "hit" method of the ship in the attacked cell(3,0)', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        const mockedHit = jest.fn();
        gb.board[y][x].ship.hit = mockedHit;
        gb.receiveAttack(3, 0);
        expect(mockedHit).toBeCalledTimes(1);
    });
    test('does NOT call the "hit" method if there is no ship in the attacked cell', () => {
        const gb = new GameBoard();
        expect(() => {
            gb.receiveAttack(3, 5);
        }).not.toThrow();
    });
    test('sets the "attacked" prop of the attacked cell(0, 3) to true', () => {
        const gb = new GameBoard();
        const x = 0;
        const y = 3;
        gb.receiveAttack(x, y);
        expect(gb.board[y][x].attacked).toBe(true);
    });
    test('sets the "attacked" prop of the attacked cell(3, 3) to true', () => {
        const gb = new GameBoard();
        const x = 3;
        const y = 3;
        gb.receiveAttack(x, y);
        expect(gb.board[y][x].attacked).toBe(true);
    });
    test('throws error if attack is placed outside the board(cell:(10,10))', () => {
        const gb = new GameBoard();
        expect(() => {
            gb.receiveAttack(10, 10).toThrow(
                'coordinate should be inside the board',
            );
        });
    });
    test('throws error if attack is placed outside the board(cell:(123,0))', () => {
        const gb = new GameBoard();
        expect(() => {
            gb.receiveAttack(123, 0).toThrow(
                'coordinate should be inside the board',
            );
        });
    });
    test('does NOT call the "hit" method of the ship if cell is already attacked', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        const mockedHit = jest.fn();
        gb.board[y][x].ship.hit = mockedHit;
        gb.receiveAttack(3, 0);
        gb.receiveAttack(3, 0);
        gb.receiveAttack(3, 0);
        gb.receiveAttack(3, 0);
        gb.receiveAttack(3, 0);
        gb.receiveAttack(3, 0);
        expect(mockedHit).toBeCalledTimes(1);
    });
    test('returns true if the attack was successful', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        expect(gb.receiveAttack(3, 0)).toBe(true);
    });
    test('returns false if the attacked cell is already attacked', () => {
        const gb = new GameBoard();
        const ship = new Ship(5);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship, x, y);
        gb.receiveAttack(3, 0);
        expect(gb.receiveAttack(3, 0)).toBe(false);
    });
});

describe('areAllShipsSunk method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.areAllShipsSunk).toBeDefined();
    });
    test('returns true if all of the ships are sunk', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);
        const ship3 = new Ship(3);
        gb.placeShipHorizontally(ship1, 0, 0);
        gb.placeShipHorizontally(ship2, 0, 1);
        gb.placeShipVertically(ship3, 2, 2);

        gb.receiveAttack(0, 0);

        gb.receiveAttack(0, 1);
        gb.receiveAttack(1, 1);

        gb.receiveAttack(2, 2);
        gb.receiveAttack(2, 3);
        gb.receiveAttack(2, 4);

        expect(gb.areAllShipsSunk()).toBe(true);
    });
    test('returns false if not all of the ships are sunk', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(1);
        const ship2 = new Ship(2);
        const ship3 = new Ship(3);
        gb.placeShipHorizontally(ship1, 0, 0);
        gb.placeShipHorizontally(ship2, 0, 1);
        gb.placeShipVertically(ship3, 2, 2);

        gb.receiveAttack(0, 0);

        gb.receiveAttack(0, 1);
        gb.receiveAttack(1, 1);

        gb.receiveAttack(2, 2);
        gb.receiveAttack(2, 4);

        expect(gb.areAllShipsSunk()).toBe(false);
    });
});

describe('populate method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.populate).toBeDefined();
    });

    test('populates the board with the default layout', () => {
        const testGB = new GameBoard();
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        const ship3 = new Ship(3);
        const ship4 = new Ship(4);
        const ship5 = new Ship(5);
        testGB.placeShipHorizontally(ship1, 0, 0);
        testGB.placeShipHorizontally(ship2, 7, 3);
        testGB.placeShipVertically(ship3, 2, 4);
        testGB.placeShipVertically(ship4, 4, 4);
        testGB.placeShipHorizontally(ship5, 0, 9);

        const gb = new GameBoard();
        gb.populate();
        expect(gb.board).toEqual(testGB.board);
    });
});

describe('findCellsOccupiedByShipInCell method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.findCellsOccupiedByShipInCell).toBeDefined();
    });
    test('returns all the cells occupied by the ship present in the specified cell', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(4);
        const x = 0;
        const y = 0;
        gb.placeShipHorizontally(ship1, x, y);
        const cellsOccupied = gb.findCellsOccupiedByShipInCell(x, y);
        expect(cellsOccupied).toEqual([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
        ]);
    });

    test('returns all the cells occupied by the ship present in the specified cell(ex2)', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(5);
        const x = 2;
        const y = 0;
        gb.placeShipVertically(ship1, x, y);
        const cellsOccupied = gb.findCellsOccupiedByShipInCell(x, y);
        expect(cellsOccupied).toEqual([
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 2, y: 4 },
        ]);
    });
    test('returns all the cells occupied by the ship present in the specified cell(ex3)', () => {
        const gb = new GameBoard();
        const ship1 = new Ship(1);
        const x = 2;
        const y = 0;
        gb.placeShipVertically(ship1, x, y);
        const cellsOccupied = gb.findCellsOccupiedByShipInCell(x, y);
        expect(cellsOccupied).toEqual([{ x: 2, y: 0 }]);
    });

    test('returns an empty array if there is no ship in the specified cell', () => {
        const gb = new GameBoard();
        const x = 2;
        const y = 0;
        const cellsOccupied = gb.findCellsOccupiedByShipInCell(x, y);
        expect(cellsOccupied).toEqual([]);
    });

    test('throws error if the specified cell is outside of the board', () => {
        const gb = new GameBoard();
        const x = 22;
        const y = 0;
        expect(() => gb.findCellsOccupiedByShipInCell(x, y)).toThrow(
            'coordinate should be inside the board',
        );
    });
    test('throws error if the specified cell is outside of the board(ex2)', () => {
        const gb = new GameBoard();
        const x = 0;
        const y = 10;
        expect(() => gb.findCellsOccupiedByShipInCell(x, y)).toThrow(
            'coordinate should be inside the board',
        );
    });
    test('throws error if the specified cell is outside of the board(ex3)', () => {
        const gb = new GameBoard();
        const x = -3;
        const y = 8;
        expect(() => gb.findCellsOccupiedByShipInCell(x, y)).toThrow(
            'coordinate should be inside the board',
        );
    });
});

describe('findCellsAffectedByShipIfLaid static method', () => {
    test('exists', () => {
        expect(GameBoard.findCellsAffectedByShipIfLaid).toBeDefined();
    });
    test('returns an array of {x,y} representing the cells that will be occupied by the ship', () => {
        const layHorizontally = true;
        const x = 0;
        const y = 0;
        const shipLength = 4;
        expect(
            GameBoard.findCellsAffectedByShipIfLaid(
                x,
                y,
                shipLength,
                layHorizontally,
            ),
        ).toEqual([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
        ]);
    });
    test('returns an array of {x,y} representing the cells that will be occupied by the ship(ex2)', () => {
        const layHorizontally = false;
        const x = 0;
        const y = 2;
        const shipLength = 5;
        expect(
            GameBoard.findCellsAffectedByShipIfLaid(
                x,
                y,
                shipLength,
                layHorizontally,
            ),
        ).toEqual([
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
        ]);
    });
});

describe('resetBoard method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.resetBoard).toBeDefined();
    });
    test('resets the board prop to a 2D array of size gridSize*gridSize, filled with {ship:null,shipID:null,attacked:false}', () => {
        const gb = new GameBoard();
        gb.populate();
        gb.resetBoard();
        const expectedArray = [];
        for (let i = 0; i < gb.gridSize; i++) {
            expectedArray.push(new Array(gb.gridSize));
            for (let j = 0; j < gb.gridSize; j++) {
                expectedArray[i][j] = {
                    ship: null,
                    shipID: null,
                    attacked: false,
                };
            }
        }

        expect(gb.board).toEqual(expectedArray);
    });
});

describe('isCellInsideBoard method', () => {
    test('exists', () => {
        const gb = new GameBoard();
        expect(gb.isCellInsideBoard).toBeDefined();
    });
    test('returns true if given 3, 5 for a board of size 10', () => {
        const gb = new GameBoard(10);
        expect(gb.isCellInsideBoard(3, 5)).toBe(true);
    });
    test('returns false if given 10, 5 for a board of size 10', () => {
        const gb = new GameBoard(10);
        expect(gb.isCellInsideBoard(10, 5)).toBe(false);
    });
    test('returns false if given 0, -5 for a board of size 10', () => {
        const gb = new GameBoard(10);
        expect(gb.isCellInsideBoard(0, -5)).toBe(false);
    });
    test('returns true if given 4, 5 for a board of size 6', () => {
        const gb = new GameBoard(6);
        expect(gb.isCellInsideBoard(4, 5)).toBe(true);
    });
});
