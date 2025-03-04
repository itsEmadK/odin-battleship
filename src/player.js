import { GameBoard } from './game-board.js';

class Player {
    /**
     * @type {GameBoard}
     */
    gameBoard;

    /**
     * @type {number}
     */
    score;

    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.score = 0;
    }
}

export { Player };
