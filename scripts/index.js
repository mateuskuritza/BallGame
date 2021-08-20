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

let player = new Player();

let enemies = [];
let friends = [];
let rescuedFriends = 0;

function drawPointsText() {
    pointsContainer.textContent = `${points}`;
}

function randomProps() {
    const randomAxis = Math.random();
    const randomSide = Math.random();

    if (randomAxis > 0.5) {
        const positionX = randomAxis * screenWidth;
        if (randomSide > 0.5) {
            return {
                positionX,
                positionY: 0,
                signalX: 1,
                signalY: 1
            }
        }
        return {
            positionX,
            positionY: screenHeight,
            signalX: -1,
            signalY: -1
        }
    }

    const positionY = randomAxis * screenHeight;
    if (randomSide > 0.5) {
        return {
            positionX: 0,
            positionY,
            signalX: 1,
            signalY: -1
        }
    }
    return {
        positionX: screenWidth,
        positionY,
        signalX: -1,
        signalY: 1
    }
}

function newEnemy() {
    const { positionX, positionY, signalX, signalY } = randomProps();
    const newEnemy = new Enemy(positionX, positionY, signalX, signalY);
    enemies.push(newEnemy);
    return newEnemy
}

function newFriend() {
    const { positionX, positionY, signalX, signalY } = randomProps();
    const newFriend = new Friend(positionX, positionY, signalX, signalY)
    friends.push(newFriend);
    return newFriend
}

function onMouseMove(event) {
    player.moveTo(event.clientX, event.clientY);
}

function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
    player.draw();
}

function drawEnemies() {
    enemies.forEach(enemy => {
        enemy.draw(enemy.positionX, enemy.positionY)
    });
}

function drawFriends() {
    friends.forEach(friend => {
        friend.draw(friend.positionX, friend.positionY)
    });
}

function moveEnemies() {
    enemies.forEach(enemy => enemy.move());
}

function moveFriends() {
    friends.forEach(friend => friend.move());
}

function checkEnemiesCollision() {
    let collision = false
    enemies.forEach(enemy => {
        if (enemy.checkCollision(player.positionX, player.positionY, player.radius)) collision = true;
    });
    return collision;
}

function checkFriendsCollision() {
    friends.forEach(friend => {
        if (friend.checkCollision(player.positionX, player.positionY, player.radius)) {
            points++;
            rescuedFriends++;
            friends = friends.filter(myFriend => friend !== myFriend)
        }
    });
}

function bounceEnemiesOnEdge() {
    enemies.forEach(enemy => enemy.bounceOnEdge());
}

function increaseEnemiesSpeed() {
    enemies.forEach(enemy => enemy.increaseSpeed());
}

function endGame() {
    alert("Fim do jogo! Você conseguiu " + points + " pontos! Tendo resgatado " + rescuedFriends + " amigo(s) :)");
    clearInterval(gameIntervalId);
    clearInterval(pointsByTimeIntervalId);
    finishedGame = true;
}

function startGame() {
    player.positionX = screenWidth / 2;
    player.positionY = screenHeight / 2;

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