import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';
import { GameBoard } from './logic/game-board.js';
import { Ship } from './logic/ship.js';

let turn = 1;
const AIResponseLatencyMS = 0;
const player1 = new Player('Player1');
const player2 = new AIPlayer();
player2.gameBoard.populate();

function onGameOverDialogLoaded() {
    const dialog = document.querySelector('dialog.game-over');
    const playAgainButton = dialog.querySelector('button');
    playAgainButton.addEventListener('click', () => {
        dialog.close();
        player1.gameBoard.resetBoard();
        player2.gameBoard.resetBoard();
        player2.gameBoard.populate();
        displayController.loadFormationScreen(
            player1.gameBoard.gridSize,
            onFormationScreenLoaded,
        );
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
    let shipsLaid = 0;
    const shipsContainer = document.querySelector('.ships');
    const shipDivs = document.querySelectorAll('.ship');
    shipDivs.forEach((shipDiv) => {
        shipDiv.addEventListener('click', () => {
            if (!shipDiv.classList.contains('placed')) {
                const isPlacing = shipsContainer.classList.contains('placing');
                if (!isPlacing) {
                    shipDiv.classList.add('selected');
                    selectedShipLength = +shipDiv.dataset.length;
                    shipsContainer.classList.add('placing');
                } else if (shipDiv.classList.contains('selected')) {
                    shipDiv.classList.remove('selected');
                    selectedShipLength = 0;
                    shipsContainer.classList.remove('placing');
                } else {
                    shipDivs.forEach((sd) => {
                        sd.classList.remove('selected');
                    });
                    shipDiv.classList.add('selected');
                    selectedShipLength = +shipDiv.dataset.length;
                }
            }
        });
    });

    const confirmButton = document.querySelector('button.confirm');
    confirmButton.addEventListener('click', () => {
        if (shipsLaid === 5) {
            displayController.loadMainScreen(
                player1,
                player2,
                onMainScreenLoaded,
            );
        }
    });

    const xAxisButton = document.querySelector('button.x-axis');
    const yAxisButton = document.querySelector('button.y-axis');
    xAxisButton.addEventListener('click', () => {
        layHorizontally = true;
        xAxisButton.classList.add('selected');
        yAxisButton.classList.remove('selected');
    });
    yAxisButton.addEventListener('click', () => {
        layHorizontally = false;
        yAxisButton.classList.add('selected');
        xAxisButton.classList.remove('selected');
    });

    const board = document.querySelector('.formation-container .board');
    board.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('cell')) {
            board.childNodes.forEach((node) => {
                node.classList.remove('hover');
                node.classList.remove('na');
            });
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            const cellsAffected = GameBoard.findCellsAffectedByShipIfLaid(
                x,
                y,
                selectedShipLength,
                layHorizontally,
            );

            const possibleToPlace = player1.gameBoard.isPossibleToPlaceShip(
                x,
                y,
                selectedShipLength,
                layHorizontally,
            );

            cellsAffected.forEach((affectedCell) => {
                if (
                    player1.gameBoard.isCellInsideBoard(
                        affectedCell.x,
                        affectedCell.y,
                    )
                ) {
                    const node = document.querySelector(
                        `[data-x="${affectedCell.x}"][data-y="${affectedCell.y}"]`,
                    );
                    if (possibleToPlace) {
                        node.classList.add('hover');
                    } else {
                        node.classList.add('hover', 'na');
                    }
                }
            });
        }
    });
    board.addEventListener('mouseleave', () => {
        board.childNodes.forEach((node) => {
            node.classList.remove('hover');
            node.classList.remove('na');
        });
    });
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell') && selectedShipLength > 0) {
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            const possibleToPlace = player1.gameBoard.isPossibleToPlaceShip(
                x,
                y,
                selectedShipLength,
                layHorizontally,
            );
            if (possibleToPlace) {
                const ship = new Ship(selectedShipLength);
                if (layHorizontally) {
                    player1.gameBoard.placeShipHorizontally(ship, x, y);
                } else {
                    player1.gameBoard.placeShipVertically(ship, x, y);
                }
                const selectedShipDiv =
                    shipsContainer.querySelector('.ship.selected').classList;
                selectedShipDiv.remove('selected');
                selectedShipDiv.add('placed');
                shipsLaid++;
                if (shipsLaid === 5) {
                    confirmButton.classList.add('enabled');
                }
                selectedShipLength = 0;
                displayController.renderFormationBoard(player1.gameBoard.board);
            }
        }
    });
}

displayController.loadFormationScreen(
    player1.gameBoard.gridSize,
    onFormationScreenLoaded,
);
