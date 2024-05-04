const startButton = document.getElementById("start_button");
startButton.addEventListener("click", startGame);

let playersList = [];
let currentPlayer = 0;

const game = gameStats();

function createPlayer(name, player_no) {
  let turn = false;
  let gameSymbol;
  if (player_no === 1) {
    gameSymbol = "X";
  } else {
    gameSymbol = "O";
  }
  return { name, turn, gameSymbol };
}

function startGame() {
  let player1Name = document.querySelector("#first_player").value;
  let player2Name = document.querySelector("#second_player").value;

  if (!player1Name || !player2Name) {
    console.error("Please enter names for both players.");
    return;
  }
  playersList.push(createPlayer(player1Name, 1));
  playersList.push(createPlayer(player2Name, 2));

  initializeGameboard();

  let gameStatsDiv = document.querySelector(".game_stats");
  gameStatsDiv.innerHTML = "";

  let playerTurnH3 = document.createElement("h3");
  playerTurnH3.textContent = `It's ${playersList[currentPlayer].name}'s turn to play`;
  playerTurnH3.classList.add("h3_turn");
  gameStatsDiv.appendChild(playerTurnH3);
  const indivGrid = document.querySelectorAll(".game_grid div");
  indivGrid.forEach((div) => {
    div.addEventListener("click", (event) => {
      let gameboard = game.get_gameboard();
      if (gameboard[event.target.id] === "") {
        game.update_gameboard(
          event.target.id,
          playersList[currentPlayer].gameSymbol
        );
        switch_turns();
      }
    });
  });
}

function switch_turns() {
  let playerTurnH3 = document.querySelector(".h3_turn");
  if (currentPlayer == 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  playerTurnH3.textContent = `It's ${playersList[currentPlayer].name}'s turn to play`;
}

function gameStats() {
  let initial_gameboard = ["", "", "", "", "", "", "", "", ""];
  let get_gameboard = () => {
    return initial_gameboard;
  };
  let update_gameboard = (location, value) => {
    initial_gameboard[location] = value;
    console.log(initial_gameboard);
    updateDivs();
  };
  return { get_gameboard, update_gameboard };
}

function updateDivs() {
  let gameGrid = document.querySelector(".game_grid");
  let gameboard = game.get_gameboard(); // Call the function to get the gameboard array

  // Loop through each div in the game grid
  gameGrid.childNodes.forEach((div, index) => {
    // Update the text content of the div with the corresponding value from the game board
    div.textContent = gameboard[index - 1];
  });

  // Check for a win after each update

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  sleep(2000).then(() => { checkForWin(gameboard);});

  
}

function gameClick(div) {
  if (player1_turn == true) {
    div.textContent = "x";
  } else {
    div.textContent = "o";
  }
  switch_turns();
}

function initializeGameboard() {
  let gameGrid = document.querySelector(".game_grid");

  let gameboard = game.get_gameboard(); // Call the function to get the gameboard array

  gameboard.forEach((grid, grid_number) => {
    let div = document.createElement("div");
    div.textContent = grid;
    div.setAttribute("id", grid_number);
    gameGrid.appendChild(div);
  });
}

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if X or O occupies all cells in any winning combination
  for (const combination of winningCombinations) {
    if (combination.every((index) => board[index] === "X")) {
      alert("X won!");
      return;
    } else if (combination.every((index) => board[index] === "O")) {
      alert("O won!");
      return;
    }
  }
}