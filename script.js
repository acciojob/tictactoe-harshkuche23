//your JS code here. If required.
const body = document.body;

// Container
const container = document.createElement("div");
container.className = "container";
body.appendChild(container);

// Player inputs
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

// Game variables
let currentPlayer = "X";
let players = {};
let gameActive = true;

// Submit button logic
submitBtn.addEventListener("click", () => {
    if (!input1.value || !input2.value) return;

    container.innerHTML = "";

    const heading = document.createElement("h1");
    heading.innerText = "Tic Tac Toe";

    const message = document.createElement("div");
    message.className = "message";
    message.innerText = `${input1.value}, you're up`;

    const board = document.createElement("div");
    board.className = "board";

    players = {
        X: input1.value,
        O: input2.value
    };

    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = i;

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

        board.appendChild(cell);
    }

    container.append(heading, message, board);
});

// Win logic
function checkWin() {
    const wins = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ];

    return wins.some(pattern => {
        return pattern.every(id => {
            return document.getElementById(id).innerText === currentPlayer;
        });
    });
}
