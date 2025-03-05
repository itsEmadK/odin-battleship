import { Player } from './player.js';

class AIPlayer extends Player {
    #previouslyAttacked = [];

    constructor(name = 'AI') {
        super(name);
        for (let i = 0; i < this.gameBoard.gridSize; i++) {
            this.#previouslyAttacked.push(new Array(this.gameBoard.gridSize));
            for (let j = 0; j < this.gameBoard.gridSize; j++) {
                this.#previouslyAttacked[i][j] = false;
            }
        }
    }

    /**
     * @returns {{x:number, y:number}}
     */
    getNextAttack() {
        let noCellLeft = true;
        const { gridSize } = this.gameBoard;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (!this.#previouslyAttacked[i][j]) {
                    noCellLeft = false;
                }
            }
        }
        if (noCellLeft) {
            return null;
        }

        let x = Math.floor(Math.random() * gridSize);
        let y = Math.floor(Math.random() * gridSize);
        while (this.#previouslyAttacked[y][x]) {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        }
        this.#previouslyAttacked[y][x] = true;
        return { x, y };
    }
}

export { AIPlayer };
