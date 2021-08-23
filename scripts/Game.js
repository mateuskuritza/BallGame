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

    deleteFriend(friend) {
        this.friends = this.friends.filter(myFriend => friend !== myFriend)
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
        this.enemies.forEach(enemy => {
            enemy.move()
            if (enemy.checkCollision(this.player)) this.end();
            enemy.bounceOnEdge()
        });

        this.friends.forEach(friend => {
            friend.move()
            if (friend.checkCollision(this.player)) {
                this.points++;
                this.rescuedFriends++;
                this.deleteFriend(friend);
            }
            if (friend.isOutOfScreen()) this.deleteFriend(friend);
        });

        this.randomAddNewEnemy();
        this.randomAddNewFriend();

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