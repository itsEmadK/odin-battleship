import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';
import { GameBoard } from './logic/game-board.js';

let turn = 1;
const AIResponseLatencyMS = 0;
const player1 = new Player('Player1');
player1.gameBoard.populate();

const player2 = new AIPlayer();
player2.gameBoard.populate();

function onGameOverDialogLoaded() {
    const dialog = document.querySelector('dialog.game-over');
    const playAgainButton = dialog.querySelector('button');
    playAgainButton.addEventListener('click', () => {
        dialog.close();
        player1.gameBoard.resetBoard();
        player2.gameBoard.resetBoard();
        player1.gameBoard.populate();
        player2.gameBoard.populate();
        displayController.loadMainScreen(player1, player2, onMainScreenLoaded);
        const player1BoardDiv = document.querySelector('div.board.player1');
        player1BoardDiv.classList.add('revealed');
    });
}
function onMainScreenLoaded() {
    const handlePlayer1sWin = () => {
        player1.score++;
        displayController.loadGameOverDialog('You won!', () => {
            const dialog = document.querySelector('dialog.game-over');
            dialog.classList.remove('loss');
            dialog.classList.add('win');
            onGameOverDialogLoaded();
        });
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
}
function onFormationScreenLoaded() {
    let selectedShipLength = 0;
    let layHorizontally = true;
    const shipsContainer = document.querySelector('.ships');
    const shipDivs = document.querySelectorAll('.ship');
    shipDivs.forEach((shipDiv) => {
        shipDiv.addEventListener('click', () => {
            const isPlacing = shipsContainer.classList.contains('placing');
            if (!isPlacing) {
                shipDiv.classList.add('selected');
                selectedShipLength = +shipDiv.dataset.length;
                shipsContainer.classList.add('placing');
            } else if (shipDiv.classList.contains('selected')) {
                shipDiv.classList.remove('selected');
                shipsContainer.classList.remove('placing');
            } else {
                shipDivs.forEach((sd) => {
                    sd.classList.remove('selected');
                });
                shipDiv.classList.add('selected');
                selectedShipLength = +shipDiv.dataset.length;
            }
        });
    });

    const board = document.querySelector('.formation-container .board');
    board.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('cell')) {
            board.childNodes.forEach((node) => {
                node.classList.remove('hover');
            });
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            const cellsAffected = GameBoard.findCellsAffectedByShipIfLaid(
                x,
                y,
                selectedShipLength,
                layHorizontally,
            );
            cellsAffected.forEach((affectedCell) => {
                const node = document.querySelector(
                    `[data-x="${affectedCell.x}"][data-y="${affectedCell.y}"]`,
                );
                node.classList.add('hover');
            });
        }
    });
    board.addEventListener('mouseleave', () => {
        board.childNodes.forEach((node) => {
            node.classList.remove('hover');
        });
    });
}

displayController.loadMainScreen(player1, player2, onMainScreenLoaded);
displayController.loadFormationScreen(
    player1.gameBoard.gridSize,
    onFormationScreenLoaded,
);
