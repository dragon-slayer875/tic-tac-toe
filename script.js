const gameBoard = (() => {
    const _canvas = document.querySelector('.canvas');
    let board = [new Array(3), new Array(3), new Array(3)];
    let _tiles = []
    const _getTiles = () => {
        _tiles = Array.from(document.querySelectorAll('.tile'));
    }
    const _getRandomTile = () => {
        const _randomTile = _tiles[Math.floor(Math.random() * _tiles.length)];
        return _randomTile;
    }
    const _moveComputer = (target, row, col, char) => {
        board[row][col] = char;
        target.textContent = char;
        _tiles.splice(_tiles.indexOf(target), 1);
        }
    const _moveHuman = (target, row, col, char) => {
        if (target.textContent) {
            return;
        }
        board[row][col] = char;
        target.textContent = char;
        _tiles.splice(_tiles.indexOf(target), 1);
        if (_tiles.length == 0) {
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
            board[i] = new Array(3);
        }
        makeBoard();
    }
    return {board, clearBoard, makeBoard, _getRandomTile, _tiles};
})();

const player = (playerChar) => {
    return {playerChar}
}

const user = player('X');
const computer = player('O');

const displayController = (() => {
    const _message = document.querySelector('.message');
    const _startBtn = document.querySelector('.start');
    const _clearBtn = document.querySelector('.clear');
    const _score = document.querySelector('.score');
    const _updateMessage = (msg) => {
        _message.textContent = msg;
    }
    const _updateScore = (score) => {
        _score.textContent = score;
    }
    const _addListeners = () => {
        _startBtn.addEventListener('click', () => {
            gameBoard.clearBoard();
            _updateMessage('Game in progress');
            _startBtn.disabled = true;
        })
        _clearBtn.addEventListener('click', () => {
            gameBoard.clearBoard();
            _updateMessage('Game not started');
            _startBtn.disabled = false;
        })
    }
    const init = () => {
        _updateMessage('Game not started');
        _addListeners();
    }
    return {init, updateMessage: _updateMessage, updateScore: _updateScore}
})()

