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

    return {
        renderPlayer1Board,
        renderPlayer2Board,
        loadMainScreen,
        loadGameOverDialog,
    };
})();

export { displayController };
