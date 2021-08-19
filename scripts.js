const screenWidth = window.innerWidth * 0.9;
const screenHeight = window.innerHeight * 0.85;

const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

let gameIntervalId;

let player = {
    x: screenWidth / 2,
    y: screenHeight / 2,
    radius: 80,
    color: "red",
};

let enemy = {
    x: 0,
    y: 0,
    radius: 30,
    color: "blue",
    speedX: 10,
    speedY: 10,
};

function onMouseMove(event) {
    player.x = event.clientX;
    player.y = event.clientY;
}

function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}

function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    drawCircle(player.x, player.y, player.radius, player.color);
}

function drawEnemy() {
    drawCircle(enemy.x, enemy.y, enemy.radius, enemy.color);
}

function moveEnemy() {
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;
}

function checkEnemyCollision() {
    const distance = Math.sqrt(
        (player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2
    );

    return distance < player.radius + enemy.radius;
}

function bounceEnemyOnEdge() {
    if (enemy.x < 0 || enemy.x > screenWidth) {
        enemy.speedX *= -1;
    }

    if (enemy.y < 0 || enemy.y > screenHeight) {
        enemy.speedY *= -1;
    }
}

function increaseEnemySpeed() {
    enemy.speedX *= 1.001;
    enemy.speedY *= 1.001;
}

function endGame() {
    alert("Fim do jogo!");
    clearInterval(gameIntervalId);
}

function startGame() {
    player.x = screenWidth / 2;
    player.y = screenHeight / 2;

    enemy.x = 0;
    enemy.y = 0;
    enemy.speedX = 10;
    enemy.speedY = 10;

    clearInterval(gameIntervalId);
    gameIntervalId = setInterval(gameLoop, 1000 / 60);
}

function gameLoop() {
    clearScreen();
    moveEnemy();

    if (checkEnemyCollision()) {
        endGame();
    }

    bounceEnemyOnEdge();
    increaseEnemySpeed();

    drawPointsText();
    drawPlayer();
    drawEnemy();
}

startGame();

const pointsContainer = document.querySelector("#points");
let points = 0;
let pointsIntervalId = setInterval(() => points++, 1000);

function drawPointsText() {
    pointsContainer.textContent = `${points}`;
}