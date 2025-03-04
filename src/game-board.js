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
}

export { GameBoard };
