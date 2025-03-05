import { Player } from './player.js';

class AIPlayer extends Player {
    constructor(name = 'AI') {
        super(name);
    }

    /**
     * @returns {{x:number, y:number}}
     */
    getNextAttack() {
        return {
            x: Math.floor(Math.random() * this.gameBoard.gridSize),
            y: Math.floor(Math.random() * this.gameBoard.gridSize),
        };
    }
}

export { AIPlayer };
