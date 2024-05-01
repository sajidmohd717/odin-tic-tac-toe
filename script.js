const GRID_SIZE = 9;

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

    let player1 = createPlayer(player1Name);
    let player2 = createPlayer(player2Name);

    initializeGameboard();

    let gameStatsDiv = document.querySelector(".game_stats");
    gameStatsDiv.innerHTML = "";

    let playerTurnH3 = document.createElement('h3');
    playerTurnH3.textContent = `It's ${player1.name}'s turn to play`;
    gameStatsDiv.appendChild(playerTurnH3);
    const indivGrid = document.querySelectorAll('.game_grid div')
    indivGrid.forEach((div) => {
        div.addEventListener("click", () => gameClick(div))
    })
}

function gameClick(div) {
    div.textContent = "x"
    player2_turn()
}

function player2_turn() {
    
}

const startButton = document.getElementById("start_button");
startButton.addEventListener("click", startGame);
