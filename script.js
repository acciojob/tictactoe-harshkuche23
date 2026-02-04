const body = document.body;

// container
const container = document.createElement("div");
container.className = "container";
body.appendChild(container);

// heading (must exist immediately)
const heading = document.createElement("h1");
heading.innerText = "Tic Tac Toe";
heading.style.display = "none";
container.appendChild(heading);

// message
const message = document.createElement("div");
message.className = "message";
message.style.display = "none";
container.appendChild(message);

// inputs
const input1 = document.createElement("input");
input1.id = "player-1";
input1.placeholder = "Player 1 name";

const input2 = document.createElement("input");
input2.id = "player-2";
input2.placeholder = "Player 2 name";

const submitBtn = document.createElement("button");
submitBtn.id = "submit";
submitBtn.innerText = "Submit";

container.append(input1, input2, submitBtn);

// board
const board = document.createElement("div");
board.className = "board";
board.style.display = "none";
container.appendChild(board);

// create cells immediately (IMPORTANT)
const cells = [];
for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i;
    board.appendChild(cell);
    cells.push(cell);
}

// game state
let currentPlayer;
let players;
let gameActive;

// submit logic
submitBtn.addEventListener("click", () => {
    if (!input1.value || !input2.value) return;

    players = { X: input1.value, O: input2.value };
    currentPlayer = "X";
    gameActive = true;

    heading.style.display = "block";
    message.style.display = "block";
    board.style.display = "grid";

    message.innerText = `${players[currentPlayer]}, you're up`;

    cells.forEach(cell => cell.innerText = "");
});

// cell click logic
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || cell.innerText !== "") return;

        cell.innerText = currentPlayer;

        if (checkWin()) {
            message.innerText = `${players[currentPlayer]} congratulations you won!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `${players[currentPlayer]}, you're up`;
    });
});

// win check
function checkWin() {
    const wins = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
    ];

    return wins.some(pattern =>
        pattern.every(id =>
            document.getElementById(id).innerText === currentPlayer
        )
    );
}
