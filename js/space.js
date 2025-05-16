import { sendGameScore } from './send-game-scores.js';

// Board
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

// Ship
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = (tileSize * columns) / 2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
};

let shipImg;
let shipVelocityX = tileSize; // Ship moving speed

// Aliens
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0;
let alienVelocityX = 1; // Alien movement speed

// Bullets
let bulletArray = [];
let bulletVelocityY = -10; // Bullet movement speed

let score = 0;
let gameOver = false;

// Load game when the window is ready
window.onload = function () {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    // Load images
    shipImg = new Image();
    shipImg.src = "../assets/images/ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    };

    alienImg = new Image();
    alienImg.src = "../assets/images/alien.png";

    // Set up game event listeners
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("restart-btn").addEventListener("click", restartGame);

    document.addEventListener("keydown", moveShip);
    document.addEventListener("keyup", shoot);

    setGame();
};

function setGame() {
    score = 0;
    gameOver = false;
    alienArray = [];
    bulletArray = [];

    // Reset ship position
    ship.x = shipX;
    ship.y = shipY;

    // Clear board
    context.clearRect(0, 0, board.width, board.height);

    // Update score display
    document.getElementById("score").innerText = score.toString();
}

// Start the game
function startGame() {
    document.getElementById("game-over").classList.remove("warning-notice");
    document.getElementById("game-over").innerText = "";
    setGame();
     // Create aliens only when the start button is pressed
    alienColumns = 3;
    alienRows = 2;
    alienVelocityX = -100;
    createAliens();
    requestAnimationFrame(update);
}

// Restart the game
function restartGame() {
    setGame();
    startGame();
}

// Game update loop
function update() {
    if (gameOver) {
        document.getElementById("game-over").classList.add("warning-notice");
        document.getElementById("game-over").innerText = "Game Over";
        return;
    }

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // Draw ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    // Draw aliens
    for (let i = 0; i < alienArray.length; i++) {
        let alien = alienArray[i];
        if (alien.alive) {
            alien.x += alienVelocityX;

            // If alien touches border
            if (alien.x + alien.width >= board.width || alien.x <= 0) {
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                // Move all aliens down by one row
                for (let j = 0; j < alienArray.length; j++) {
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            // Game over if aliens reach the ship
            if (alien.y >= ship.y) {
                // here we are sending game scores
                sendGameScore(2, score)
                gameOver = true;
                return;
            }
        }
    }

    // Bullets
    for (let i = 0; i < bulletArray.length; i++) {
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Bullet collision with aliens
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 10;
            }
        }
    }

    // Clear bullets that are off-screen
    while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
        bulletArray.shift();
    }

    // Move to next level
    if (alienCount === 0) {
        alienColumns = Math.min(alienColumns + 1, columns / 2 - 2);
        alienRows = Math.min(alienRows + 1, rows - 4);
        alienVelocityX += 0.2;
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    // Update score
    document.getElementById("score").innerText = score.toString();
}

// Move ship
function moveShip(e) {
    if (gameOver) return;

    if (e.code === "ArrowLeft" && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX;
    } else if (e.code === "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width) {
        ship.x += shipVelocityX;
    }
}

// Create aliens
function createAliens() {
    alienArray = [];
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                img: alienImg,
                x: alienX + c * alienWidth,
                y: alienY + r * alienHeight,
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

// Shoot bullets
function shoot(e) {
    if (gameOver) return;

    if (e.code === "Space") {
        let bullet = {
            x: ship.x + (shipWidth * 15) / 32,
            y: ship.y,
            width: tileSize / 8,
            height: tileSize / 2,
            used: false
        };
        bulletArray.push(bullet);
    }
}

// Collision detection
function detectCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
} 