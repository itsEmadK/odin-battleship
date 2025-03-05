import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';

let turn = 1;

const player1 = new Player('Player1');
player1.gameBoard.populate();

const player2 = new AIPlayer();
player2.gameBoard.populate();

displayController.renderPlayer1Board(player1.gameBoard.board);
displayController.renderPlayer2Board(player2.gameBoard.board);

const player1BoardDiv = document.querySelector('.board.player1');
const player2BoardDiv = document.querySelector('.board.player2');

player1BoardDiv.classList.add('revealed');
// player1BoardDiv.addEventListener('click', (e) => {
//     if ([...e.target.classList].includes('cell')) {
//         if (turn === 2) {
//             const x = +e.target.dataset.x;
//             const y = +e.target.dataset.y;
//             player1.gameBoard.receiveAttack(x, y);
//             displayController.renderPlayer1Board(player1.gameBoard.board);
//             turn = 1;
//         }
//     }
// });

player2BoardDiv.addEventListener('click', (e) => {
    if ([...e.target.classList].includes('cell')) {
        if (turn === 1) {
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            if (player2.gameBoard.receiveAttack(x, y)) {
                displayController.renderPlayer2Board(player2.gameBoard.board);
                turn = 2;
                if (player2 instanceof AIPlayer) {
                    const delay = new Promise((resolve, reject) => {
                        setTimeout(resolve, 500);
                    });

                    delay.then(() => {
                        const { x: aiAttackX, y: aiAttackY } =
                            player2.getNextAttack();
                        player1.gameBoard.receiveAttack(aiAttackX, aiAttackY);
                        displayController.renderPlayer1Board(
                            player1.gameBoard.board,
                        );
                        turn = 1;
                    });
                }
            }
        }
    }
});
