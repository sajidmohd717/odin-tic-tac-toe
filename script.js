// Global Varialbes, must remove in the future!
let player1_turn = true;
let player2_turn = false;

let playersList = []
let currentPlayer = 0

const game = gameStats();

function gameStats() {
  let initial_gameboard = ['', '', '', '', '', '', '', '', '']
  let get_gameboard = () => {
    return initial_gameboard
  }
  let update_gameboard = (location, value) => {
    initial_gameboard[location] = value
    console.log(initial_gameboard)
    updateDivs()

  }
  return {get_gameboard, update_gameboard}
}


function initializeGameboard() {
  let gameGrid = document.querySelector(".game_grid");

  let gameboard = game.get_gameboard(); // Call the function to get the gameboard array

  gameboard.forEach((grid, grid_number) => {
    let div = document.createElement("div");
    console.log('xxx grid: ' + grid)
    div.textContent = grid
    div.setAttribute('id', grid_number)
    gameGrid.appendChild(div);
  });

}

function updateDivs() {
  let gameGrid = document.querySelector(".game_grid");
  let gameboard = game.get_gameboard(); // Call the function to get the gameboard array

  // Loop through each div in the game grid
  gameGrid.childNodes.forEach((div, index) => {
    // Update the text content of the div with the corresponding value from the game board
    div.textContent = gameboard[index -1];
  });
}

function createPlayer(name, player_no) {
  let turn = false;
  let gameSymbol;
  if (player_no === 1) {
    gameSymbol = 'X'
  }
  else {
    gameSymbol = 'O'
  }
  return { name , turn,  gameSymbol};
}

function startGame() {
  let player1Name = document.querySelector("#first_player").value;
  let player2Name = document.querySelector("#second_player").value;

  if (!player1Name || !player2Name) {
    console.error("Please enter names for both players.");
    return;
  }
  let player1 = createPlayer(player1Name, 1);
  playersList.push(player1)
  let player2 = createPlayer(player2Name, 2);
  playersList.push(player2)

  initializeGameboard();

  let gameStatsDiv = document.querySelector(".game_stats");
  gameStatsDiv.innerHTML = "";

  let playerTurnH3 = document.createElement("h3");
  playerTurnH3.textContent = `It's ${player1.name}'s turn to play`;
  playerTurnH3.classList.add("h3_turn");
  gameStatsDiv.appendChild(playerTurnH3);
  const indivGrid = document.querySelectorAll(".game_grid div");
  indivGrid.forEach((div) => {
    div.addEventListener("click", (event) => {
      game.update_gameboard(event.target.id, playersList[currentPlayer].gameSymbol)
      console.log(playersList)
      // gameClick(div)
    });
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
