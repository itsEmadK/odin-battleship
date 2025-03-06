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

        const p1ScorePara = document.createElement('p');
        p1ScorePara.innerText = `Your score: ${player1.score}`;
        p1ScorePara.classList.add('score', 'player1');
        const p2ScorePara = document.createElement('p');
        p2ScorePara.innerText = `Enemy's score: ${player2.score}`;
        p2ScorePara.classList.add('score', 'player2');

        boardsContainer.appendChild(p1ScorePara);
        boardsContainer.appendChild(p2ScorePara);
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

        const tipsContainer = document.createElement('ul');
        tipsContainer.classList.add('tips');
        const tip1 = document.createElement('li');
        tip1.classList.add('tip');
        tip1.innerText =
            'Click on a ship to select it and then choose a cell on the grid to place it.';
        const tip2 = document.createElement('li');
        tip2.classList.add('tip');
        tip2.innerText =
            'Alternatively, you can drag a ship and then drop it on the board.';
        const tip3 = document.createElement('li');
        tip3.classList.add('tip');
        tip3.innerText =
            'Click on the axis buttons to change the direction in which you ship is going to be placed.';
        const tip4 = document.createElement('li');
        tip4.classList.add('tip');
        tip4.innerText =
            'Alternatively, you can press "R" on you keyboard to toggle between the two axis.';
        const tip5 = document.createElement('li');
        tip5.classList.add('tip');
        tip5.innerText =
            'Once you have placed all of your five ships, you can click confirm to save it.';
        tipsContainer.appendChild(tip1);
        tipsContainer.appendChild(tip2);
        tipsContainer.appendChild(tip3);
        tipsContainer.appendChild(tip4);
        tipsContainer.appendChild(tip5);
        formationContainer.appendChild(tipsContainer);

        const boardGridDiv = document.createElement('div');
        const boardContainerDiv = document.createElement('div');
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

        const axisButtonsContainer = document.createElement('div');
        axisButtonsContainer.classList.add('axis');
        const xAxisButton = document.createElement('button');
        xAxisButton.classList.add('x-axis');
        xAxisButton.innerText = 'X-Axis';
        const yAxisButton = document.createElement('button');
        yAxisButton.classList.add('y-axis', 'selected');
        yAxisButton.innerText = 'Y-Axis';
        axisButtonsContainer.appendChild(xAxisButton);
        axisButtonsContainer.appendChild(yAxisButton);
        boardContainerDiv.appendChild(axisButtonsContainer);

        boardContainerDiv.appendChild(boardGridDiv);
        const confirmButton = document.createElement('button');
        confirmButton.classList.add('confirm');
        confirmButton.innerText = 'Confirm';
        boardContainerDiv.appendChild(confirmButton);

        formationContainer.appendChild(boardContainerDiv);

        const shipsContainer = document.createElement('div');
        shipsContainer.classList.add('ships');
        const shipSize2Container1 = document.createElement('div');
        shipSize2Container1.classList.add('ship');
        shipSize2Container1.dataset.length = 2;

        const ship1 = document.createElement('div');
        ship1.classList.add('ship');
        ship1.setAttribute('draggable', 'true');
        ship1.dataset.length = 2;

        const ship2 = document.createElement('div');
        ship2.classList.add('ship');
        ship2.setAttribute('draggable', 'true');
        ship2.dataset.length = 3;

        const ship3 = document.createElement('div');
        ship3.classList.add('ship');
        ship3.setAttribute('draggable', 'true');
        ship3.dataset.length = 3;

        const ship4 = document.createElement('div');
        ship4.classList.add('ship');
        ship4.setAttribute('draggable', 'true');
        ship4.dataset.length = 4;

        const ship5 = document.createElement('div');
        ship5.classList.add('ship');
        ship5.setAttribute('draggable', 'true');
        ship5.dataset.length = 5;

        const shipCell = document.createElement('div');
        shipCell.classList.add('ship-cell');

        for (let i = 0; i < 2; i++) {
            shipCell.dataset.i = i;
            ship1.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 3; i++) {
            shipCell.dataset.i = i;
            ship2.appendChild(shipCell.cloneNode(true));
            ship3.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 4; i++) {
            shipCell.dataset.i = i;
            ship4.appendChild(shipCell.cloneNode(true));
        }
        for (let i = 0; i < 5; i++) {
            shipCell.dataset.i = i;
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

    function renderFormationBoard(board) {
        const boardGridDiv = document.querySelector(
            `.formation-container .board`,
        );
        boardGridDiv.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                const { ship } = board[i][j];
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.x = j;
                cellDiv.dataset.y = i;
                if (ship !== null) {
                    cellDiv.classList.add('occupied');
                }
                boardGridDiv.appendChild(cellDiv);
            }
        }
    }

    function loadPlayerInfoScreen(isPlayer1, canBeAI, onLoaded) {
        const main = document.querySelector('main');
        if (main.innerHTML) {
            main.innerHTML = '';
        }
        const form = document.createElement('form');
        form.classList.add('player-info');
        const formTitleH3 = document.createElement('h3');
        formTitleH3.innerText = `Enter ${isPlayer1 ? 'first player' : 'second player'}'s info`;
        const nameInput = document.createElement('input');
        nameInput.id = 'player-name';
        nameInput.required = true;
        nameInput.placeholder = 'Name';
        if (isPlayer1) {
            nameInput.value = 'Player1';
        } else {
            nameInput.value = 'Player2';
        }

        form.appendChild(formTitleH3);
        if (canBeAI) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('player-types');
            const humanButton = document.createElement('button');
            humanButton.type = 'button';
            humanButton.classList.add('human', 'selected');
            humanButton.innerText = 'Human';
            const AIButton = document.createElement('button');
            AIButton.type = 'button';
            AIButton.classList.add('ai');
            AIButton.innerText = 'Computer';
            buttonsContainer.appendChild(humanButton);
            buttonsContainer.appendChild(AIButton);
            form.appendChild(buttonsContainer);
        }
        form.appendChild(nameInput);

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('confirm-form');
        confirmButton.innerText = 'Next';
        form.appendChild(confirmButton);
        main.appendChild(form);
        onLoaded();
    }

    function loadPassTheDeviceScreen(onLoaded) {
        const main = document.querySelector('main');
        if (main.innerHTML) {
            main.innerHTML = '';
        }
        const h2 = document.createElement('h2');
        h2.innerText = 'Pass The Device!';
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('pass-the-device');

        const continueButton = document.createElement('button');
        continueButton.type = 'button';
        continueButton.innerText = 'Continue';
        continueButton.classList.add('continue');

        containerDiv.appendChild(h2);
        containerDiv.appendChild(continueButton);
        main.appendChild(containerDiv);
        onLoaded();
    }

    return {
        renderPlayer1Board,
        renderPlayer2Board,
        loadMainScreen,
        loadGameOverDialog,
        loadFormationScreen,
        renderFormationBoard,
        loadPlayerInfoScreen,
        loadPassTheDeviceScreen,
    };
})();

export { displayController };
