const screenWidth = window.innerWidth * 0.95;
const screenHeight = window.innerHeight * 0.85;

const pointsContainer = document.querySelector("#points");
const canvas = document.querySelector("#canvas");
canvas.width = screenWidth;
canvas.height = screenHeight;
const context = canvas.getContext("2d");

let gameIntervalId;
let pointsByTimeIntervalId = setInterval(() => points++, 1000);
let points = 0;
let finishedGame = false;

let player = {
    x: screenWidth / 2,
    y: screenHeight / 2,
    radius: 60,
    color: "red",
};

let enemies = [];
let friends = [];
let rescuedFriends = 0;

function drawPointsText() {
    pointsContainer.textContent = `${points}`;
}

function randomProps() {
    const randomNumber1 = Math.random();
    const randomNumber2 = Math.random();

    if (randomNumber1 > 0.5) {
        const valueX = randomNumber1 * screenWidth;
        if (randomNumber2 > 0.5) {
            return {
                valueX,
                valueY: 0,
                signalX: 1,
                signalY: 1
            }
        } else {
            return {
                valueX,
                valueY: screenHeight,
                signalX: -1,
                signalY: -1
            }
        }
    } else {
        const valueY = randomNumber1 * screenHeight;
        if (randomNumber2 > 0.5) {
            return {
                valueX: 0,
                valueY,
                signalX: 1,
                signalY: -1
            }
        } else {
            return {
                valueX: screenWidth,
                valueY,
                signalX: -1,
                signalY: 1
            }
        }
    }
}

function newEnemy() {
    const randoms = randomProps();
    const enemy = {
        x: randoms.valueX,
        y: randoms.valueY,
        radius: 30,
        color: "blue",
        speedX: 5 * randoms.signalX,
        speedY: 5 * randoms.signalY
    }
    enemies.push(enemy);
    return enemy
}

function newFriend() {
    const randoms = randomProps();
    const friend = {
        x: randoms.valueX,
        y: randoms.valueY,
        radius: 20,
        color: "green",
        speedX: 6 * randoms.signalX,
        speedY: 6 * randoms.signalY
    }
    friends.push(friend);
    return friend
}


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

function drawEnemies() {
    enemies.forEach(enemy => {
        drawCircle(enemy.x, enemy.y, enemy.radius, enemy.color);
    });
}

function drawFriends() {
    friends.forEach(friend => {
        drawCircle(friend.x, friend.y, friend.radius, friend.color);
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;
    })
}

function moveFriends() {
    friends.forEach(friend => {
        friend.x += friend.speedX;
        friend.y += friend.speedY;
    })
}

function checkEnemiesCollision() {
    let collision = false
    enemies.forEach(enemy => {
        const distance = Math.sqrt((player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2);
        if (distance < player.radius + enemy.radius) collision = true;
    })
    return collision
}

function checkFriendsCollision() {
    friends.forEach(friend => {
        const distance = Math.sqrt((player.x - friend.x) ** 2 + (player.y - friend.y) ** 2);
        if (distance < player.radius + friend.radius) {
            points++;
            rescuedFriends++;
            friends = friends.filter(myFriend => friend !== myFriend)
        }
    })
}

function bounceEnemiesOnEdge() {
    enemies.forEach(enemy => {
        if (enemy.x < 0 || enemy.x > screenWidth) enemy.speedX *= -1;
        if (enemy.y < 0 || enemy.y > screenHeight) enemy.speedY *= -1;
    })
}

function increaseEnemiesSpeed() {
    enemies.forEach(enemy => {
        enemy.speedX *= 1.001;
        enemy.speedY *= 1.001;
    })
}

function endGame() {
    alert("Fim do jogo! Você conseguiu " + points + " pontos! Tendo resgatado " + rescuedFriends + " amigo(s) :)");
    clearInterval(gameIntervalId);
    clearInterval(pointsByTimeIntervalId);
    finishedGame = true;
}

function startGame() {
    player.x = screenWidth / 2;
    player.y = screenHeight / 2;

    newEnemy();

    clearInterval(pointsByTimeIntervalId);
    clearInterval(gameIntervalId);
    pointsByTimeIntervalId = setInterval(() => points++, 1000);
    gameIntervalId = setInterval(() => gameLoop(), 1000 / 60);
}

function restartGame() {
    if (finishedGame) {
        points = 0;
        rescuedFriends = 0;
        enemies = [];
        friends = [];
        finishedGame = false;
        startGame();
    }
}

function randomAddNewEnemy() {
    if (Math.random() < 0.005) newEnemy();
}

function randomAddNewFriend() {
    if (Math.random() < 0.005) newFriend();
}

function gameLoop() {
    clearScreen();
    moveEnemies();
    moveFriends();
    randomAddNewEnemy();
    randomAddNewFriend();

    if (checkEnemiesCollision()) endGame();
    checkFriendsCollision();

    bounceEnemiesOnEdge();
    // increaseEnemiesSpeed();

    drawPointsText();
    drawPlayer();
    drawEnemies();
    drawFriends();
}

startGame();