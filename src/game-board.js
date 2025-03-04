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
}

export { GameBoard };
