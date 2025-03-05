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

    /**
     * @type {string}
     */
    name;

    constructor(name = 'Player') {
        this.gameBoard = new GameBoard(10);
        this.score = 0;
        this.name = name;
    }
}

export { Player };
