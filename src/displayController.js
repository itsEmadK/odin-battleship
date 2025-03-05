const displayController = (function () {
    /**
     *
     * @param {{ship:Ship,attacked:Boolean}[][]} board
     * @param {Boolean} player1
     */
    function renderGameBoard(board, player1) {
        const boardGridDiv = document.querySelector(
            `div.board.${player1 ? 'player1' : 'player2'}`,
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
    return {
        renderPlayer1Board,
        renderPlayer2Board,
    };
})();

export { displayController };
