class Game {

    points = 0;
    enemies = [];
    friends = [];
    player;
    rescuedFriends = 0;
    pointsByTimeIntervalId;
    gameIntervalId;
    finishedGame = false;

    constructor(player) {
        this.player = player;
    }

    drawPointsText() {
        pointsContainer.textContent = `${this.points}`;
    }

    randomProps() {
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

    newEnemy() {
        const { positionX, positionY, signalX, signalY } = this.randomProps();
        const newEnemy = new Enemy(positionX, positionY, signalX, signalY);
        this.enemies.push(newEnemy);
        return newEnemy
    }

    newFriend() {
        const { positionX, positionY, signalX, signalY } = this.randomProps();
        const newFriend = new Friend(positionX, positionY, signalX, signalY)
        this.friends.push(newFriend);
        return newFriend
    }

    clearScreen() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawPlayer() {
        this.player.draw();
    }

    drawEnemies() {
        this.enemies.forEach(enemy => {
            enemy.draw(enemy.positionX, enemy.positionY)
        });
    }

    drawFriends() {
        this.friends.forEach(friend => {
            friend.draw(friend.positionX, friend.positionY)
        });
    }

    moveEnemies() {
        this.enemies.forEach(enemy => enemy.move());
    }

    moveFriends() {
        this.friends.forEach(friend => friend.move());
    }

    checkEnemiesCollision() {
        let collision = false
        this.enemies.forEach(enemy => {
            if (enemy.checkCollision(this.player.positionX, this.player.positionY, this.player.radius)) collision = true;
        });
        return collision;
    }

    checkFriendsCollision() {
        this.friends.forEach(friend => {
            if (friend.checkCollision(this.player.positionX, this.player.positionY, this.player.radius)) {
                this.points++;
                this.rescuedFriends++;
                this.friends = this.friends.filter(myFriend => friend !== myFriend)
            }
        });
    }

    bounceEnemiesOnEdge() {
        this.enemies.forEach(enemy => enemy.bounceOnEdge());
    }

    end() {
        alert("Fim do jogo! Você conseguiu " + this.points + " pontos! Tendo resgatado " + this.rescuedFriends + " amigo(s) :)");
        clearInterval(this.gameIntervalId);
        clearInterval(this.pointsByTimeIntervalId);
        this.finishedGame = true;
    }

    start() {
        this.player.positionX = screenWidth / 2;
        this.player.positionY = screenHeight / 2;

        this.newEnemy();

        clearInterval(this.pointsByTimeIntervalId);
        clearInterval(this.gameIntervalId);
        this.pointsByTimeIntervalId = setInterval(() => this.points++, 1000);
        this.gameIntervalId = setInterval(() => this.loop(), 1000 / 60);
    }

    restart() {
        if (this.finishedGame) {
            this.points = 0;
            this.rescuedFriends = 0;
            this.enemies = [];
            this.friends = [];
            this.finishedGame = false;
            this.start();
        }
    }

    randomAddNewEnemy() {
        if (Math.random() < 0.005) this.newEnemy();
    }

    randomAddNewFriend() {
        if (Math.random() < 0.005) this.newFriend();
    }

    loop() {
        this.moveEnemies();
        this.moveFriends();
        this.randomAddNewEnemy();
        this.randomAddNewFriend();

        if (this.checkEnemiesCollision()) this.end();
        this.checkFriendsCollision();

        this.bounceEnemiesOnEdge();
        this.render();
    }

    render() {
        this.clearScreen();
        this.drawPointsText();
        this.drawPlayer();
        this.drawEnemies();
        this.drawFriends();
    }
}