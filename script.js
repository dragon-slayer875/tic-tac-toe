const gameBoard = (() => {
    let emptyIndices = [0,1,2,3,4,5,6,7,8]
    let entries = new Array(9);
    return {emptyIndices, entries}
})();

const player = (playerChar) => {
    return {playerChar}
}

const user = player('X');
const computer = player('O');

const displayController = (() => {
    const _tiles = document.querySelectorAll('.tile');
    const updateTile = (index, char) => {
        if (gameBoard.entries[index] || !index) {
            return;
        }
        gameBoard.emptyIndices = gameBoard.emptyIndices.filter((i) => {return i!=index})
        gameBoard.entries[index] = char;
        _tiles.item(index).textContent = char;
        console.log(index);
        console.log(gameBoard.emptyIndices);
    };
    _tiles.forEach(elem => {
        elem.addEventListener('click', (e) => {
            updateTile(e.target.dataset.id, user.playerChar);
            const randomEmptyIndex = gameBoard.emptyIndices[Math.floor(Math.random() * gameBoard.emptyIndices.length)]
            updateTile(randomEmptyIndex,computer.playerChar);
        })
    })
    return {updateTile};
})()

