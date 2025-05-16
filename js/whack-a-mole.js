import { sendGameScore } from './send-game-scores.js';

let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
    setGame()

    document.getElementById('start-btn').addEventListener('click', () => {
        setGame(true);
    });
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.location.reload();
        setGame(true);
    });
}


function setGame(generateCharacters=false) {

    function startGame() {
        score = 0;
        gameOver = false;
        console.log("Game restarted!");
    }

    if (generateCharacters == true ){
         setInterval(setMole, 800)
         setInterval(setPlant, 700)
    }
    else {
        for (let i = 1; i <= 9; i++) {
            let tile = document.createElement("div");
            tile.id = i.toString();
            tile.addEventListener("click", selectTile)
            document.getElementById("board").appendChild(tile);
        }
    }


}

function startGame() {
    // Reset game variables
    score = 0;
    gameOver = false;

    // Update score display
    document.getElementById("score").innerText = score.toString();

    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";

    console.log("Game restarted!");
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this === currPlantTile) {
        document.getElementById("over").innerText = "" ;
        document.getElementById("score").innerText = "GAME OVER";
         // here we are sending game scores
        sendGameScore(1, score)
        score = 0;
        gameOver = true;
    }
}

// Utility function to get a random tile
function getRandomTile() {
    let num = Math.floor(Math.random() * 9) + 1;
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "../assets/images/monty-mole.png";

        // Move the image to the right
    mole.style.position = "relative"; // Ensure the position is relative for offset
    mole.style.left = "40px";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "../assets/images/piranha-plant.png";

    // Move the image to the right
    plant.style.position = "relative"; // Ensure the position is relative for offset
    plant.style.left = "40px";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
} 