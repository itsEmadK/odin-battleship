class GameBoard {
    gridSize;

    board;

    constructor(gridSize = 10) {
        this.gridSize = gridSize;
        this.board = new Array(gridSize);
        for (let i = 0; i < gridSize; i++) {
            this.board[i] = new Array(gridSize);
            for (let j = 0; j < gridSize; j++) {
                this.board[i][j] = { ship: null, attacked: false };
            }
        }
    }

    placeShipHorizontally(ship, x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (x + ship.length >= this.gridSize || y >= this.gridSize) {
            throw new Error('ship is too large for the board');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[y][x + i].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            this.board[y][x + i].ship = ship;
        }
        return true;
    }

    placeShipVertically(ship, x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (x >= this.gridSize || y + ship.length >= this.gridSize) {
            throw new Error('ship is too large for the board');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[y + i][x].ship !== null) {
                return false;
            }
        }

        for (let i = 0; i < ship.length; i++) {
            this.board[y + i][x].ship = ship;
        }
        return true;
    }

    receiveAttack(x, y) {
        if (x >= this.gridSize || y >= this.gridSize) {
            throw new Error('coordinate should be inside the board');
        }
        if (!this.board[y][x].attacked) {
            this.board[y][x].attacked = true;
            if (this.board[y][x].ship !== null) {
                this.board[y][x].ship.hit();
            }
        }
    }

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

    areAllShipsSunk() {
        const ships = this.#getAllShips();
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export { GameBoard };
