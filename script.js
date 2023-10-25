const gameBoard = (() => {
    const _canvas = document.querySelector('.canvas');
    let _board = [[0,0,0], [0,0,0], [0,0,0]];
    let _tiles = []
    let _canHumanPlay = true;
    const _getTiles = () => {
        _tiles = Array.from(document.querySelectorAll('.tile'));
    }
    const _getRandomTile = () => {
        const _randomTile = _tiles[Math.floor(Math.random() * _tiles.length)];
        return _randomTile;
    }
    const _winner = (char) => {
        const _dialog = document.querySelector("dialog");
        const _dialogText = document.querySelector(".dtext");
        if (char == 'Nobody') {
            _dialogText.textContent = `It's a tie!`;
        }
        else {
            _dialogText.textContent = `${char} wins!`;
        }
        _dialog.showModal();
    }
    const _checkWin = (char) => {
        for (let i = 0; i < 3; i++) {
            if (_board[i].every(elem => elem == char)) {
                _winner(char);
                return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (_board.every(elem => elem[i] == char)) {
                _winner(char);
                return true;
            }
        }
        if (_board[0][0] == char && _board[1][1] == char && _board[2][2] == char) {
            _winner(char);
            return true;
        }
        if (_board[0][2] == char && _board[1][1] == char && _board[2][0] == char) {
            _winner(char);
            return true;
        }
        if (_tiles.length == 0) {
            _winner('Nobody');
            return true;
        }
    }
    const _moveComputer = (target, row, col, char) => {
        _board[row][col] = char;
        target.textContent = char;
        _canHumanPlay = true;
        _checkWin(char)
        _tiles.splice(_tiles.indexOf(target), 1);
        }
    const _moveHuman = (target, row, col, char) => {
        if (target.textContent || !_canHumanPlay) {
            return;
        }
        _board[row][col] = char;
        target.textContent = char;
        _canHumanPlay = false;
        _tiles.splice(_tiles.indexOf(target), 1);
        if (_checkWin(char)|| _tiles.length == 0) {
            return;
        }
        const _randomTile = _getRandomTile();
        setTimeout(function(){_moveComputer(_randomTile, _randomTile.dataset.row, _randomTile.dataset.col, computer.playerChar)}, 500);
    }
    const _addListeners = () => {
        const _tiles = document.querySelectorAll('.tile');
        _tiles.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (elem.textContent) {
                    return;
                }
                _moveHuman(e.target, e.target.dataset.row, e.target.dataset.col, user.playerChar);
            })
        })
    }
    const makeBoard = () => {
        _canHumanPlay = true;
        _canvas.innerHTML = '';
        const _tile = document.createElement('button');
        _tile.classList.add('tile');
        _tile.textContent = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                _tile.dataset.row = i;
                _tile.dataset.col = j;
                _canvas.appendChild(_tile.cloneNode(true));
            }
        }
        _getTiles();
        _addListeners();

    }
    const clearBoard = () => {
        for (let i = 0; i < 3; i++) {
            _board[i] = [0,0,0];
        }
        makeBoard();
    }
    return {clearBoard, makeBoard};
})();

const player = (playerChar) => {
    const setUserChar = (char) => {
        user.playerChar = char;
        computer.playerChar = char == 'X' ? 'O' : 'X';
    }
    return {playerChar, setUserChar}
}

const user = player('X');
const computer = player('O');

const displayController = (() => {
    const _charButtons = document.querySelectorAll('.char');
    const _clearBtn = document.querySelector('.reset');
    const _dialog = document.querySelector("dialog");
    const _dialogResetBtn = document.querySelector(".dreset");
    const _addListeners = () => {
        _dialogResetBtn.addEventListener('click', ()=> {
            _dialog.close();
            gameBoard.clearBoard()
        })
        _clearBtn.addEventListener('click', () => {
            gameBoard.clearBoard();
        })
        _charButtons.forEach(elem => {
            elem.addEventListener('click', (e) => {
                document.querySelector('.user').classList.remove('user');
                elem.classList.toggle('user');
                user.setUserChar(e.target.textContent);
                gameBoard.clearBoard();
            })
        }
    )
    }
    const init = () => {
        _addListeners();
        gameBoard.makeBoard();
    }
    return {init}
})()

displayController.init();

