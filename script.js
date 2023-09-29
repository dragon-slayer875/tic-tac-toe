const gameBoard = (() => {
    let entries = ['x','x','x','x','x','x','x','x','x']
    return {entries}
})();

const displayController = (() => {
    const tiles = document.querySelectorAll('.tile');
    const update = () => {
        tiles.forEach(element => {
        element.textContent = gameBoard.entries[element.dataset.id];
    })};
    return {update};
})()
