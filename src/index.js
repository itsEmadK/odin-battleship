import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';

let turn = 1;
const AIResponseLatencyMS = 0;
const player1 = new Player('Player1');
player1.gameBoard.populate();

const player2 = new AIPlayer();
player2.gameBoard.populate();

const handlePlayer1sWin = () => {
    player1.score++;
    const dialog = document.querySelector('dialog.game-over');
    const h3 = dialog.querySelector('h3');
    h3.innerText = 'You won!';
    dialog.classList.remove('loss');
    dialog.classList.add('win');
    dialog.showModal();
};
const handlePlayer2sWin = () => {
    player2.score++;
    const dialog = document.querySelector('dialog.game-over');
    const h3 = dialog.querySelector('h3');
    h3.innerText = 'You lost :(';
    dialog.classList.remove('win');
    dialog.classList.add('loss');
    dialog.showModal();
};
const playAITurn = () => {
    const delay = new Promise((resolve) => {
        setTimeout(resolve, AIResponseLatencyMS);
    });

    delay.then(() => {
        const { x: aiAttackX, y: aiAttackY } = player2.getNextAttack();
        player1.gameBoard.receiveAttack(aiAttackX, aiAttackY);
        displayController.renderPlayer1Board(player1.gameBoard.board);
        if (player1.gameBoard.areAllShipsSunk()) {
            handlePlayer2sWin();
        } else {
            turn = 1;
        }
    });
};

displayController.loadMainScreen(player1, player2, () => {
    const player1BoardDiv = document.querySelector('.board.player1');
    player1BoardDiv.classList.add('revealed');

    const player2BoardDiv = document.querySelector('.board.player2');
    player2BoardDiv.addEventListener('click', (e) => {
        if ([...e.target.classList].includes('cell')) {
            if (turn === 1) {
                const x = +e.target.dataset.x;
                const y = +e.target.dataset.y;
                if (player2.gameBoard.receiveAttack(x, y)) {
                    displayController.renderPlayer2Board(
                        player2.gameBoard.board,
                    );
                    if (player2.gameBoard.areAllShipsSunk()) {
                        handlePlayer1sWin();
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
});

// playAgainButton.addEventListener('click', () => {
//     dialog.close();
//     player1.gameBoard.resetBoard();
//     player2.gameBoard.resetBoard();
//     player1.gameBoard.populate();
//     player2.gameBoard.populate();
//     displayController.renderPlayer1Board(player1.gameBoard.board);
//     displayController.renderPlayer2Board(player2.gameBoard.board);
// });
// player1BoardDiv.classList.add('revealed');
