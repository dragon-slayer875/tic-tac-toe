const gameBoard = (() => {
    const _canvas = document.querySelector('.canvas');
    let _board = [[0,0,0], [0,0,0], [0,0,0]];
    let _tiles = []
    let _canHumanPlay = true;
    const _emptyIndexies = () => {
        let _avail = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j< 3; j++) {
                if (_board[i][j] == 0) {
                    _avail.push([i,j]);
                }
            }
        }
        return _avail;
    }
    const _bestMove = (board) => {
        let _bestScore = -Infinity;
        let _bestMove;
        const _availSpots = _emptyIndexies();
        for (let i = 0; i < _availSpots.length; i++) {
            board[_availSpots[i][0]][_availSpots[i][1]] = computer.playerChar;
            let _score = _minimax(board, 0, false);
            board[_availSpots[i][0]][_availSpots[i][1]] = 0;
            if (_score > _bestScore) {
                _bestScore = _score;
                _bestMove = _availSpots[i];
            }
        }
        return _bestMove;
    }
    const _minimax = (board, depth, isMaximizing) => {
        let _result = 0
        if (_checkWin(user.playerChar)) {
            _result = -10;
            return _result;
        }
        else if (_checkWin(computer.playerChar)) {
            _result = 10;
            return _result;
        }
        if (_emptyIndexies().length == 0) {
            return 0;
        }
        if (isMaximizing) {
            let _bestScore = -Infinity;
            const _availSpots = _emptyIndexies();
            for (let i = 0; i < _availSpots.length; i++) {
                board[_availSpots[i][0]][_availSpots[i][1]] = computer.playerChar;
                let _score = _minimax(board, depth + 1, false);
                board[_availSpots[i][0]][_availSpots[i][1]] = 0;
                _bestScore = Math.max(_score, _bestScore);
            }
            return _bestScore;
        }
        else {
            let _bestScore = Infinity;
            const _availSpots = _emptyIndexies();
            for (let i = 0; i < _availSpots.length; i++) {
                board[_availSpots[i][0]][_availSpots[i][1]] = user.playerChar;
                let _score = _minimax(board, depth + 1, true);
                board[_availSpots[i][0]][_availSpots[i][1]] = 0;
                _bestScore = Math.min(_score, _bestScore);
            }
            return _bestScore;
        }
    }
    const _getTiles = () => {
        _tiles = Array.from(document.querySelectorAll('.tile'));
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
                return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (_board.every(elem => elem[i] == char)) {
                return true;
            }
        }
        if (_board[0][0] == char && _board[1][1] == char && _board[2][2] == char) {
            return true;
        }
        if (_board[0][2] == char && _board[1][1] == char && _board[2][0] == char) {
            return true;
        }
        return false;
    }
    const _moveComputer = (target, row, col, char) => {
        _board[row][col] = char;
        target.textContent = char;
        _canHumanPlay = true; 
        if (_checkWin(char)) {
            _winner(char);
            return;
        }
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
        if (_checkWin(char)) {
            _winner(char);
            return;
        }
        if (_tiles.length == 0) {
            _winner('Nobody');
            return;
        }
        const _bestTile = _bestMove(_board);
        const _tile = _tiles.find(elem => elem.dataset.row == _bestTile[0] && elem.dataset.col == _bestTile[1]);
        setTimeout(function(){_moveComputer(_tile, _tile.dataset.row, _tile.dataset.col, computer.playerChar)}, 500);
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

