const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const board = document.getElementById('board');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatus() {
    if (!gameActive) {
        if (gameBoard.every(cell => cell !== '')) {
            statusDisplay.textContent = "It's a Draw!";
        }
        return;
    }
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = `Player ${winner} wins!`;
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

updateStatus();
