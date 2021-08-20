class Enemy extends AutoMovingBall {

    constructor(positionX, positionY, signalX, signalY) {
        super(positionX, positionY, 30, "blue", 5, signalX, signalY);
    }

    bounceOnEdge() {
        if (this.positionX < 0 || this.positionX > screenWidth) this.speedX *= -1;
        if (this.positionY < 0 || this.positionY > screenHeight) this.speedY *= -1;
    }

    increaseSpeed() {
        this.speedX *= 1.0005;
        this.speedY *= 1.0005;
    }
}