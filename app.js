const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector(".gameStatus");

let currentPlayer = ["one", "X"];
let gameWon = false;
gameStatus.textContent = `player ${currentPlayer[0]}'s Turn`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameState = ["", "", "", "", "", "", "", "", ""];

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));

function handleBoxClick(e) {
  const clickedBox = e.target;

  if (boxes[clickedBox.getAttribute("index")].innerHTML !== "") {
    return;
  }

  if (gameWon) {
    console.log("game won");
    return;
  }
  boxes[clickedBox.getAttribute("index")].innerHTML = currentPlayer[1];
  gameState[clickedBox.getAttribute("index")] = currentPlayer[1];

  checkGameValidation();
}

function checkGameValidation() {
  const playerA = winningConditions
    .map((conditions) =>
      conditions.every((con) => gameState[con].includes("X"))
    )
    .filter((x) => x === true);

  const playerB = winningConditions
    .map((conditions) =>
      conditions.every((con) => gameState[con].includes("O"))
    )
    .filter((x) => x === true);

  const isAllBoxesFilled = gameState.every(
    (element) => element.includes("X") || element.includes("O")
  );

  currentPlayer = currentPlayer[0] === "one" ? ["two", "O"] : ["one", "X"];

  gameStatus.textContent =
    playerA[0] === true
      ? `player ${currentPlayer[0]} wins`
      : playerB[0] === true
      ? `player ${currentPlayer[0]} wins`
      : isAllBoxesFilled
      ? "The Game Is A Draw"
      : `player ${currentPlayer[0]}'s Turn`;

  gameWon = (playerA[0] || playerB[0]) && true;
}

function handleRestart() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.textContent = `player one's Turn`;
  currentPlayer = ["one", "X"];
  gameWon = false;
  boxes.forEach((box) => (box.innerHTML = ""));
}
