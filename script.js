const gameBoard = (() => {
    const _canvas = document.querySelector('.canvas');
    let _board = [new Array(3), new Array(3), new Array(3)];
    let _tiles = []
    const _getTiles = () => {
        _tiles = Array.from(document.querySelectorAll('.tile'));
    }
    const _getRandomTile = () => {
        const _randomTile = _tiles[Math.floor(Math.random() * _tiles.length)];
        return _randomTile;
    }
    const _moveComputer = (target, row, col, char) => {
        _board[row][col] = char;
        target.textContent = char;
        _tiles.splice(_tiles.indexOf(target), 1);
        }
    const _moveHuman = (target, row, col, char) => {
        if (target.textContent) {
            return;
        }
        _board[row][col] = char;
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
            _board[i] = new Array(3);
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
    const _message = document.querySelector('.message');
    const _clearBtn = document.querySelector('.reset');
    const _score = document.querySelector('.score');
    const _updateMessage = (msg) => {
        _message.textContent = msg;
    }
    const _updateScore = (score) => {
        _score.textContent = score;
    }
    const _addListeners = () => {
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
    return {init, updateMessage: _updateMessage, updateScore: _updateScore}
})()

displayController.init();

