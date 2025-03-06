import { Player } from './logic/player.js';
import { AIPlayer } from './logic/ai-player.js';
import { displayController } from './displayController.js';
import './styles.css';
import { GameBoard } from './logic/game-board.js';
import { Ship } from './logic/ship.js';

let turn = 1;
const AIResponseLatencyMS = 0;
let player1 = null;
let player2 = null;
// player2.gameBoard.populate();

function onGameOverDialogLoaded() {
    const dialog = document.querySelector('dialog.game-over');
    const playAgainButton = dialog.querySelector('button');
    playAgainButton.addEventListener('click', () => {
        dialog.close();
        player1.gameBoard.resetBoard();
        player2.gameBoard.resetBoard();
        displayController.loadFormationScreen(player1.gameBoard.gridSize, () =>
            onFormationScreenLoaded(true),
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
        turn = 1;
        player2.score++;
        displayController.loadGameOverDialog('You won!', () => {
            const dialog = document.querySelector('dialog.game-over');
            dialog.classList.add('loss');
            dialog.classList.remove('win');
            onGameOverDialogLoaded();
        });
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
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;

            if (turn === 1) {
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
                        } else {
                            displayController.loadPassTheDeviceScreen(
                                onPassTheDeviceScreenLoaded,
                            );
                        }
                    }
                }
            } else if (player1.gameBoard.receiveAttack(x, y)) {
                displayController.renderPlayer2Board(player1.gameBoard.board);
                if (player1.gameBoard.areAllShipsSunk()) {
                    handlePlayer2sWin();
                } else {
                    turn = 1;
                    displayController.loadPassTheDeviceScreen(
                        onPassTheDeviceScreenLoaded,
                    );
                }
            }
        }
    });
}
function onFormationScreenLoaded(isPlayer1) {
    const player = isPlayer1 ? player1 : player2;

    let selectedShipLength = 0;
    let layHorizontally = false;
    let shipsLaid = 0;
    let lastGrabbedShipCellNumber = null;

    const board = document.querySelector('.formation-container .board');
    const clearAllHighlights = () => {
        board.childNodes.forEach((node) => {
            node.classList.remove('hover');
            node.classList.remove('na');
        });
    };

    const shipsContainer = document.querySelector('.ships');
    shipsContainer.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('ship-cell')) {
            lastGrabbedShipCellNumber = e.target;
        } else {
            lastGrabbedShipCellNumber = null;
        }
    });

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
        shipDiv.addEventListener('dragstart', (e) => {
            if (
                selectedShipLength === 0 &&
                !shipDiv.classList.contains('placed')
            ) {
                shipDiv.classList.add('selected');
                selectedShipLength = +shipDiv.dataset.length;
                lastGrabbedShipCellNumber =
                    +lastGrabbedShipCellNumber.dataset.i;
            } else {
                e.preventDefault();
            }
        });
        shipDiv.addEventListener('dragend', () => {
            shipDiv.classList.remove('selected');
            selectedShipLength = 0;
            clearAllHighlights();
        });
    });

    const confirmButton = document.querySelector('button.confirm');
    confirmButton.addEventListener('click', () => {
        if (shipsLaid === 5) {
            if (isPlayer1) {
                const shouldInitializePlayer2 = player2 === null;
                if (shouldInitializePlayer2) {
                    displayController.loadPlayerInfoScreen(
                        false,
                        true,
                        onPlayerInfoScreenLoaded,
                    );
                } else if (player2 instanceof AIPlayer) {
                    player2.gameBoard.populate();
                    displayController.loadMainScreen(
                        player1,
                        player2,
                        onMainScreenLoaded,
                    );
                } else {
                    displayController.loadFormationScreen(
                        player2.gameBoard.gridSize,
                        () => onFormationScreenLoaded(false),
                    );
                }
            } else {
                displayController.loadMainScreen(
                    player1,
                    player2,
                    onMainScreenLoaded,
                );
            }
        }
    });

    const placeShipOnBoard = (x, y) => {
        const possibleToPlace = player.gameBoard.isPossibleToPlaceShip(
            x,
            y,
            selectedShipLength,
            layHorizontally,
        );
        if (possibleToPlace) {
            const ship = new Ship(selectedShipLength);
            if (layHorizontally) {
                player.gameBoard.placeShipHorizontally(ship, x, y);
            } else {
                player.gameBoard.placeShipVertically(ship, x, y);
            }
            const selectedShipDiv =
                shipsContainer.querySelector('.ship.selected');
            selectedShipDiv.classList.remove('selected');
            selectedShipDiv.classList.add('placed');
            shipsLaid++;
            if (shipsLaid === 5) {
                confirmButton.classList.add('enabled');
            }
            selectedShipLength = 0;
            displayController.renderFormationBoard(player.gameBoard.board);
        }
    };

    const xAxisButton = document.querySelector('button.x-axis');
    const yAxisButton = document.querySelector('button.y-axis');
    xAxisButton.addEventListener('click', () => {
        layHorizontally = true;
        shipsContainer.classList.add('horizontal');
        xAxisButton.classList.add('selected');
        yAxisButton.classList.remove('selected');
    });
    yAxisButton.addEventListener('click', () => {
        layHorizontally = false;
        shipsContainer.classList.remove('horizontal');
        yAxisButton.classList.add('selected');
        xAxisButton.classList.remove('selected');
    });

    const highLightAffectedCells = (x, y) => {
        const cellsAffected = GameBoard.findCellsAffectedByShipIfLaid(
            x,
            y,
            selectedShipLength,
            layHorizontally,
        );

        const possibleToPlace = player.gameBoard.isPossibleToPlaceShip(
            x,
            y,
            selectedShipLength,
            layHorizontally,
        );

        cellsAffected.forEach((affectedCell) => {
            if (
                player.gameBoard.isCellInsideBoard(
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
    };

    board.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('cell')) {
            board.childNodes.forEach((node) => {
                node.classList.remove('hover');
                node.classList.remove('na');
            });
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            highLightAffectedCells(x, y);
        }
    });
    board.addEventListener('mouseleave', () => {
        clearAllHighlights();
    });
    board.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell') && selectedShipLength > 0) {
            const x = +e.target.dataset.x;
            const y = +e.target.dataset.y;
            placeShipOnBoard(x, y);
        }
    });
    board.addEventListener('dragover', (e) => {
        const node = e.target;
        e.preventDefault();
        clearAllHighlights();
        const x = +node.dataset.x;
        const y = +node.dataset.y;
        if (layHorizontally) {
            highLightAffectedCells(x - lastGrabbedShipCellNumber, y);
        } else {
            highLightAffectedCells(x, y - lastGrabbedShipCellNumber);
        }
    });
    board.addEventListener('drop', (e) => {
        const node = e.target;
        e.preventDefault();
        clearAllHighlights();
        const x = +node.dataset.x;
        const y = +node.dataset.y;
        if (layHorizontally) {
            placeShipOnBoard(x - lastGrabbedShipCellNumber, y);
            selectedShipLength = 0;
        } else {
            placeShipOnBoard(x, y - lastGrabbedShipCellNumber);
            selectedShipLength = 0;
        }
    });
    board.addEventListener('dragleave', () => {
        clearAllHighlights();
    });

    document.body.addEventListener('keyup', (e) => {
        if (document.body.querySelector('.formation-container')) {
            if (e.key.toLowerCase() === 'r') {
                const originCell = document.querySelector('.cell.hover');
                layHorizontally = !layHorizontally;
                shipsContainer.classList.toggle('horizontal');
                xAxisButton.classList.toggle('selected');
                yAxisButton.classList.toggle('selected');

                if (originCell) {
                    // cursor was on one of the board cells, otherwise no.
                    const x = +originCell.dataset.x;
                    const y = +originCell.dataset.y;
                    clearAllHighlights();
                    highLightAffectedCells(x, y);
                }
            }
        }
    });
}
function onPlayerInfoScreenLoaded() {
    const playerNameInput = document.querySelector('#player-name');
    const confirmButton = document.querySelector('form button.confirm-form');

    let isHuman = true;
    const humanButton = document.querySelector('button.human');
    const aiButton = document.querySelector('button.ai');

    if (humanButton) {
        humanButton.addEventListener('click', () => {
            isHuman = true;
            humanButton.classList.add('selected');
            aiButton.classList.remove('selected');
        });
    }

    if (aiButton) {
        aiButton.addEventListener('click', () => {
            isHuman = false;
            humanButton.classList.remove('selected');
            aiButton.classList.add('selected');
        });
    }

    confirmButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (playerNameInput.reportValidity()) {
            const name = playerNameInput.value;
            const shouldInitializePlayer1 = player1 === null;
            if (shouldInitializePlayer1) {
                player1 = new Player(name);
                displayController.loadFormationScreen(
                    player1.gameBoard.gridSize,
                    () => onFormationScreenLoaded(true),
                );
            } else if (isHuman) {
                player2 = new Player(name);
                displayController.loadFormationScreen(
                    player2.gameBoard.gridSize,
                    () => onFormationScreenLoaded(false),
                );
            } else {
                player2 = new AIPlayer(name);
                player2.gameBoard.populate();
                displayController.loadMainScreen(
                    player1,
                    player2,
                    onMainScreenLoaded,
                );
            }
        }
    });
}
function onPassTheDeviceScreenLoaded() {
    const continueButton = document.querySelector('button.continue');
    continueButton.addEventListener('click', () => {
        if (turn === 1) {
            displayController.loadMainScreen(
                player1,
                player2,
                onMainScreenLoaded,
            );
        } else {
            displayController.loadMainScreen(
                player2,
                player1,
                onMainScreenLoaded,
            );
        }
    });
}

displayController.loadPlayerInfoScreen(true, false, onPlayerInfoScreenLoaded);
