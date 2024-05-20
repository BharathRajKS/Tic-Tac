


document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const result = document.getElementById("result");
    const resetButton = document.getElementById("reset");
    const clickSound = document.getElementById("clickSound");
    const winSound = document.getElementById("winSound");

    
    
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
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

    let handleCellClick = (e) => {
        let cell = e.target;
        let index = cell.getAttribute("data-index");

        if (boardState[index] !== "" || !gameActive) {
            return;
        }
    

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        clickSound.play(); // Play click sound

        if (checkWinner()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            winSound.play(); // Play win sound
            gameActive = false;
        } else if (!boardState.includes("")) {
            result.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    let checkWinner = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === currentPlayer && boardState[b] === currentPlayer && boardState[c] === currentPlayer) {
                return true;
            }
        }
        return false;
    };

    let resetGame = () => {
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        result.textContent = "";
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = "";
        });
    };

    board.addEventListener("click", handleCellClick);
    resetButton.addEventListener("click", resetGame);
});








