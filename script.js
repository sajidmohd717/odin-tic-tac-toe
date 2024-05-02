// Global Varialbes, must remove in the future!
const GRID_SIZE = 9;
let player1_turn = true;
let player2_turn = false;

let player1;
let player2;

function initializeGameboard() {
  let grid = document.querySelector(".game_grid");

  for (let i = 0; i < GRID_SIZE; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }
}

function createPlayer(name) {
  return { name };
}

function startGame() {
  let player1Name = document.querySelector("#first_player").value;
  let player2Name = document.querySelector("#second_player").value;

  if (!player1Name || !player2Name) {
    console.error("Please enter names for both players.");
    return;
  }

  player1 = createPlayer(player1Name);
  player2 = createPlayer(player2Name);

  initializeGameboard();

  let gameStatsDiv = document.querySelector(".game_stats");
  gameStatsDiv.innerHTML = "";

  let playerTurnH3 = document.createElement("h3");
  playerTurnH3.textContent = `It's ${player1.name}'s turn to play`;
  playerTurnH3.classList.add("h3_turn");
  gameStatsDiv.appendChild(playerTurnH3);
  const indivGrid = document.querySelectorAll(".game_grid div");
  indivGrid.forEach((div) => {
    div.addEventListener("click", () => gameClick(div));
  });
}

function switch_turns() {
  let playerTurnH3 = document.querySelector(".h3_turn");

  if (player1_turn) {
    player1_turn = false;
    player2_turn = true;
    playerTurnH3.textContent = `It's ${player1.name}'s turn to play`;
  } else {
    player1_turn = true;
    player2_turn = false;
    playerTurnH3.textContent = `It's ${player2.name}'s turn to play`;
  }
}

function gameClick(div) {
  if (player1_turn == true) {
    div.textContent = "x";
  } else {
    div.textContent = "o";
  }
  switch_turns();
}

const startButton = document.getElementById("start_button");
startButton.addEventListener("click", startGame);
