import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';

let turn = 1;
let AIResponseLatencyMS = 0;
const player1 = new Player('Player1');
player1.gameBoard.populate();

const player2 = new AIPlayer();
player2.gameBoard.populate();

displayController.renderPlayer1Board(player1.gameBoard.board);
displayController.renderPlayer2Board(player2.gameBoard.board);

const player1BoardDiv = document.querySelector('.board.player1');
const player2BoardDiv = document.querySelector('.board.player2');

const dialog = document.querySelector('dialog.game-over');
const playAgainButton = dialog.querySelector('.play-again');

const playAITurn = () => {
    const delay = new Promise((resolve) => {
        setTimeout(resolve, AIResponseLatencyMS);
    });

    delay.then(() => {
        const { x: aiAttackX, y: aiAttackY } = player2.getNextAttack();
        player1.gameBoard.receiveAttack(aiAttackX, aiAttackY);
        displayController.renderPlayer1Board(player1.gameBoard.board);
        if (player1.gameBoard.areAllShipsSunk()) {
            player2.score++;
            dialog.showModal();
        } else {
            turn = 1;
        }
    });
};

playAgainButton.addEventListener('click', () => {
    dialog.close();
    player1.gameBoard.resetBoard();
    player2.gameBoard.resetBoard();
    player1.gameBoard.populate();
    player2.gameBoard.populate();
    displayController.renderPlayer1Board(player1.gameBoard.board);
    displayController.renderPlayer2Board(player2.gameBoard.board);
});
player1BoardDiv.classList.add('revealed');

player2BoardDiv.addEventListener('click', (e) => {
    if ([...e.target.classList].includes('cell')) {
        if (turn === 1) {
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            if (player2.gameBoard.receiveAttack(x, y)) {
                displayController.renderPlayer2Board(player2.gameBoard.board);
                if (player2.gameBoard.areAllShipsSunk()) {
                    player1.score++;
                    dialog.showModal();
                } else {
                    turn = 2;
                    if (player2 instanceof AIPlayer) {
                        playAITurn();
                    }
                }
            }
        }
    }
});
