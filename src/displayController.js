const displayController = (function () {
    /**
     *
     * @param {{ship:Ship,attacked:Boolean}[][]} board
     * @param {Boolean} isPlayer1
     */
    function renderGameBoard(board, isPlayer1) {
        const boardGridDiv = document.querySelector(
            `div.board.${isPlayer1 ? 'player1' : 'player2'}`,
        );
        boardGridDiv.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                const { ship, attacked } = board[i][j];
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = j;
                cellDiv.dataset.y = i;
                if (ship !== null) {
                    cellDiv.classList.add('occupied');
                }
                if (attacked) {
                    cellDiv.classList.add('attacked');
                }
                boardGridDiv.appendChild(cellDiv);
            }
        }
    }
    function renderPlayer1Board(board) {
        renderGameBoard(board, true);
    }
    function renderPlayer2Board(board) {
        renderGameBoard(board, false);
    }

    function loadMainScreen(player1, player2, onLoaded) {
        const main = document.querySelector('main');
        if (main.innerHTML) {
            main.innerHTML = '';
        }
        const boardsContainer = document.createElement('div');
        boardsContainer.classList.add('boards');
        const player1BoardDiv = document.createElement('div');
        player1BoardDiv.classList.add('board', 'player1');
        const player2BoardDiv = document.createElement('div');
        player2BoardDiv.classList.add('board', 'player2');
        boardsContainer.appendChild(player1BoardDiv);
        boardsContainer.appendChild(player2BoardDiv);
        main.appendChild(boardsContainer);
        renderPlayer1Board(player1.gameBoard.board);
        renderPlayer2Board(player2.gameBoard.board);
        onLoaded();
    }

    function loadGameOverDialog(title, onLoaded) {
        const dialog = document.createElement('dialog');
        dialog.classList.add('game-over');
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerText = title;
        const playAgainButton = document.createElement('button');
        playAgainButton.classList.add('play-again');
        playAgainButton.innerText = 'Play Again';
        div.appendChild(h3);
        div.appendChild(playAgainButton);
        dialog.appendChild(div);
        document.querySelector('main').appendChild(dialog);
        dialog.showModal();
        onLoaded();
    }

    function loadFormationScreen(boardGridSize, onLoaded) {
        const main = document.querySelector('main');
        if (main.innerHTML) {
            main.innerHTML = '';
        }
        const formationContainer = document.createElement('div');
        formationContainer.classList.add('formation-container');
        const boardGridDiv = document.createElement('div');
        boardGridDiv.classList.add('board');
        for (let i = 0; i < boardGridSize; i++) {
            for (let j = 0; j < boardGridSize; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = j;
                cellDiv.dataset.y = i;
                boardGridDiv.appendChild(cellDiv);
            }
        }
        formationContainer.appendChild(boardGridDiv);

        const shipsContainer = document.createElement('div');
        shipsContainer.classList.add('ships');
        const shipSize2Container1 = document.createElement('div');
        shipSize2Container1.classList.add('ship');
        shipSize2Container1.dataset.length = 2;

        const ship1 = document.createElement('div');
        ship1.classList.add('ship');
        ship1.dataset.length = 2;

        const ship2 = document.createElement('div');
        ship2.classList.add('ship');
        ship2.dataset.length = 3;

        const ship3 = document.createElement('div');
        ship3.classList.add('ship');
        ship3.dataset.length = 3;

        const ship4 = document.createElement('div');
        ship4.classList.add('ship');
        ship4.dataset.length = 4;

        const ship5 = document.createElement('div');
        ship5.classList.add('ship');
        ship5.dataset.length = 5;

        const shipCell = document.createElement('div');
        shipCell.classList.add('ship-cell');

        for (let i = 0; i < 2; i++) {
            ship1.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 3; i++) {
            ship2.appendChild(shipCell.cloneNode(true));
            ship3.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 4; i++) {
            ship4.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 5; i++) {
            ship5.appendChild(shipCell.cloneNode(true));
        }

        shipsContainer.appendChild(ship5);
        shipsContainer.appendChild(ship4);
        shipsContainer.appendChild(ship3);
        shipsContainer.appendChild(ship2);
        shipsContainer.appendChild(ship1);
        formationContainer.appendChild(shipsContainer);
        main.appendChild(formationContainer);
        onLoaded();
    }

    return {
        renderPlayer1Board,
        renderPlayer2Board,
        loadMainScreen,
        loadGameOverDialog,
        loadFormationScreen,
    };
})();

export { displayController };
