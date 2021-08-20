class AutoMovingBall extends Ball {

    speedX;
    speedY;

    constructor(positionX, positionY, radius, color, speed, signalX, signalY) {
        super(positionX, positionY, radius, color);
        this.speedX = speed;
        this.speedY = speed;
        this.speedX *= signalX;
        this.speedY *= signalY;
    }

    move() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    }
}