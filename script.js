const gameBoard = (() => {
    let entries = new Array(9);
    return {entries}
})();

const player = (playerChar) => {
    return {playerChar}
}

const user = player('X');
const computer = player('O');

const displayController = (() => {
    const _tiles = document.querySelectorAll('.tile');
    const updateTile = (index, char) => {
        if (gameBoard.entries[index]) {
            return;
        }
        gameBoard.entries[index] = char;
        _tiles.item(index).textContent = char;
    };
    _tiles.forEach(elem => {
        elem.addEventListener('click', (e) => {
            updateTile(e.target.dataset.id, user.playerChar);
            updateTile(Math.floor(Math.random() * 10), computer.playerChar);
        })
    })
    return {updateTile};
})()

