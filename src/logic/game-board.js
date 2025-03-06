import { Ship } from './ship.js';

class GameBoard {
    /**
     * @type {number}
     */
    gridSize;

    /**
     * @type {{ship:Ship,shipID:string,attacked:Boolean}[][]}
     */
    board;

    constructor(gridSize = 10) {
        this.gridSize = gridSize;
        this.board = new Array(gridSize);
        for (let i = 0; i < gridSize; i++) {
            this.board[i] = new Array(gridSize);
            for (let j = 0; j < gridSize; j++) {
                this.board[i][j] = {
                    ship: null,
                    shipID: null,
                    attacked: false,
                };
            }
        }
    }

    /**
     *
     * @param {Ship} ship
     * @param {number} x
     * @param {number} y
     * @returns {Boolean} true if ship was placed successfully on the board, false if cell is already occupied, throws error otherwise
     * @throws  if x + ship.length and y are outside the board
     */
    placeShipHorizontally(ship, x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (x + ship.length - 1 >= this.gridSize || y >= this.gridSize) {
            throw new Error('ship is too large for the board');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[y][x + i].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            this.board[y][x + i].ship = ship;
            this.board[y][x + i].shipID = `${x}${y}`;
        }
        return true;
    }

    /**
     *
     * @param {Ship} ship
     * @param {number} x
     * @param {number} y
     * @returns {Boolean} true if ship was placed successfully on the board, false if cell is already occupied, throws otherwise
     * @throws {Error} if x + ship.length and y are outside the board
     */
    placeShipVertically(ship, x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (x >= this.gridSize || y + ship.length - 1 >= this.gridSize) {
            throw new Error('ship is too large for the board');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[y + i][x].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            this.board[y + i][x].ship = ship;
            this.board[y + i][x].shipID = `${x}${y}`;
        }
        return true;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @throws {Error} if x or y are outside the board
     */
    receiveAttack(x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (!this.board[y][x].attacked) {
            this.board[y][x].attacked = true;
            if (this.board[y][x].ship !== null) {
                this.board[y][x].ship.hit();
            }
            return true;
        }
        return false;
    }

    /**
     *
     * @returns {Ship[]}
     */
    #getAllShips() {
        const ships = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const { ship } = this.board[i][j];
                if (ship !== null) {
                    if (!ships.includes(ship)) {
                        ships.push(ship);
                    }
                }
            }
        }
        return ships;
    }

    /**
     *
     * @returns {Boolean}
     */
    areAllShipsSunk() {
        const ships = this.#getAllShips();
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    populate() {
        const ship1 = new Ship(2);
        const ship2 = new Ship(3);
        const ship3 = new Ship(3);
        const ship4 = new Ship(4);
        const ship5 = new Ship(5);
        this.placeShipHorizontally(ship1, 0, 0);
        this.placeShipHorizontally(ship2, 7, 3);
        this.placeShipVertically(ship3, 2, 4);
        this.placeShipVertically(ship4, 4, 4);
        this.placeShipHorizontally(ship5, 0, 9);
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @returns {{x:number,y:number}[]}
     */
    findCellsOccupiedByShipInCell(x, y) {
        if (x >= this.gridSize || x < 0 || y >= this.gridSize || y < 0) {
            throw new Error('coordinate should be inside the board');
        }

        const shipIDInCell = this.board[y][x].shipID;
        if (shipIDInCell === null) {
            return [];
        }

        const cells = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const { shipID } = this.board[i][j];
                if (shipID === shipIDInCell) {
                    cells.push({ x: j, y: i });
                }
            }
        }
        return cells;
    }

    resetBoard() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.board[i][j] = {
                    ship: null,
                    shipID: null,
                    attacked: false,
                };
            }
        }
    }

    isCellInsideBoard(x, y) {
        const isXinRange = x < this.gridSize && x >= 0;
        const isYinRange = y < this.gridSize && y >= 0;
        return isXinRange && isYinRange;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} shipLength
     * @param {Boolean} layHorizontally
     */
    isPossibleToPlaceShip(x, y, shipLength, layHorizontally) {
        const cellsAffected = GameBoard.findCellsAffectedByShipIfLaid(
            x,
            y,
            shipLength,
            layHorizontally,
        );
        for (let i = 0; i < cellsAffected.length; i++) {
            const cell = cellsAffected[i];
            if (!this.isCellInsideBoard(cell.x, cell.y)) {
                return false;
            }
            if (this.board[cell.y][cell.x].ship !== null) {
                return false;
            }
        }
        return true;
    }

    static findCellsAffectedByShipIfLaid(x, y, shipLength, layHorizontally) {
        const cells = [];
        for (let i = 0; i < shipLength; i++) {
            if (layHorizontally) {
                cells.push({ x: x + i, y });
            } else {
                cells.push({ x, y: y + i });
            }
        }
        return cells;
    }
}

export { GameBoard };
